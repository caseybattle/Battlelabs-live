# Google Sheets Import Manifest (No Connector)

This folder contains one CSV per dashboard tab, exported from:

`ops/agent-native-revenue/battlelabs-agent-product-dashboard.xlsx`

Regenerate the packet after any dashboard update:

```powershell
python ops/agent-native-revenue/scripts/export_dashboard_tabs.py
```

Import into Google Sheets (browser/manual):

1) Create a new Google Sheet in the target Drive folder.
2) Import in this order:

| Order | CSV file | Import setting |
| --- | --- | --- |
| 1 | `Product Metrics.csv` | Replace current sheet |
| 2 | `QA Checklist.csv` | Insert new sheet(s) |
| 3 | `Task Queue.csv` | Insert new sheet(s) |
| 4 | `Linear Import.csv` | Insert new sheet(s) |
| 5 | `Keyword Map.csv` | Insert new sheet(s) |

3) After import, copy the resulting Google Sheet URL into the `Product Metrics` tab in the local XLSX (and later into the sheet itself once it’s the primary dashboard).

