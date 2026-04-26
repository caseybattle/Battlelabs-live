param(
  [Parameter(Mandatory = $true)]
  [string]$LogPath,

  [string]$Start,
  [string]$End,
  [string]$Page,
  [switch]$AsCsv
)

$ErrorActionPreference = "Stop"

if (!(Test-Path -LiteralPath $LogPath)) {
  throw "LogPath not found: $LogPath"
}

function Parse-DateTimeOffset([string]$value) {
  if (!$value) {
    return $null
  }

  return [DateTimeOffset]::Parse($value, [Globalization.CultureInfo]::InvariantCulture)
}

$startTime = Parse-DateTimeOffset $Start
$endTime = Parse-DateTimeOffset $End

$metricEvents = New-Object System.Collections.Generic.List[object]
$parseErrors = 0

Get-Content -LiteralPath $LogPath -ReadCount 5000 | ForEach-Object {
  foreach ($line in $_) {
    if ($line -notmatch '\[METRIC_EVENT\]\s+(?<json>\{.*\})\s*$') {
      continue
    }

    $json = $Matches["json"]

    try {
      $evt = $json | ConvertFrom-Json -ErrorAction Stop
      $ts = Parse-DateTimeOffset ([string]$evt.ts)
      if (!$ts) {
        $parseErrors++
        continue
      }

      $pageValue = [string]$evt.page
      if ([string]::IsNullOrWhiteSpace($pageValue)) {
        $pageValue = "unknown"
      }

      $eventValue = [string]$evt.event
      if ([string]::IsNullOrWhiteSpace($eventValue)) {
        $eventValue = "unknown"
      }

      $metricEvents.Add([pscustomobject]@{
        ts    = $ts
        page  = $pageValue
        event = $eventValue
      })
    } catch {
      $parseErrors++
    }
  }
}

$filtered = $metricEvents

if ($startTime) {
  $filtered = $filtered | Where-Object { $_.ts -ge $startTime }
}
if ($endTime) {
  $filtered = $filtered | Where-Object { $_.ts -lt $endTime }
}
if ($Page) {
  $pageRaw = $Page.Trim()
  $pageCandidates = New-Object "System.Collections.Generic.HashSet[string]"
  [void]$pageCandidates.Add($pageRaw)
  if ($pageRaw.StartsWith("/")) {
    [void]$pageCandidates.Add($pageRaw.TrimStart("/"))
  } else {
    [void]$pageCandidates.Add("/$pageRaw")
  }

  $filtered = $filtered | Where-Object { $pageCandidates.Contains($_.page) }
}

$counts = $filtered | Group-Object page, event | Sort-Object Count -Descending | ForEach-Object {
  $first = $_.Group | Select-Object -First 1
  [pscustomobject]@{
    Page  = [string]$first.page
    Event = [string]$first.event
    Count = $_.Count
  }
}

if ($AsCsv) {
  $counts | ConvertTo-Csv -NoTypeInformation
} else {
  $window = @()
  if ($startTime -and $endTime) {
    $window = @("Window: $($startTime.ToString('o')) .. $($endTime.ToString('o'))")
  } elseif ($startTime) {
    $window = @("Window: >= $($startTime.ToString('o'))")
  } elseif ($endTime) {
    $window = @("Window: < $($endTime.ToString('o'))")
  }

  $eventCount = ($filtered | Measure-Object).Count
  $header = @(
    "Parsed metric events: $($metricEvents.Count)",
    "Filtered metric events: $eventCount",
    "Parse errors: $parseErrors"
  ) + $window

  $header | ForEach-Object { $_ }
  ""

  if ($counts.Count -eq 0) {
    "No metric events matched the filters."
  } else {
    $counts | Format-Table -AutoSize | Out-String -Width 200
    if ($Page) {
      $views = ($filtered | Where-Object { $_.event -eq "page_view" } | Measure-Object).Count
      $sample = ($filtered | Where-Object { $_.event -eq "free_sample_click" } | Measure-Object).Count
      $checkout = ($filtered | Where-Object { $_.event -eq "checkout_click" } | Measure-Object).Count
      $downloads = ($filtered | Where-Object { $_.event -eq "download_click" } | Measure-Object).Count
      $shareUrl = ($filtered | Where-Object { $_.event -eq "share_url_copy" } | Measure-Object).Count
      $shareText = ($filtered | Where-Object { $_.event -eq "share_text_copy" } | Measure-Object).Count

      "Quick counters for ${Page}:"
      "Views (page_view): $views"
      "Free sample clicks (free_sample_click): $sample"
      "Checkout clicks (checkout_click): $checkout"
      "Downloads (download_click): $downloads"
      "Share URL copies (share_url_copy): $shareUrl"
      "Share text copies (share_text_copy): $shareText"
    }
  }
}
