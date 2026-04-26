# Battle Labs

Battle Labs is a conversion-focused site for async AI automation services and agent-built digital products. The service-facing pages remain intact, and the first agent-native product lane is available at `/memory-journal-gift-kit`.

## Agent-native product lane

The first product SKU is `Memory Journal Gift Launch Kit`, an agent-created printable product bundle for KDP and digital-product creators. Regenerate the product files with:

```bash
python scripts/generate_memory_journal_assets.py
```

Generated assets are written to:

- `public/products/memory-journal-gift-kit/`
- `ops/agent-native-revenue/battlelabs-agent-product-dashboard.xlsx`

## Local development

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Environment

Set `NEXT_PUBLIC_CONTACT_EMAIL` to the inbox that should receive Battle Labs inquiries. If omitted, the site falls back to `hello@battlelabs.live`.

Set `NEXT_PUBLIC_MEMORY_JOURNAL_CHECKOUT_URL` when the PayPal, Payhip, or Gumroad checkout link is ready.
