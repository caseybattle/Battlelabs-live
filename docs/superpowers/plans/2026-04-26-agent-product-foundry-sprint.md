# Agent Product Foundry Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the next Battlelabs autonomous revenue asset: a free KDP niche scorecard tool attached to a paid KDP launch report/kit funnel.

**Architecture:** Use the existing Next.js app as the public storefront, TypeScript/Vitest for deterministic scoring and tests, local public assets for samples/previews, and `ops/agent-native-revenue` files as the task and metric source of truth. The system stays zero-paid-spend: no autonomous purchases, no agent wallets, no paid APIs, and no cold outbound at scale.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, static PDF/CSV/Markdown assets, Google Drive/Sheets for optional external tracking.

---

## File Structure

- Create `src/lib/kdp-scorecard.ts` for deterministic scoring rules and offer copy data.
- Create `src/lib/kdp-scorecard.test.ts` for scoring, thresholds, and CTA routing coverage.
- Create `src/app/kdp-niche-scorecard/page.tsx` for the public free tool and paid report CTA.
- Create `public/products/kdp-niche-scorecard/README.md` for asset inventory and delivery notes.
- Create `public/products/kdp-niche-scorecard/free-sample.md` as the free downloadable sample content source.
- Create `public/products/kdp-niche-scorecard/paid-report-template.md` as the paid report template source.
- Create `ops/agent-native-revenue/kdp-scorecard-launch-plan.md` for offer, buyer, promise, price, compliance notes, and distribution.
- Modify `ops/agent-native-revenue/portfolio-task-queue.csv` to add the new SKU tasks.
- Modify `ops/agent-native-revenue/distribution-task-list.md` to add organic posts and SEO tasks for the new SKU.

---

### Task 1: Lock the First SKU

**Files:**
- Create: `ops/agent-native-revenue/kdp-scorecard-launch-plan.md`
- Modify: `ops/agent-native-revenue/portfolio-task-queue.csv`

- [x] **Step 1: Create the launch plan file**

Add this content:

```markdown
# KDP Niche Scorecard Generator Launch Plan

## SKU

KDP Niche Scorecard Generator + KDP Launch Report

## Buyer

Self-publishers, Etsy/Canva template sellers, low-content book creators, and digital product builders who need a fast go/no-go read before spending time on a KDP niche.

## Promise

Turn a rough KDP book idea into a scored niche snapshot with title angles, buyer intent notes, listing copy starters, and a launch checklist.

## Free Asset

Browser-based niche scorecard page with simple inputs and a visible score.

## Paid Asset

KDP Launch Report Kit:
- Niche score breakdown
- Title and subtitle angles
- Keyword clusters
- Buyer promise options
- Listing description starter
- Cover/mockup direction
- Launch checklist

## Price

Intro price: $19
Regular price target: $39-$49 after proof.

## Compliance

- No guaranteed sales claims.
- No claim that scores predict Amazon ranking.
- AI assistance disclosed where appropriate.
- Buyer remains responsible for platform compliance, originality, and publishing decisions.

## Kill / Improve / Scale

Improve if visitors use the tool but do not click checkout.
Clone if there are checkout clicks, sales, or direct buyer requests.
Kill if there are no tool uses or checkout clicks after targeted organic distribution.
```

- [x] **Step 2: Add task rows to `portfolio-task-queue.csv`**

Add rows with these fields, matching the existing CSV header:

```csv
KDP-SCORECARD-001,KDP Niche Scorecard,Define launch plan,Controller,Pending,ops/agent-native-revenue/kdp-scorecard-launch-plan.md,Locks buyer promise price compliance and kill rules
KDP-SCORECARD-002,KDP Niche Scorecard,Build deterministic score logic,Build,Pending,src/lib/kdp-scorecard.ts,Creates reusable score model for page and report
KDP-SCORECARD-003,KDP Niche Scorecard,Publish free scorecard page,Build,Pending,src/app/kdp-niche-scorecard/page.tsx,Creates free tool and paid report CTA
KDP-SCORECARD-004,KDP Niche Scorecard,Create free and paid report sources,Build,Pending,public/products/kdp-niche-scorecard/,Creates fulfillment assets
KDP-SCORECARD-005,KDP Niche Scorecard,Prepare organic distribution,Distribution,Pending,ops/agent-native-revenue/distribution-task-list.md,Creates SEO and social launch tasks
```

