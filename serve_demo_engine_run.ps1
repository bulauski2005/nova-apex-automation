$ErrorActionPreference = 'Stop'
$root   = Join-Path $env:USERPROFILE 'nova-apex-automation'
$client = Join-Path $root 'client'
$logOut = Join-Path $root 'serve_demo_engine.out.log'
$logErr = Join-Path $root 'serve_demo_engine.err.log'
Remove-Item -LiteralPath $logOut,$logErr -Force -ErrorAction SilentlyContinue

$nodeExe = (Get-Command node -ErrorAction Stop).Source
$viteJs  = Join-Path $root 'node_modules\vite\bin\vite.js'
if (-not (Test-Path -LiteralPath $viteJs)) { throw "vite.js missing: $viteJs" }

Write-Output ("node=" + $nodeExe)
Write-Output ("vite=" + $viteJs)

# Windows .cmd shim for pnpm would get mangled by this channel; node+vite directly instead.
$psi = [System.Diagnostics.ProcessStartInfo]::new()
$psi.FileName = $nodeExe
$psi.WorkingDirectory = $client
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.ArgumentList.Add($viteJs)
$psi.ArgumentList.Add('--port')
$psi.ArgumentList.Add('5199')
$psi.ArgumentList.Add('--strictPort')

$proc = [System.Diagnostics.Process]::new()
$proc.StartInfo = $psi

$outBuilder = [System.Text.StringBuilder]::new()
$errBuilder = [System.Text.StringBuilder]::new()
$outEvent = Register-ObjectEvent -InputObject $proc -EventName OutputDataReceived -Action { param($s,$e) if ($e.Data) { [void]$s.SyncRoot.. } }
# Simpler: read after
$proc.Start() | Out-Null
$proc.BeginOutputReadLine()
$proc.BeginErrorReadLine()

Write-Output ("pid=" + $proc.Id)
Start-Sleep -Seconds 16

if (-not $proc.HasExited) { Write-Output 'serverSTILL_RUNNING=True' } else { Write-Output ("serverExited=" + $proc.ExitCode) }

$http = [System.Net.Http.HttpClient]::new()
$http.Timeout = [TimeSpan]::FromSeconds(120)

function Probe([string]$label,[string]$url,[string]$diskFile) {
  try {
    $resp = $http.GetAsync($url).GetAwaiter().GetResult()
    $bytes = $resp.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()
    $sha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::HashData($bytes)) -replace '-',''
    $diskByte = [System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath $diskFile))
    $diskSha = [System.BitConverter]::ToString([System.Security.Cryptography.SHA256]::HashData($diskByte)) -replace '-',''
    $match = ($sha -eq $diskSha) -and ($bytes.Length -eq $diskByte.Length)
    Write-Output ("{0}: HTTP={1} bytes={2} sha={3} diskBytes={4} diskSha={5} BYTE_IDENTICAL={6}" -f $label,[int]$resp.StatusCode,$bytes.Length,$sha,$diskByte.Length,$diskSha,$match)
  } catch {
    Write-Output ("{0}: ERROR {1}" -f $label,$_.Exception.Message)
  }
}

Probe 'demo-engine.html' 'http://127.0.0.1:5199/demo-engine.html' (Join-Path $client 'public\demo-engine.html')
Probe 'transparent_engine.webm' 'http://127.0.0.1:5199/transparent_engine.webm' (Join-Path $client 'public\transparent_engine.webm')
Probe 'new_background.png' 'http://127.0.0.1:5199/new_background.png' (Join-Path $client 'public\new_background.png')

$http.Dispose()
if (-not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
Write-Output '--- done ---'
