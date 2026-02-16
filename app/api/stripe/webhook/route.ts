import { NextResponse } from 'next/server';
import {
  getProfileByStripeCustomerId,
  getProfileByStripeSubscriptionId,
  updateProfileSubscription
} from '@/lib/billing/subscriptions';
import { getStripeWebhookSecret } from '@/lib/stripe/env';
import { verifyStripeWebhookSignature } from '@/lib/stripe/webhook';
import { retrieveStripeSubscription } from '@/lib/stripe/api';

type StripeEvent = {
  type: string;
  data: {
    object: {
      id?: string;
      customer?: string | { id: string };
      subscription?: string;
      status?: string;
      metadata?: Record<string, string>;
      client_reference_id?: string;
    };
  };
};

function getCustomerId(customer: string | { id: string } | undefined) {
  if (typeof customer === 'string') {
    return customer;
  }

  return customer?.id ?? null;
}

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  const webhookSecret = getStripeWebhookSecret();
  const signatureValid = verifyStripeWebhookSignature(payload, signature, webhookSecret);

  if (!signatureValid) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const event = JSON.parse(payload) as StripeEvent;

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerId = getCustomerId(session.customer);
    const userId =
      session.metadata?.user_id ??
      session.client_reference_id ??
      (customerId ? (await getProfileByStripeCustomerId(customerId))?.id : undefined);

    if (!userId || !session.subscription) {
      return NextResponse.json({ received: true });
    }

    const subscription = await retrieveStripeSubscription(session.subscription);

    await updateProfileSubscription({
      userId,
      subscriptionStatus: subscription.status,
      stripeCustomerId: customerId ?? subscription.customer,
      stripeSubscriptionId: subscription.id
    });
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const customerId = getCustomerId(subscription.customer);
    const userId =
      subscription.metadata?.user_id ??
      (subscription.id ? (await getProfileByStripeSubscriptionId(subscription.id))?.id : undefined) ??
      (customerId ? (await getProfileByStripeCustomerId(customerId))?.id : undefined);

    if (!userId) {
      return NextResponse.json({ received: true });
    }

    await updateProfileSubscription({
      userId,
      subscriptionStatus: subscription.status,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id ?? null
    });
  }

  return NextResponse.json({ received: true });
}