- [x] **Step 3: Commit**

Run:

```powershell
git add ops/agent-native-revenue/kdp-scorecard-launch-plan.md ops/agent-native-revenue/portfolio-task-queue.csv
git commit -m "docs: define kdp scorecard launch sku"
```

---

### Task 2: Build the Scorecard Logic

**Files:**
- Create: `src/lib/kdp-scorecard.ts`
- Create: `src/lib/kdp-scorecard.test.ts`

- [x] **Step 1: Write the test file**

```ts
import { describe, expect, it } from "vitest";
import {
  calculateKdpScore,
  getKdpScoreBand,
  KDP_SCORECARD_OFFER,
} from "./kdp-scorecard";

describe("kdp scorecard", () => {
  it("scores a strong niche above 75", () => {
    const result = calculateKdpScore({
      buyerIntent: 5,
      giftability: 5,
      competitionClarity: 4,
      productionSimplicity: 5,
      evergreenDemand: 4,
    });

    expect(result.score).toBeGreaterThanOrEqual(80);
    expect(result.band).toBe("Strong");
  });

  it("flags weak niches below 45", () => {
    const result = calculateKdpScore({
      buyerIntent: 1,
      giftability: 2,
      competitionClarity: 1,
      productionSimplicity: 2,
      evergreenDemand: 1,
    });

    expect(result.score).toBeLessThan(45);
    expect(result.band).toBe("Weak");
  });

  it("maps score bands consistently", () => {
    expect(getKdpScoreBand(82)).toBe("Strong");
    expect(getKdpScoreBand(61)).toBe("Test");
    expect(getKdpScoreBand(44)).toBe("Weak");
  });

  it("keeps the paid offer self-serve and no-guarantee", () => {
    expect(KDP_SCORECARD_OFFER.price).toBe("$19");
    expect(KDP_SCORECARD_OFFER.disclaimer).toContain("No sales or ranking results are guaranteed");
  });
});
```

- [x] **Step 2: Run the failing test**

Run:

```powershell
npm test -- src/lib/kdp-scorecard.test.ts
```

Expected: FAIL because `src/lib/kdp-scorecard.ts` does not exist yet.

- [x] **Step 3: Create `src/lib/kdp-scorecard.ts`**

```ts
export type KdpScoreInput = {
  buyerIntent: number;
  giftability: number;
  competitionClarity: number;
  productionSimplicity: number;
  evergreenDemand: number;
};

export type KdpScoreBand = "Strong" | "Test" | "Weak";

export type KdpScoreResult = {
  score: number;
  band: KdpScoreBand;
  recommendations: string[];
};

const WEIGHTS: Record<keyof KdpScoreInput, number> = {
  buyerIntent: 0.28,
  giftability: 0.22,
  competitionClarity: 0.18,
  productionSimplicity: 0.17,
  evergreenDemand: 0.15,
};

export const KDP_SCORECARD_OFFER = {
  name: "KDP Niche Scorecard Generator + KDP Launch Report",
  price: "$19",
  regularPrice: "$39-$49",
  checkoutLabel: "Get the $19 launch report",
  disclaimer:
    "No sales or ranking results are guaranteed. The scorecard is a planning aid, not Amazon or marketplace advice.",
};

export function getKdpScoreBand(score: number): KdpScoreBand {
  if (score >= 75) return "Strong";
  if (score >= 45) return "Test";
  return "Weak";
}

function clampRating(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.min(5, Math.max(1, Math.round(value)));
}

export function calculateKdpScore(input: KdpScoreInput): KdpScoreResult {
  const weighted = Object.entries(WEIGHTS).reduce((total, [key, weight]) => {
    const rating = clampRating(input[key as keyof KdpScoreInput]);
    return total + (rating / 5) * weight * 100;
  }, 0);

  const score = Math.round(weighted);
  const band = getKdpScoreBand(score);

  const recommendations =
    band === "Strong"
      ? [
          "Create a sample listing and test the promise with organic posts.",
          "Build one paid launch report before cloning adjacent versions.",
        ]
      : band === "Test"
        ? [
            "Tighten the buyer, occasion, or keyword angle before building the full asset.",
            "Use a free sample or checklist to test demand before expanding.",
          ]
        : [
            "Do not build the full product yet.",
            "Choose a narrower buyer, stronger gift occasion, or simpler production format.",
          ];

  return { score, band, recommendations };
}
```

