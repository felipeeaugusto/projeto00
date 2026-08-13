$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false
$wb = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wb.Close($false)
$wb2 = $excel.Workbooks.Open('C:\Downloads\Pausados em Campanha - Karzen.xlsx')
$ws2 = $wb2.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }
$excel.DisplayAlerts = $true

$linhas = @()
$linhas += "UsedRange: $($ws2.UsedRange.Address())"

# 1) Coletar todos os SKUs escritos, checar duplicidade e contagem
$skusEscritos = @()
$formatoInconsistente = @()
for ($r = 5; $r -le 104; $r += 2) {
    $sku = $ws2.Cells.Item($r, 5).Text
    if ($sku) {
        $skusEscritos += $sku
        $ha = $ws2.Cells.Item($r, 3).HorizontalAlignment
        $rh = $ws2.Rows.Item($r).RowHeight
        if ($ha -ne -4108 -or [math]::Abs($rh - 30) -gt 0.5) {
            $formatoInconsistente += "linha $r (HAlign=$ha RowHeight=$rh)"
        }
    }
}
$linhas += "Total de linhas com SKU: $($skusEscritos.Count)"
$duplicados = $skusEscritos | Group-Object | Where-Object { $_.Count -gt 1 }
if ($duplicados) {
    $linhas += "SKUs DUPLICADOS ENCONTRADOS:"
    foreach ($d in $duplicados) { $linhas += "  $($d.Name) x$($d.Count)" }
} else {
    $linhas += "Nenhum SKU duplicado -- OK"
}
if ($formatoInconsistente.Count -gt 0) {
    $linhas += "Linhas com formatacao inconsistente: $($formatoInconsistente.Count)"
    $linhas += ($formatoInconsistente -join ', ')
} else {
    $linhas += "Formatacao consistente em todas as linhas de dado -- OK"
}

# 2) Conferir os 2 exemplos originais (Panini e Air fryer Britania)
foreach ($busca in @('Panini', 'Britânia Fritadeira')) {
    for ($r = 5; $r -le 104; $r++) {
        $titulo = $ws2.Cells.Item($r,3).Text
        if ($titulo -match $busca) {
            $mergeArea = $ws2.Cells.Item($r,1).MergeArea.Address()
            $linhas += "=== $busca na linha $r, merge: $mergeArea ==="
            $rr = $r
            while ($rr -le ($r+8)) {
                $sku = $ws2.Cells.Item($rr,5).Text
                if ($sku) {
                    $vals = @()
                    for ($c=5; $c -le 25; $c+=2) { $vals += $ws2.Cells.Item($rr,$c).Text }
                    $linhas += "  linha $rr : " + ($vals -join ' | ')
                } else {
                    $tituloAqui = $ws2.Cells.Item($rr,3).Text
                    if ($tituloAqui -and $rr -ne $r) { break }
                }
                $rr += 2
            }
            break
        }
    }
}

[System.IO.File]::WriteAllText('C:\Users\Felipe Augusto\AppData\Local\Temp\claude\C--Users-Felipe-Augusto-projeto00-packages-karzen\89427cf3-3008-4569-921c-46fa10410132\scratchpad\validacao-definitiva.txt', ($linhas -join [Environment]::NewLine), [System.Text.Encoding]::UTF8)
