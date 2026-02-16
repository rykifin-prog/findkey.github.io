import { createHmac, timingSafeEqual } from 'crypto';

type StripeHeader = {
  timestamp: string;
  signatures: string[];
};

function parseStripeSignatureHeader(signatureHeader: string): StripeHeader | null {
  const pairs = signatureHeader.split(',').map((chunk) => chunk.trim());
  const timestamp = pairs.find((chunk) => chunk.startsWith('t='))?.slice(2);
  const signatures = pairs
    .filter((chunk) => chunk.startsWith('v1='))
    .map((chunk) => chunk.slice(3))
    .filter(Boolean);

  if (!timestamp || signatures.length === 0) {
    return null;
  }

  return { timestamp, signatures };
}

export function verifyStripeWebhookSignature(payload: string, signatureHeader: string, secret: string) {
  const parsed = parseStripeSignatureHeader(signatureHeader);

  if (!parsed) {
    return false;
  }

  const signedPayload = `${parsed.timestamp}.${payload}`;
  const digest = createHmac('sha256', secret).update(signedPayload, 'utf8').digest('hex');
  const digestBuffer = Buffer.from(digest, 'utf8');

  return parsed.signatures.some((signature) => {
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (signatureBuffer.length !== digestBuffer.length) {
      return false;
    }

    return timingSafeEqual(signatureBuffer, digestBuffer);
  });
}
