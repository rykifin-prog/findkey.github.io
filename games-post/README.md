# The Floor Just Collapsed — Post Bundle

A self-contained essay post with three embedded games, click-to-play loading, vote widget, and per-game telemetry (play count, time-on-game).

## Structure

```
games-post/
├── index.html              ← the post itself
├── tracking-shim.js        ← reference copy (already injected into each game)
└── games/
    ├── michael.html        ← The Awesome Game
    ├── dagny.html          ← Dagny's Adventure
    └── sofia.html          ← Sofia's Space Game
```

## Local preview

```
cd games-post
python3 -m http.server 8000
# Open http://localhost:8000
```

Games must be served over HTTP (not file://) for postMessage telemetry to work.

## Deploy options

### Option A — Personal Substack / Ghost / WordPress
Substack does not allow custom JS or iframes pointing at arbitrary domains. If you publish there, host the games on a subdomain you control (e.g., games.yoursite.com) and link out rather than embed. The full `index.html` works as-is on Ghost (with HTML cards) and on WordPress with custom HTML blocks, provided the games are hosted at the relative path `games/`.

### Option B — marketing.mworks.com (publish-to-marketing skill)
Drop the entire `games-post/` directory under the appropriate `cx/` subpath. The publish-to-marketing skill handles the S3 sync. The relative paths in the post resolve naturally.

### Option C — Standalone domain
Push all four files to any static host (Netlify, Vercel, Cloudflare Pages, S3+CloudFront). The post and games co-locate — zero configuration needed.

## Wiring up a real backend

By default, telemetry and votes accumulate in the visitor's localStorage only. This is fine for a soft launch and gives readers a "their counter goes up when they play" feel, but it is not a real aggregation.

To enable real aggregation, set `BACKEND_URL` in `index.html` (search for the constant near the top of the closing `<script>` block) to an endpoint you control. Recommended options, in order of effort:

1. **Cloudflare Workers + KV** (zero infra, ~$0/mo at low volume)
   - Worker accepts POST, increments counters in KV
   - GET endpoint returns aggregate stats, fetched on page load
   - ~30 lines of code

2. **Vercel Function + Upstash Redis** (similar profile)

3. **Google Apps Script bound to a Google Sheet** (no infrastructure at all, but rate-limited and slower)

For initial publish, leaving it as localStorage-only is fine — it lets the post ship without backend dependencies, and the per-visitor "feels alive" effect is preserved.

## What the telemetry captures

- `start` event when each game iframe loads
- `heartbeat` every 5s while the game tab is visible (idle background tabs do not count)
- `end` event on `pagehide`, with total active session time

Visibility is tracked: switching tabs pauses the timer. This produces honest "time-on-game" rather than wall-clock time.

## Privacy posture

- No PII collected
- No third-party analytics
- No cookies
- Vote and telemetry stored in localStorage on the visitor's device
- If `BACKEND_URL` is configured, only the game ID, event type, timestamp, and session duration are transmitted

## Toggling features off before publish

- **Hide stats panel**: in `index.html`, set `.game-stats { display: none; }` in CSS
- **Disable voting**: comment out the `.vote-block` section in HTML
- **Disable telemetry entirely**: remove the `<script>` injection from each game (see commit history) — or leave it, since with no `BACKEND_URL` it only writes to local storage

## Names and metadata

The post uses first names only (Michael, Dagny, Sofia). No ages, photos, school, or location. Game file URLs use first-name slugs; if you want to neutralize those before publish, rename:

- `games/michael.html` → `games/builder.html`
- `games/dagny.html` → `games/explorer.html`
- `games/sofia.html` → `games/platformer.html`

And update the corresponding `data-src` attributes in `index.html`.
