$caminho = "C:\Downloads\Pausados em Campanha - Karzen.xlsx"

$excel = $null
try { $excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application') } catch {}
if (-not $excel) { $excel = New-Object -ComObject Excel.Application; $excel.Visible = $true }

$wb = $excel.Workbooks | Where-Object { $_.Name -like '*Pausados em Campanha*' }
if (-not $wb) { $wb = $excel.Workbooks.Open($caminho) }

# Remove Plan2/Plan3 se existirem (deixa so 1 aba, renomeada)
$excel.DisplayAlerts = $false
foreach ($nome in @('Plan2','Plan3')) {
    $ws = $wb.Worksheets | Where-Object { $_.Name -eq $nome }
    if ($ws) { $ws.Delete() }
}
$excel.DisplayAlerts = $true

$ws = $wb.Worksheets.Item(1)
$ws.Name = 'Produtos Pausados em Ads'

$colunas = @(
    'Campanha',
    'Título na Campanha',
    'SKU',
    'Catálogo Clássico',
    'Catálogo Premium',
    'Depósito (un)',
    'FULL (un)',
    'Qualidade do anúncio',
    'Experiência',
    'Status do Produto',
    'Status na Campanha'
)
$larguras = @(22, 24, 22, 20, 20, 16, 16, 18, 14, 16, 16)

# Linha 1 -- banner
$ultimaColunaIdx = 1 + ($colunas.Count - 1) * 2 + 1  # ultima coluna de dado (a formula de posicao esta abaixo)
$posicoesDados = @()
for ($i = 0; $i -lt $colunas.Count; $i++) { $posicoesDados += (1 + $i * 2) }
$ultimaColuna = $posicoesDados[-1]

function Get-LetraColuna([int]$n) {
    $letra = ''
    while ($n -gt 0) {
        $resto = ($n - 1) % 26
        $letra = [char](65 + $resto) + $letra
        $n = [Math]::Floor(($n - 1) / 26)
    }
    return $letra
}

$letraUltima = Get-LetraColuna $ultimaColuna
$bannerRange = $ws.Range("A1:${letraUltima}1")
$bannerRange.Merge() | Out-Null
$ws.Cells.Item(1,1).Value2 = '⚠ Dados em validação — aguardando confirmação final'
$bannerRange.Font.Bold = $true
$bannerRange.Font.Size = 14
$bannerRange.Font.Name = 'Calibri'
$bannerRange.Font.Color = 0
$bannerRange.Interior.Color = 16777215
$bannerRange.HorizontalAlignment = -4108
$bannerRange.VerticalAlignment = -4108
$ws.Rows.Item(1).RowHeight = 32

# Linha 2 -- spacer
$ws.Rows.Item(2).RowHeight = 15

# Linha 3 -- header
$ws.Rows.Item(3).RowHeight = 45
for ($i = 0; $i -lt $colunas.Count; $i++) {
    $col = $posicoesDados[$i]
    $celula = $ws.Cells.Item(3, $col)
    $celula.Value2 = $colunas[$i]
    $celula.Font.Bold = $false
    $celula.Font.Size = 11
    $celula.Font.Name = 'Calibri'
    $celula.Font.Color = 0
    $celula.Interior.Color = 16777215
    $celula.HorizontalAlignment = -4108
    $celula.VerticalAlignment = -4108
    $celula.WrapText = $true
}

# Linha 4 -- spacer
$ws.Rows.Item(4).RowHeight = 15

# Larguras de coluna: dados com largura definida, espacadores com 2.86 (padrao ja usado)
for ($i = 0; $i -lt $colunas.Count; $i++) {
    $colDado = $posicoesDados[$i]
    $ws.Columns.Item($colDado).ColumnWidth = $larguras[$i]
    if ($i -lt $colunas.Count - 1) {
        $colSpacer = $colDado + 1
        $ws.Columns.Item($colSpacer).ColumnWidth = 2.86
    }
}

$excel.ActiveWindow.DisplayGridlines = $true
$wb.Save()

Write-Output "Estrutura criada na aba 'Produtos Pausados em Ads'."
Write-Output "Colunas de dado nas posicoes: $($posicoesDados -join ', ') (ultima coluna: $letraUltima)"
Write-Output "Salvo."
