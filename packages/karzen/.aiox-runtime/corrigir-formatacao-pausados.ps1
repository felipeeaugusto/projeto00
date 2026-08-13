$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wbOficial = $excel.Workbooks | Where-Object { $_.Name -like '*Analise Oficial*' }
$wsOficial = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -like '*Pausados em Campanha*' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

# 1) Limpar tudo que ja existe nas linhas 1-4 do novo (vamos recriar via copia de verdade)
$wsNovo.Range("A1:U4").Clear() | Out-Null

# 2) Copiar o bloco formatado inteiro (linhas 1-4, colunas A:M -- banner+spacer+header+spacer)
#    do Analise Oficial pro novo arquivo, nas mesmas posicoes
$origem = $wsOficial.Range("A1:M4")
$destino = $wsNovo.Range("A1:M4")
$origem.Copy($destino) | Out-Null

# 3) Estender o padrao pras colunas N:U (mais 8 colunas = 4 pares data+spacer),
#    copiando o ultimo par (L:M) repetidamente pra direita
$ultimoPar = $wsNovo.Range("L1:M4")
$destinos = @("N1:O4", "P1:Q4", "R1:S4", "T1:U4")
foreach ($dest in $destinos) {
    $ultimoPar.Copy($wsNovo.Range($dest)) | Out-Null
}

# 4) Sobrescrever o texto do banner (mesmo texto, so garantindo) e do cabecalho (11 colunas novas)
$wsNovo.Cells.Item(1,1).Value2 = '⚠ Dados em validação — aguardando confirmação final'

$colunas = @(
    'Campanha', 'Título na Campanha', 'SKU', 'Catálogo Clássico', 'Catálogo Premium',
    'Depósito (un)', 'FULL (un)', 'Qualidade do anúncio', 'Experiência',
    'Status do Produto', 'Status na Campanha'
)
$posicoesDados = @(1,3,5,7,9,11,13,15,17,19,21)
for ($i = 0; $i -lt $colunas.Count; $i++) {
    $wsNovo.Cells.Item(3, $posicoesDados[$i]).Value2 = $colunas[$i]
}

# 5) Re-mesclar o banner ate a coluna U (a copia trouxe o merge original ate M, precisa estender)
$wsNovo.Range("A1:M1").UnMerge() | Out-Null
$bannerRange = $wsNovo.Range("A1:U1")
$bannerRange.Merge() | Out-Null
$wsNovo.Cells.Item(1,1).Value2 = '⚠ Dados em validação — aguardando confirmação final'
$bannerRange.Font.Bold = $true
$bannerRange.Font.Size = 14
$bannerRange.HorizontalAlignment = -4108
$bannerRange.VerticalAlignment = -4108

# 6) Larguras de coluna -- copiar as mesmas do Oficial pras primeiras 13, e repetir o padrao
#    do ultimo par (data ~18-20, spacer 2.86) pras 8 colunas extras
for ($c = 1; $c -le 13; $c++) {
    $wsNovo.Columns.Item($c).ColumnWidth = $wsOficial.Columns.Item($c).ColumnWidth
}
$larguraDadoExtra = 18.14
for ($c = 15; $c -le 21; $c += 2) { $wsNovo.Columns.Item($c).ColumnWidth = $larguraDadoExtra }
for ($c = 14; $c -le 20; $c += 2) { $wsNovo.Columns.Item($c).ColumnWidth = 2.86 }

$wbNovo.Save()
Write-Output "Formatacao corrigida (copiada de verdade do Analise Oficial) e salvo."
