$ErrorActionPreference = 'Stop'
$root = 'C:\Users\David Bulauski\nova-apex-automation'
$client = Join-Path $root 'client'
$viteJs = Join-Path $root 'node_modules\vite\bin\vite.js'
$logOut = Join-Path $root 'vite_verify_demo.out.log'
$logErr = Join-Path $root 'vite_verify_demo.err.log'
Remove-Item -LiteralPath $logOut,$logErr -Force -ErrorAction SilentlyContinue

$node = (Get-Command node -CommandType Application).Source
Write-Output ("nodeBin=" + $node)
Write-Output ("viteJsExists=" + (Test-Path -LiteralPath $viteJs))

$proc = Start-Process -FilePath $node -ArgumentList @($viteJs,'--port','5199','--strictPort') -WorkingDirectory $root -RedirectStandardOutput $logOut -RedirectStandardError $logErr -PassThru -WindowStyle Hidden
Write-Output ("nodePid=" + $proc.Id)
Start-Sleep -Seconds 14

Write-Output '--- vite stdout ---'
if (Test-Path -LiteralPath $logOut) { Get-Content -LiteralPath $logOut -Raw }
Write-Output '--- vite stderr ---'
if (Test-Path -LiteralPath $logErr) { Get-Content -LiteralPath $logErr -Raw }

$http = [System.Net.Http.HttpClient]::new()
$http.Timeout = [TimeSpan]::FromSeconds(60)

function ProbeHash([string]$label,[string]$url,[string]$diskFile) {
  try {
    $resp = $http.GetAsync($url).GetAwaiter().GetResult()
    $bytes = $resp.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
    $sha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::HashData($bytes)) -replace '-',''
    $match = 'N/A'
    $diskSha = ''
    if ($diskFile -and (Test-Path -LiteralPath $diskFile)) {
      $dbytes = [System.IO.File]::ReadAllBytes($diskFile)
      $diskSha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::HashData($dbytes)) -replace '-',''
      $match = ($sha -eq $diskSha)
    }
    Write-Output ("{0}: HTTP={1} bytes={2} sha={3} diskSha={4} IDENTICAL={5}" -f $label,[int]$resp.StatusCode,$bytes.Length,$sha,$diskSha,$match)
  } catch {
    Write-Output ("{0}: ERROR {1}" -f $label,$_.Exception.Message)
  }
}

ProbeHash 'demo-engine.html' 'http://127.0.0.1:5199/demo-engine.html' (Join-Path $client 'public\demo-engine.html')
ProbeHash 'transparent_engine.webm' 'http://127.0.0.1:5199/transparent_engine.webm' (Join-Path $client 'public\transparent_engine.webm')
ProbeHash 'new_background.png' 'http://127.0.0.1:5199/new_background.png' (Join-Path $client 'public\new_background.png')

$http.Dispose()
if (-not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output '--- done ---'