- [x] **Step 4: Verify tests pass**

Run:

```powershell
npm test -- src/lib/kdp-scorecard.test.ts
```

Expected: PASS.

- [x] **Step 5: Commit**

```powershell
git add src/lib/kdp-scorecard.ts src/lib/kdp-scorecard.test.ts
git commit -m "feat: add kdp niche scorecard logic"
```

---

### Task 3: Publish the Free Tool Page

**Files:**
- Create: `src/app/kdp-niche-scorecard/page.tsx`

- [x] **Step 1: Create the page**

Use a server-rendered page with a clear scoring table, example inputs, paid CTA, refund/disclaimer copy, and links to the free sample.

- [x] **Step 2: Include these visible sections**

Required sections:
- Headline: `KDP Niche Scorecard Generator`
- Free tool explanation
- Five score dimensions
- Example result card
- Paid report CTA at `$19`
- Free sample link
- FAQ
- No-guarantee disclaimer

- [x] **Step 3: Add CTA routing**

Use the existing checkout helper pattern in `src/lib/checkout.ts`. If no live checkout URL exists, route the paid CTA to the configured fallback and label it as checkout setup pending.

- [x] **Step 4: Verify page builds**

Run:

```powershell
npm run build
```

Expected: build completes successfully.

- [x] **Step 5: Commit**

```powershell
git add src/app/kdp-niche-scorecard/page.tsx
git commit -m "feat: publish kdp niche scorecard page"
```

---

### Task 4: Create Free and Paid Asset Sources

**Files:**
- Create: `public/products/kdp-niche-scorecard/README.md`
- Create: `public/products/kdp-niche-scorecard/free-sample.md`
- Create: `public/products/kdp-niche-scorecard/paid-report-template.md`

- [x] **Step 1: Create asset README**

Include:
- asset names,
- buyer promise,
- delivery method,
- license terms,
- AI disclosure,
- refund note,
- checkout dependency.

- [x] **Step 2: Create free sample**

Include:
- one sample scorecard,
- one sample title cluster,
- one sample listing description starter,
- one sample launch checklist.

- [x] **Step 3: Create paid report template**

Include:
- customer idea,
- score breakdown,
- keyword clusters,
- title/subtitle ideas,
- buyer promise options,
- listing description,
- cover direction,
- launch checklist,
- compliance reminder.

- [x] **Step 4: Commit**

```powershell
git add public/products/kdp-niche-scorecard
git commit -m "docs: add kdp scorecard product assets"
```

---

### Task 5: Add Distribution and Tracking

**Files:**
- Modify: `ops/agent-native-revenue/distribution-task-list.md`
- Modify: `ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv`

- [x] **Step 1: Add organic distribution tasks**

Add:
- SEO title and meta description.
- Five Pinterest-style post prompts.
- Five short-form video hooks.
- Three Reddit-safe value post drafts with no spammy links in the body.
- One Indie Hackers/Product Hunt style launch note.

- [x] **Step 2: Add dashboard row**

Track:
- SKU,
- page URL,
- views,
- free sample clicks,
- checkout clicks,
- sales,
- refunds,
- revenue,
- build hours,
- next action.

- [x] **Step 3: Commit**

```powershell
git add ops/agent-native-revenue/distribution-task-list.md ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv
git commit -m "ops: add kdp scorecard distribution tracking"
```

---

### Task 6: Verify and Launch

**Files:**
- Verify only.

- [x] **Step 1: Run tests**

```powershell
npm test
```

Expected: all tests pass.

- [x] **Step 2: Run lint**

```powershell
npm run lint
```

Expected: no lint errors.

