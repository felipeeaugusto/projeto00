$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

$colunasDado = @(1,3,5,7,9,11,13,15,17,19,21,23,25)

# 1) Guardar os valores atuais das linhas 94-103 antes de mexer na formatacao
$backupValores = @{}
for ($r = 94; $r -le 103; $r++) {
    foreach ($c in $colunasDado) {
        $v = $wsNovo.Cells.Item($r, $c).Value2
        if ($v) { $backupValores["$r-$c"] = $v }
    }
}
Write-Output "Valores guardados: $($backupValores.Count)"

# 2) Copiar o bloco formatado (5:6, ja confirmado correto) pra 94:103 -- Copy completo,
#    replica automaticamente ao longo do destino maior (mesma tecnica ja usada antes)
$origem = $wsNovo.Range("A5:Y6")
$destino = $wsNovo.Range("A94:Y103")
$origem.Copy($destino) | Out-Null

# 3) Restaurar os valores
foreach ($chave in $backupValores.Keys) {
    $partes = $chave -split '-'
    $r = [int]$partes[0]
    $c = [int]$partes[1]
    $wsNovo.Cells.Item($r, $c).Value2 = $backupValores[$chave]
}

# 4) Reaplicar as mesclagens que existiam nas linhas 94-103 (foram perdidas pelo Copy do passo 2)
#    Reconstruir a partir dos dados: procurar onde a coluna 3 (Titulo) tem valor -> inicio de grupo
$r = 94
while ($r -le 103) {
    $temTitulo = $wsNovo.Cells.Item($r, 3).Value2
    if ($temTitulo) {
        $fim = $r
        $rr = $r + 2
        while ($rr -le 103 -and -not $wsNovo.Cells.Item($rr, 3).Value2) {
            $fim = $rr
            $rr += 2
        }
        if ($fim -gt $r) {
            $wsNovo.Range($wsNovo.Cells.Item($r,1), $wsNovo.Cells.Item($fim,1)).Merge() | Out-Null
            $wsNovo.Range($wsNovo.Cells.Item($r,3), $wsNovo.Cells.Item($fim,3)).Merge() | Out-Null
        }
        $r = $fim + 2
    } else {
        $r += 2
    }
}

$wbNovo.Save()
$excel.DisplayAlerts = $true

# Verificacao final
$linhas = @()
foreach ($rv in @(94, 95, 100, 103)) {
    $cel = $wsNovo.Cells.Item($rv, 3)
    $linhas += ("Linha " + $rv + " -- texto: [" + $cel.Text + "] HAlign: " + $cel.HorizontalAlignment + " WrapText: " + $cel.WrapText + " RowHeight: " + $wsNovo.Rows.Item($rv).RowHeight)
}
[System.IO.File]::WriteAllText('C:\Users\Felipe Augusto\AppData\Local\Temp\claude\C--Users-Felipe-Augusto-projeto00-packages-karzen\89427cf3-3008-4569-921c-46fa10410132\scratchpad\verificacao-v2.txt', ($linhas -join [Environment]::NewLine), [System.Text.Encoding]::UTF8)
