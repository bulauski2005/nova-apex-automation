$ErrorActionPreference = 'Stop'
$root   = Join-Path $env:USERPROFILE 'nova-apex-automation'
$client = Join-Path $root 'client'
$viteJs = Join-Path $root 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $viteJs)) { throw 'no vite.js' }

$logOut = Join-Path $root 'serve3.out.log'
$logErr = Join-Path $root 'serve3.err.log'
Remove-Item -LiteralPath $logOut,$logErr -Force -ErrorAction SilentlyContinue

$nodeExe = (Get-Command node -ErrorAction Stop).Source
$argList = @($viteJs,'--port','5199','--strictPort')

$proc = Start-Process -FilePath $nodeExe -ArgumentList $argList -WorkingDirectory $client -RedirectStandardOutput $logOut -RedirectStandardError $logErr -PassThru -WindowStyle Hidden
Write-Output ("pid=" + $proc.Id)
Start-Sleep -Seconds 14
Write-Output '-- out --'
if (Test-Path -LiteralPath $logOut) { Get-Content -LiteralPath $logOut -Raw }
Write-Output '-- err --'
if (Test-Path -LiteralPath $logErr) { Get-Content -LiteralPath $logErr -Raw }

$sha = { param($b) [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::HashData($b)) -replace '-','' }
function Probe([string]$label,[string]$url,[string]$disk) {
  try {
    $r = [System.Net.Http.HttpClient]::new()
    $r.Timeout = [TimeSpan]::FromSeconds(120)
    $resp = $r.GetAsync($url).GetAwaiter().GetResult()
    $b = $resp.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
    $hs = & $sha $b
    $d = [System.IO.File]::ReadAllBytes($disk)
    $m = ($d.Length -eq $b.Length) -and ($hs -eq (& $sha $d))
    Write-Output ("{0} HTTP={1} bytes={2} sha={3} IDENTICAL={4}" -f $label,[int]$resp.StatusCode,$b.Length,$hs,$m)
    $r.Dispose()
  } catch {
    Write-Output ("{0} ERROR {1}" -f $label,$_.Exception.Message)
  }
}

$base = 'http://127.0.0.1:5199'
Probe 'demo-engine.html'        ($base + '/demo-engine.html')      (Join-Path $client 'public\demo-engine.html')
Probe 'transparent_engine.webm' ($base + '/transparent_engine.webm') (Join-Path $client 'public\transparent_engine.webm')
Probe 'new_background.png'      ($base + '/new_background.png')    (Join-Path $client 'public\new_background.png')

if (-not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output '-- done --'
