# Findkey Product Platform

Next.js App Router + TypeScript starter for Findkey's two surfaces:
- **Public Site** (`/(public)`): acquisition, archive, and paywalled brief reading.

## Current stack analysis

- **Framework**: Next.js 14 App Router with React 18 and TypeScript.
- **Auth + DB backend**: Supabase Auth and Postgres (via REST API + SQL migrations).
- **Rendering model**: SSR-capable app router with server actions and middleware session checks.
- **Styling**: Global CSS + CSS Modules.
- **Hosting target**: Vercel/edge-friendly deployment.

## Current pages/routes

- `/` → Public landing page.
- `/auth/sign-up` and `/auth/sign-in` → Email/password auth flows.
- `/briefs/[slug]` → Teaser brief.
- `/briefs/[slug]/full` → Paid full-content route protected by middleware.

## Supabase wiring included

- **Session cookies** for access/refresh tokens.
- **Server actions** for sign-up, sign-in, and sign-out.
- **Middleware** refreshes sessions and enforces route protection:
  - `/briefs/[slug]/full` requires authenticated user + paid subscription state.
- **Profile schema migration** in `supabase/migrations` keyed by `auth.users.id`, including `subscription_status`.

## Phase 1 roadmap (Public traction MVP)

### Step 1: Conversion-ready core pages
- Build landing and archive entry pages with clear conversion pathways.
- Add analytics events (`view_pricing`, `start_checkout`, `signup_complete`).
- **Success metric**: ≥20% landing-to-sign-up CTR.

### Step 2: Subscription rails
- Implement Supabase auth + Stripe Checkout + billing portal.
- Add webhook handling for subscription status sync into `profiles.subscription_status`.
- **Success metric**: checkout completion ≥35% of checkout starts.

### Step 3: Gated content engine
- Add archive list with teaser cards and full brief paywall.
- Enforce access by active subscription state.
- **Success metric**: ≥25% of signed-in free users hit paywall CTA.

### Step 4: Onboarding + lifecycle
- Add free-tier email capture and onboarding sequence.
- Add retention instrumentation (`d7_return`, `brief_opened`, `cancel_intent`).
- **Success metric**: D7 retained users ≥30% of new signups.

## Environment variables

See `.env.example` for setup values.
