# Google Drive Setup - Battlelabs Agent-Native Revenue Portfolio

## Current Access Status

The local product assets are ready, but Google Drive write actions through the connector returned `403 Forbidden`. Until the Drive OAuth scope is refreshed, use browser/manual upload or import these files from the local workspace.

Evidence (2026-04-26 ET): the Codex in-app browser hit the Google account sign-in gate when attempting to open Drive. Screenshot: `outputs/google-drive-signin-blocker-2026-04-26.png`.

## BL-004 Quick Runbook (Manual, No Connector)

Goal: import the dashboard into Google Sheets with tabs preserved, then paste the resulting Sheet URL into your command center notes (or wherever you track ops links).

Fastest path: use the deterministic CSV packet (avoids XLSX import quirks).

1) In your normal Chrome session (already logged into Google), open Drive:
   - `https://drive.google.com/drive/my-drive`
2) Create (or open) the folder:
   - `Battlelabs Agent-Native Revenue Portfolio/00_COMMAND_CENTER/`
3) Create a new Google Sheet named:
   - `Battlelabs - Dashboard - Agent Product Portfolio - 2026-04-26`
4) Import the CSV tabs, in order, from:
   - `C:\Users\casba\OneDrive\Desktop\Codex 1 Million\Battlelabs-live\ops\agent-native-revenue\dashboard-tabs`
   - Or upload/extract: `ops/agent-native-revenue/dashboard-tabs-import-pack-2026-04-26.zip`

Recommended import order:
- `Product Metrics.csv` (Replace current sheet)
- `QA Checklist.csv` (Insert new sheet)
- `Task Queue.csv` (Insert new sheet)
- `Linear Import.csv` (Insert new sheet)
- `Keyword Map.csv` (Insert new sheet)

Verification checklist (BL-004 Acceptance):
- [ ] Each tab exists and looks sane (no huge blank columns).
- [ ] Values render as expected (no obvious delimiter issues).
- [ ] Share settings are correct for your workflow (view-only unless actively editing).

If you see “phantom blank columns” after import:
- Re-export tabs with `python ops/agent-native-revenue/scripts/export_dashboard_tabs.py` (it trims trailing empty columns).

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

### Sheets Import Packet (No Connector Needed)

If Google Sheets import of the XLSX is flaky (or you want deterministic tab imports), use the exported CSV packet:

`C:\Users\casba\OneDrive\Desktop\Codex 1 Million\Battlelabs-live\ops\agent-native-revenue\dashboard-tabs`

It contains one CSV per tab (`Product Metrics.csv`, `QA Checklist.csv`, `Task Queue.csv`, `Linear Import.csv`, `Keyword Map.csv`).

Quick import flow (browser/manual):

- Create a new Google Sheet in the target Drive folder.
- `File` -> `Import` -> `Upload` -> select `Product Metrics.csv` -> Import location: `Replace current sheet`.
- Repeat `File` -> `Import` for each remaining CSV -> Import location: `Insert new sheet(s)` (keeps each tab separate).

Regenerate it any time the XLSX changes:

`python ops/agent-native-revenue/scripts/export_dashboard_tabs.py`

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
- [ ] Import XLSX as Google Sheet (or import `dashboard-tabs/*.csv` as tabs).
- [ ] Upload launch/distribution docs.
- [ ] Copy Drive links into `Product Metrics`.
- [ ] Add checkout link after PayPal/Payhip/Gumroad product is created.
- [ ] Mark `BL-004` accepted in `portfolio-task-queue.csv`.
