# Findkey Product Platform

Next.js App Router + TypeScript monorepo starter for Findkey's two surfaces:
- **Public Site** (`/(public)`): acquisition, pricing, archive, paywalled brief reading.
- **Studio** (`/(studio)`): internal brief generation, review, and publish workflow.

## Current stack analysis

- **Framework**: Next.js 14 App Router with React 18 and TypeScript.
- **Rendering model**: Hybrid-ready (SSR/ISR/static capable), intentionally **not** forced to static export.
- **Styling**: Global CSS + CSS Modules with a lightweight design token system in `app/globals.css`.
- **Hosting target**: Vercel/edge-friendly, with compatibility for Supabase + Stripe serverless webhooks.

## Current pages/routes

- `/` → Public landing page migrated from legacy `index.html` content.
- `/studio` → Studio placeholder route for internal workflow surface.

## What is still missing (subscriptions + Studio)

### Public MVP gaps
- Pricing page with monthly vs annual plans and conversion tracking events.
- Auth (email/password or magic link) and session management.
- Stripe Checkout and customer portal integration.
- Paywall logic for teaser/full brief access.
- Brief archive index + individual brief pages.
- Analytics instrumentation for funnel and retention.
- Email onboarding flow for free and paid tiers.

### Studio MVP gaps
- Role-protected Studio authentication.
- Draft queue and generation pipeline.
- Truth-category block editor with confidence tagging.
- Source capture/citation management.
- Quality checklist gates before publish.
- One-click publish workflow (status, excerpt, SEO, sitemap, email trigger).

## Phase 1 roadmap (Public traction MVP)

### Step 1: Conversion-ready core pages (Week 1)
- Build landing + pricing pages with clear monthly/annual CTAs.
- Add analytics events (`view_pricing`, `start_checkout`, `signup_complete`).
- **Success metric**: ≥20% landing-to-pricing CTR.

### Step 2: Subscription rails (Week 2)
- Implement Supabase auth + Stripe Checkout + billing portal.
- Add webhook handling for subscription status sync.
- **Success metric**: checkout completion ≥35% of checkout starts.

### Step 3: Gated content engine (Week 3)
- Add archive list with teaser cards and full brief paywall.
- Enforce access by active subscription state.
- **Success metric**: ≥25% of signed-in free users hit paywall CTA.

### Step 4: Onboarding + lifecycle (Week 4)
- Add free-tier email capture and onboarding sequence.
- Add retention instrumentation (`d7_return`, `brief_opened`, `cancel_intent`).
- **Success metric**: D7 retained users ≥30% of new signups.

## Environment variables

See `.env.example` for planned integrations.
