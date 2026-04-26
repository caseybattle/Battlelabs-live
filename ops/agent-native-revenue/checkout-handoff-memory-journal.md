# Checkout Handoff - Memory Journal Gift Launch Kit (BL-005)

Goal: create a live $9 intro checkout link, wire it into the site, and verify the CTA lands on a real checkout with correct price + delivery.

Canonical landing page (public):

`https://battlelabs.live/memory-journal-gift-kit`

Update (2026-04-26 ET): an internal checkout route is now shipped at:

`https://battlelabs.live/memory-journal-gift-kit/checkout`

It uses PayPal Buttons for the $9 intro capture and then surfaces the download links. This unblocks validation without external Payhip/Gumroad account access. If you want automatic file delivery + receipts, still set up Payhip/Gumroad and override the env var below.

Env var used by the app:

`NEXT_PUBLIC_MEMORY_JOURNAL_CHECKOUT_URL`

Important: keep the checkout URL stable. The app adds tracking query params on top of this base URL. Do not use a provider link that breaks when query params are appended.

---

## What to Create (Copy/Paste)

### Product

- Title: `Memory Journal Gift Launch Kit`
- Intro price: `$9`
- (Optional) Regular price reference: `$19`

Short description:

`Printable memory journal launch kit for creators testing a narrow family keepsake product. Includes a free sample, full printable interior, KDP scorecard, listing copy, launch checklist, and promo graphics.`

Refund terms:

`Digital download. Refunds are available within 7 days if the files cannot be accessed or the product is materially different from the description. No refunds for completed downloads used to create or publish derivative products.`

### Files to Deliver

Source folder:

`C:\Users\casba\OneDrive\Desktop\Codex 1 Million\Battlelabs-live\public\products\memory-journal-gift-kit`

Deliver to buyers (paid):

- `grandma-memory-journal-full-interior.pdf`
- `kdp-niche-scorecard.csv`
- `launch-checklist.csv`
- `listing-copy.md`
- `product-preview.pdf`
- `gift-kit-pin-01.svg`
- `gift-kit-pin-02.svg`
- `gift-kit-pin-03.svg`
- `gift-kit-pin-04.svg`
- `gift-kit-pin-05.svg`

Public free sample (do not deliver as the paid payload unless you explicitly want it included too):

- `grandma-memory-journal-free-sample.pdf`

Quick local verification:

```powershell
Get-ChildItem "public/products/memory-journal-gift-kit" -File | Select-Object Name,Length
```

---

## Provider Options (Pick One)

### Option D: Battlelabs internal checkout (shipped)

Outcome: use the built-in checkout route:

`https://battlelabs.live/memory-journal-gift-kit/checkout`

No external provider setup is required. Optional: keep this as the default and add Payhip/Gumroad later when you want automated delivery.

### Option A: PayPal (fastest)

Outcome needed: a PayPal checkout URL (Hosted Button / Pay Link) that:

- charges exactly `$9`
- is publicly accessible
- does not require special account login to purchase
- still works when `?source_page=...&offer_name=...` is appended

Notes:

- Prefer a hosted checkout link (not an email-only invoice flow).
- If PayPal offers return/cancel URLs, use:
  - Return URL: `https://battlelabs.live/memory-journal-gift-kit`
  - Cancel URL: `https://battlelabs.live/memory-journal-gift-kit`

### Option B: Payhip (best for digital delivery)

Outcome needed: a Payhip product URL that:

- is set to `$9`
- delivers the files above after payment
- tolerates query params

### Option C: Gumroad (simple, also good for delivery)

Outcome needed: a Gumroad product URL that:

- is set to `$9`
- delivers the files above after payment
- tolerates query params

---

## Wire It Into the Site (No Code Changes Needed)

Default behavior: if `NEXT_PUBLIC_MEMORY_JOURNAL_CHECKOUT_URL` is blank, the landing page routes to `/memory-journal-gift-kit/checkout`.

To override with an external provider:

1) Put the provider checkout URL into `.env.local`:

```env
NEXT_PUBLIC_MEMORY_JOURNAL_CHECKOUT_URL=https://<your-checkout-link>
```

2) Verify locally (CTA should show “Buy Intro Kit $9” on the page):

```powershell
npm run dev
```

3) Deploy using the repo’s normal deploy flow.

---

## Verification Checklist (BL-005 Acceptance)

- [ ] `https://battlelabs.live/memory-journal-gift-kit` shows the “Buy Intro Kit $9” CTA
- [ ] CTA lands on `https://battlelabs.live/memory-journal-gift-kit/checkout` (or the provider checkout page if overridden)
- [ ] PayPal flow loads and shows `$9` for the intro kit
- [ ] After successful payment, downloads are presented (or provider delivers the files listed above)
- [ ] Provider checkout (if used) tolerates appended query params

---

## Compliance Guardrails

- No income, ranking, or “bestseller” claims in listing copy.
- No fake scarcity (“only 100 left”), testimonials, or reviews.
- If a marketplace requires an “AI disclosure” checkbox/field, be truthful.
