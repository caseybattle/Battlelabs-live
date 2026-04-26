# Google Drive Setup - Battlelabs Agent-Native Revenue Portfolio

## Current Access Status

The local product assets are ready, but Google Drive write actions through the connector returned `403 Forbidden`. Until the Drive OAuth scope is refreshed, use browser/manual upload or import these files from the local workspace.

## Recommended Drive Folder

Create this folder:

`Battlelabs Agent-Native Revenue Portfolio`

Inside it, create:

- `00_COMMAND_CENTER`
- `01_LANDING_AND_FORMS`
- `02_PRODUCTS`
- `03_REVENUE_OPS`
- `04_RAW_IMPORTS`
- `99_ARCHIVE`

Detailed structure:

```text
Battlelabs Agent-Native Revenue Portfolio/
  00_COMMAND_CENTER/
    Battlelabs Revenue Command Center - README
    Battlelabs Agent Product Dashboard - 2026-04-25
    Revenue Operating Links
  01_LANDING_AND_FORMS/
    Landing Page Snapshots/
    Intake Forms/
  02_PRODUCTS/
    Memory Journal Gift Kit/
      00_Product Brief/
      01_Deliverables/
      02_Market Data/
      03_Public Share Pack/
  03_REVENUE_OPS/
    Outbound/
    Inbound/
    Proposals/
    Teardowns/
    Fulfillment/
    Payments/
    Proof And Case Studies/
  04_RAW_IMPORTS/
    HTML/
    PDFs/
    CSV/
    XLSX/
    Markdown/
  99_ARCHIVE/
    Superseded Snapshots/
    Old Exports/
```

## Files To Upload

### 02_PRODUCTS / Memory Journal Gift Kit

Upload the full product folder:

`C:\Users\casba\OneDrive\Desktop\Codex 1 Million\Battlelabs-live\public\products\memory-journal-gift-kit`

Key files:

- `grandma-memory-journal-free-sample.pdf`
- `grandma-memory-journal-full-interior.pdf`
- `product-preview.pdf`
- `kdp-niche-scorecard.csv`
- `launch-checklist.csv`
- `listing-copy.md`
- `gift-kit-pin-01.svg` through `gift-kit-pin-05.svg`

### 00_COMMAND_CENTER / Dashboard

Upload or import:

`C:\Users\casba\OneDrive\Desktop\Codex 1 Million\Battlelabs-live\ops\agent-native-revenue\battlelabs-agent-product-dashboard.xlsx`

If importing into Google Sheets, preserve:

- `Product Metrics`
- `QA Checklist`

### 04_RAW_IMPORTS and Working Folders

Upload:

- `memory-journal-launch-pack.md`
- `portfolio-task-queue.csv`
- `linear-import.csv`
- `distribution-task-list.md`
- `warm-gmail-drafts.md`

Canonical mapping:

- `battlelabs-agent-product-dashboard.xlsx` -> `00_COMMAND_CENTER/Battlelabs Agent Product Dashboard - 2026-04-25`
- `memory-journal-launch-pack.md` -> `02_PRODUCTS/Memory Journal Gift Kit/00_Product Brief/Memory Journal Launch Pack - 2026-04-25`
- `grandma-memory-journal-full-interior.pdf` -> `02_PRODUCTS/Memory Journal Gift Kit/01_Deliverables/Grandma Memory Journal - Full Interior.pdf`
- `grandma-memory-journal-free-sample.pdf` -> `02_PRODUCTS/Memory Journal Gift Kit/01_Deliverables/Grandma Memory Journal - Free Sample.pdf` and `02_PRODUCTS/Memory Journal Gift Kit/03_Public Share Pack/Public Sample PDF`
- `product-preview.pdf` -> `02_PRODUCTS/Memory Journal Gift Kit/03_Public Share Pack/Product Preview PDF`
- `kdp-niche-scorecard.csv` -> dashboard tab `KDP Niche Scorecard`
- `launch-checklist.csv` -> dashboard tab `Launch Checklist`
- `listing-copy.md` -> Google Doc `Listing Copy - Memory Journal Gift Kit`
- `linear-import.csv` -> `00_COMMAND_CENTER/Linear Import - Product Portfolio`

## Sharing Rules

- Keep product source files private until checkout/delivery flow is ready.
- Publicly share only the free sample and landing page assets.
- Do not publicly share the full paid interior outside the checkout/delivery flow.
- Use view-only links for collaborators unless they are actively editing.
- Store every checkout link and product URL in the dashboard, not scattered in notes.
- Disable download/print/copy for public sample PDFs if Drive settings allow it.

## Naming Rules

Use:

`Battlelabs - [Asset Type] - [Product/Workflow] - YYYY-MM-DD`

Examples:

- `Battlelabs - Dashboard - Agent Product Portfolio - 2026-04-25`
- `Battlelabs - Launch Pack - Memory Journal Gift Kit - 2026-04-25`
- `Battlelabs - Public Sample - Grandma Memory Journal - 2026-04-25`
- `Battlelabs - Checklist - Launch Readiness - 2026-04-25`

## Manual Import Checklist

- [ ] Create Drive folder.
- [ ] Upload product folder.
- [ ] Import XLSX as Google Sheet.
- [ ] Upload launch/distribution docs.
- [ ] Copy Drive links into `Product Metrics`.
- [ ] Add checkout link after PayPal/Payhip/Gumroad product is created.
- [ ] Mark `BL-004` accepted in `portfolio-task-queue.csv`.