- [x] **Step 3: Run production build**

- [x] **Step 3.5: Run product foundry eval gate**

Run:

```powershell
npm run eval:products
```

```powershell
npm run build
```

Expected: build completes successfully.

- [x] **Step 4: Start dev server**

```powershell
npm run dev
```

Expected: local site serves the new route at `/kdp-niche-scorecard`.

Note: dev server was already running on `http://localhost:3027` during this run; routes returned 200.

- [x] **Step 5: Browser QA**

Open:

```text
http://localhost:3000/kdp-niche-scorecard
```

Check:
- page is readable on desktop,
- page is readable on mobile,
- free sample link works,
- paid CTA is visible,
- disclaimer is visible,
- no text overlaps.

Evidence screenshots (Playwright, production URL):
- `outputs/kdp-scorecard-desktop.png`
- `outputs/kdp-scorecard-mobile.png`

- [x] **Step 6: Commit launch polish**

Note (2026-04-26 ET): working tree is clean; no additional commit required for “launch polish”.

```powershell
git status --short
git add .
git commit -m "chore: verify kdp scorecard launch"
```

---

## Execution Decision

Recommended execution order:
1. Task 1 and Task 2 in the same session.
2. Task 3 after score logic passes.
3. Task 4 and Task 5 in parallel if subagents are available.
4. Task 6 after all files are in place.

Revenue gate:
Do not build n8n, wallets, paid APIs, or high-ticket service automation until this funnel produces at least one of:
- a sale,
- repeated checkout clicks,
- direct buyer request,
- 5%+ free sample click rate from targeted traffic.

---

### Task 7: No-Spend Distribution + Measurement

**Goal:** Get first real traffic and clicks. Distribution is the bottleneck until `Views > 0`.

**Files:**
- Create/Modify: `ops/agent-native-revenue/community-opportunities.csv`
- Modify: `ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv`

- [x] **Step 1: Create a placement list (30 opportunities)**

Artifact: `ops/agent-native-revenue/community-opportunities.csv`

- [x] **Step 2: Publish 3 organic placements (or record as blocked by auth/access)**

Rules:
- Value-first (post must stand alone without a link if rules are strict).
- No spam, no vote solicitation, no sales/ranking/income guarantees.
- No outbound email for this step.

Note: posting requires existing authenticated accounts; see `ops/agent-native-revenue/first-three-organic-placement-packet.md` auth preflight.
Status (2026-04-26 ET): Hacker News + Reddit recorded as blocked (login required). Product Hunt is scheduled for 2026-04-28 03:01 ET; capture the final live URL on launch day (see `ops/agent-native-revenue/placement-tracking-log.csv`).

Recommended starting placements:
- Product Hunt (post product)
- Hacker News (Show HN)
- Reddit r/SideProject (I built this)

- [x] **Step 2.5: Improve the free tool UX while placements are blocked**

Status (2026-04-26 08:00 ET): shipped interactive score sliders + shareable link on `/kdp-niche-scorecard` and repaired `npm run eval:products` distribution-gate check. Gates: `npm test`, `npm run lint`, `npm run build`, `npm run eval:products` PASS.

Status (2026-04-26 10:00 ET): updated the scorecard page link text to avoid leading with internal "rubric" wording, and aligned Product Hunt tracking artifacts to use canonical `https://battlelabs.live/kdp-niche-scorecard`. Gates: `npm test`, `npm run lint`, `npm run build`, `npm run eval:products` PASS.

Status (2026-04-26 11:11 ET): added a public-friendly checklist URL (`/kdp-niche-scorecard/checklist`) and redirected the old `/kdp-niche-scorecard/rubric` path, then updated Product Hunt + placement artifacts to reference the checklist URL. Gates: `npm test`, `npm run lint`, `npm run build`, `npm run eval:products` PASS.

- [ ] **Step 3: Update metrics after posting**

Note (2026-04-26 ET): waiting on live placement URLs/timestamps (PH scheduled for 2026-04-28 03:01 ET); after posting, update dashboard + 24h counters.

Update `ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv` with:
- Views
- Free sample clicks
- Checkout clicks
