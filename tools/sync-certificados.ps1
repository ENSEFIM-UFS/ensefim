$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$sources = Get-Content -Raw -Encoding UTF8 (Join-Path $root 'certificados-fontes.json') | ConvertFrom-Json
$records = @()
$codes = @{}
foreach ($source in $sources) {
  $url = 'https://docs.google.com/spreadsheets/d/' + $source.planilhaId + '/export?format=csv'
  if ($source.gid) { $url += '&gid=' + [Uri]::EscapeDataString($source.gid) }
  $url += '&cachebust=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{ 'Cache-Control' = 'no-cache'; Pragma = 'no-cache' }
  $csv = [Text.Encoding]::UTF8.GetString($response.RawContentStream.ToArray())
  $rows = @($csv | ConvertFrom-Csv)
  $folder = (Invoke-WebRequest -Uri ('https://drive.google.com/drive/folders/' + $source.pastaId) -UseBasicParsing).Content
  foreach ($row in $rows) {
    $code = ([string]$row.'NÚMERO DO CERTIFICADO').Trim().ToUpperInvariant()
    if (-not $code) { continue }
    if ($code -notmatch '^[A-Z0-9-]{1,100}$' -or $codes.ContainsKey($code)) { throw "Código inválido ou duplicado: $code" }
    # Apresentador é o titular para trabalhos, nunca a lista de coautores.
    $name = ([string]$row.Apresentador).Trim()
    if (-not $name) { $name = ([string]$row.Nome).Trim() }
    if (-not $name) { $name = ([string]$row.PALESTRANTE).Trim() }
    if ($source.colunaNome) { $name = ([string]$row.($source.colunaNome)).Trim() }
    $link = ([string]$row.'LINK DO CERTIFICADO').Trim()
    if (-not $name -or $link -notmatch '^https://drive\.google\.com/file/d/([A-Za-z0-9_-]+)/') { throw "Nome ou PDF ausente: $code" }
    $fileId = $Matches[1]
    if (-not $folder.Contains($fileId)) { throw "PDF não encontrado na pasta oficial: $code" }
    $codes[$code] = $true
    $title = ([string]$row.'TÍTULO DO TRABALHO').Trim()
    if (-not $title) { $title = ([string]$row.'TÍTULO DA PALESTRA').Trim() }
    $records += [ordered]@{ codigo = $code; nome = $name; tipo = $source.tipo; trabalho = $title; arquivoId = $fileId; situacao = 'emitido' }
  }
  if ($rows.Count -eq 0) { throw 'A planilha não retornou registros; a base anterior foi preservada.' }
}
if ($records.Count -eq 0) { throw 'Nenhum certificado importado; a base anterior foi preservada.' }
$json = ConvertTo-Json -InputObject @($records) -Depth 5
$utf8 = New-Object Text.UTF8Encoding($false)
[IO.File]::WriteAllText((Join-Path $root 'certificados-dados.js'), "// Gerado por tools/sync-certificados.ps1. Não inclui e-mails nem lista de coautores.`nwindow.ENSEFIM_CERTIFICADOS = $json;`n", $utf8)
Write-Output "$($records.Count) certificados sincronizados. Nenhum e-mail foi exportado."
