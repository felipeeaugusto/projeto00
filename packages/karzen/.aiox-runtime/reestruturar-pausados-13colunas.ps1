$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$wbOficial = $excel.Workbooks | Where-Object { $_.Name -eq 'Analise Oficial.xlsx' }
$wsOficial = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

# Limpar tudo (era U=21 colunas, agora vai virar Y=25)
$wsNovo.Range("A1:AB4").Clear() | Out-Null

# Copiar o bloco formatado inteiro (linhas 1-4, colunas A:M) do Analise Oficial
$origem = $wsOficial.Range("A1:M4")
$destino = $wsNovo.Range("A1:M4")
$origem.Copy($destino) | Out-Null

# Estender o padrao ate a coluna Y (13 colunas de dados = posicoes impares 1..25)
$ultimoPar = $wsNovo.Range("L1:M4")
$destinos = @("N1:O4", "P1:Q4", "R1:S4", "T1:U4", "V1:W4", "X1:Y4")
foreach ($dest in $destinos) {
    $ultimoPar.Copy($wsNovo.Range($dest)) | Out-Null
}

# Cabecalho -- 13 colunas
$colunas = @(
    'Campanha',
    'Título na Campanha',
    'SKU',
    'Catálogo Clássico',
    'Status Catálogo Clássico',
    'Catálogo Premium',
    'Status Catálogo Premium',
    'Depósito (un)',
    'FULL (un)',
    'Qualidade do anúncio',
    'Experiência',
    'Status do Produto',
    'Status na Campanha'
)
$posicoesDados = @(1,3,5,7,9,11,13,15,17,19,21,23,25)
for ($i = 0; $i -lt $colunas.Count; $i++) {
    $wsNovo.Cells.Item(3, $posicoesDados[$i]).Value2 = $colunas[$i]
}

# Re-mesclar o banner ate a coluna Y
$wsNovo.Range("A1:M1").UnMerge() | Out-Null
$bannerRange = $wsNovo.Range("A1:Y1")
$bannerRange.Merge() | Out-Null
$wsNovo.Cells.Item(1,1).Value2 = '⚠ Dados em validação — aguardando confirmação final'
$bannerRange.Font.Bold = $true
$bannerRange.Font.Size = 14
$bannerRange.HorizontalAlignment = -4108
$bannerRange.VerticalAlignment = -4108

# Larguras -- primeiras 13 colunas copiadas do Oficial, resto por conteudo esperado
for ($c = 1; $c -le 13; $c++) {
    $wsNovo.Columns.Item($c).ColumnWidth = $wsOficial.Columns.Item($c).ColumnWidth
}
$larguraDadoExtra = 18.14
for ($c = 15; $c -le 25; $c += 2) { $wsNovo.Columns.Item($c).ColumnWidth = $larguraDadoExtra }
for ($c = 14; $c -le 24; $c += 2) { $wsNovo.Columns.Item($c).ColumnWidth = 2.86 }

$wbNovo.Save()
$excel.DisplayAlerts = $true

Write-Output "Banner: [$($wsNovo.Cells.Item(1,1).Text)]"
Write-Output "Merge banner: $($wsNovo.Cells.Item(1,1).MergeArea.Address())"
Write-Output "Cabecalho:"
for ($i = 0; $i -lt $colunas.Count; $i++) {
    Write-Output "  Col $($posicoesDados[$i]) : $($wsNovo.Cells.Item(3, $posicoesDados[$i]).Text)"
}
Write-Output "Pattern banner: $($wsNovo.Cells.Item(1,1).Interior.Pattern)"
Write-Output "Saved: $($wbNovo.Saved)"
