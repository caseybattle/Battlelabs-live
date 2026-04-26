# Battlelabs Metrics Playbook (No-Spend)

This sprint tracks only what is actionable for the next decision.

## What we track

- **Views**: `page_view` events
- **Free sample clicks / downloads**: `free_sample_click` events
- **Checkout clicks**: `checkout_click` events
- **Paid delivery downloads (optional)**: `download_click` events
- **Share usage (optional)**: `share_url_copy` and `share_text_copy` events

## Where the numbers come from

Battlelabs emits a small no-spend metric event log line from `POST /api/metrics/event`.

Each event logs as a single line containing `[METRIC_EVENT]` in the deployment logs (ex: Vercel logs).

## How to count (24h snapshot)

1. Open deployment logs for `battlelabs.live`.
2. Filter for `[METRIC_EVENT]`.
3. Count events by `event` + `page` over the 24h window after a placement goes live.
4. Update:
   - `ops/agent-native-revenue/placement-tracking-log.csv` (per-channel 24h counters)
   - `ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv` (per-SKU counters)
   - `ops/agent-native-revenue/metrics-snapshot-log.csv` (timestamped snapshots)

## Optional: automated counting (PowerShell, no-spend)

If you can pull logs locally (ex: Vercel CLI from this repo), you can count deterministically with:

```powershell
# Example: pull recent logs to a file (adjust --since as needed)
vercel logs --since 24h --output raw > outputs/vercel-logs-24h.txt

# Example: count metrics for a 24h window after Product Hunt goes live (EDT)
powershell -ExecutionPolicy Bypass -File scripts/summarize-metric-events.ps1 `
  -LogPath outputs/vercel-logs-24h.txt `
  -Page /kdp-niche-scorecard `
  -Start "2026-04-28 03:01:00 -04:00" `
  -End "2026-04-29 03:01:00 -04:00"
```

## Allowed event names

- `page_view`
- `free_sample_click`
- `checkout_click`
- `download_click`
- `share_url_copy`
- `share_text_copy`
