param(
  [string]$Target = "https://battlelabs.live",

  [Parameter(Mandatory = $true)]
  [string]$OutPath,

  [int]$Minutes = 10
)

$ErrorActionPreference = "Stop"

if ($Minutes -lt 5) {
  throw "Minutes must be >= 5 (vercel logs streams for up to 5 minutes per chunk)."
}

$outDir = Split-Path -Parent $OutPath
if ($outDir) {
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null
}

function Resolve-DeploymentId([string]$inspectTarget) {
  $inspectLines = cmd /c "vercel inspect $inspectTarget 2>&1"
  $match = $inspectLines | Select-String -Pattern '^\s*id\s+(\S+)\s*$' | Select-Object -First 1
  if (!$match) {
    throw "Failed to resolve deployment id from `vercel inspect $inspectTarget` output."
  }

  return $match.Matches[0].Groups[1].Value
}

$deploymentId = Resolve-DeploymentId $Target
$deadline = (Get-Date).AddMinutes($Minutes)

Add-Content -LiteralPath $OutPath -Value ("# vercel logs capture`n# target: {0}`n# deployment: {1}`n# started: {2}`n" -f $Target, $deploymentId, (Get-Date).ToString("o"))

while ((Get-Date) -lt $deadline) {
  $remainingSeconds = [int][Math]::Ceiling(($deadline - (Get-Date)).TotalSeconds)
  if ($remainingSeconds -lt 5) {
    break
  }

  Add-Content -LiteralPath $OutPath -Value ("`n# chunk started: {0}`n" -f (Get-Date).ToString("o"))

  $raw = cmd /c "vercel logs $deploymentId --json 2>&1"

  foreach ($line in $raw) {
    if ([string]::IsNullOrWhiteSpace($line)) {
      continue
    }

    try {
      $evt = $line | ConvertFrom-Json -ErrorAction Stop
      if ($evt -and $evt.message) {
        Add-Content -LiteralPath $OutPath -Value ([string]$evt.message)
        continue
      }
    } catch {
      # ignore parse errors; fall back to raw line
    }

    Add-Content -LiteralPath $OutPath -Value $line
  }

  Add-Content -LiteralPath $OutPath -Value ("# chunk ended: {0}`n" -f (Get-Date).ToString("o"))

  Start-Sleep -Seconds 2
}

Add-Content -LiteralPath $OutPath -Value ("`n# ended: {0}`n" -f (Get-Date).ToString("o"))
Write-Output ("Wrote {0} (deployment {1})" -f $OutPath, $deploymentId)
