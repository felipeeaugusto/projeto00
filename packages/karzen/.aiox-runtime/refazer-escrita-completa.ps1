$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false
$excel.ScreenUpdating = $false
$excel.Calculation = -4135

$wbOficial = $excel.Workbooks | Where-Object { $_.Name -eq 'Analise Oficial.xlsx' }
$wsOficial = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

# 0) Desfazer qualquer merge residual em toda a area de dados antes de mexer em qualquer coisa
$areaAmpla = $wsNovo.Range("A5:Y200")
if ($areaAmpla.MergeCells -eq $true -or $true) {
    # UnMerge coluna a coluna pra nao depender de MergeCells agregado (pode ser $null com mix)
    for ($r = 5; $r -le 200; $r++) {
        $c1 = $wsNovo.Cells.Item($r,1)
        if ($c1.MergeCells) { $c1.MergeArea.UnMerge() | Out-Null }
        $c3 = $wsNovo.Cells.Item($r,3)
        if ($c3.MergeCells) { $c3.MergeArea.UnMerge() | Out-Null }
    }
}
$areaAmpla.Clear() | Out-Null

# 1) Ler o JSON de resultado do pipeline (dados originais, intocados)
$jsonPath = 'C:\Users\Felipe Augusto\projeto00\packages\karzen\.aiox-runtime\pausados-campanha-resultado.json'
$dados = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

$grupos = @()
foreach ($campanhaProp in $dados.PSObject.Properties) {
    $nomeCampanha = $campanhaProp.Name
    foreach ($produtoProp in $campanhaProp.Value.PSObject.Properties) {
        $tituloProduto = $produtoProp.Name
        $info = $produtoProp.Value
        if ($info.PSObject.Properties.Name -contains 'erro') { continue }
        $skus = $info.skus
        if (-not $skus) { continue }
        $linhasSku = @()
        foreach ($skuProp in $skus.PSObject.Properties) {
            $d = $skuProp.Value
            $statusClassico = '-'
            $statusPremium = '-'
            if ($d.catalogoClassico -and $d.mlbsDetalhe.($d.catalogoClassico)) {
                $sc = $d.mlbsDetalhe.($d.catalogoClassico).statusCatalogo
                if ($sc) { $statusClassico = $sc }
            }
            if ($d.catalogoPremium -and $d.mlbsDetalhe.($d.catalogoPremium)) {
                $sp = $d.mlbsDetalhe.($d.catalogoPremium).statusCatalogo
                if ($sp) { $statusPremium = $sp }
            }
            $linhasSku += [PSCustomObject]@{
                sku = $d.sku
                catalogoClassico = if ($d.catalogoClassico) { "#$($d.catalogoClassico)" } else { '-' }
                statusClassico = $statusClassico
                catalogoPremium = if ($d.catalogoPremium) { "#$($d.catalogoPremium)" } else { '-' }
                statusPremium = $statusPremium
                deposito = $d.deposito
                full = $d.full
                qualidade = $d.qualidade
                experiencia = $d.experiencia
                statusProduto = $d.statusProduto
            }
        }
        if ($linhasSku.Count -eq 0) { continue }
        $grupos += [PSCustomObject]@{ campanha = $nomeCampanha; titulo = $tituloProduto; linhas = $linhasSku }
    }
}

$totalSkus = ($grupos | ForEach-Object { $_.linhas.Count } | Measure-Object -Sum).Sum
# CORRECAO DA FORMULA: cada SKU ocupa 1 linha de dado + 1 linha espacadora = 2 linhas, sempre
# (inclusive entre SKUs do mesmo produto -- confirmado no padrao real do Excel)
$ultimaLinha = 4 + ($totalSkus * 2)
Write-Output "Grupos: $($grupos.Count) | Total SKUs: $totalSkus | Ultima linha: $ultimaLinha"

# 2) Bloco modelo formatado (linha dado + espacadora) em A5:M6, copiado do Oficial
$origemModelo = $wsOficial.Range("A5:M6")
$wsNovo.Range("A5:M6").Clear() | Out-Null
$origemModelo.Copy($wsNovo.Range("A5:M6")) | Out-Null
$ultimoParModelo = $wsNovo.Range("L5:M6")
foreach ($dest in @("N5:O6","P5:Q6","R5:S6","T5:U6","V5:W6","X5:Y6")) {
    $ultimoParModelo.Copy($wsNovo.Range($dest)) | Out-Null
}

# 3) Replicar o bloco de 2 linhas pra baixo, cobrindo TODA a extensao necessaria de uma vez
if ($ultimaLinha -gt 6) {
    $wsNovo.Range("A5:Y6").Copy($wsNovo.Range("A7:Y$ultimaLinha")) | Out-Null
}

# 4) Preencher valores (sem nenhum merge ainda -- evita o bug de colar sobre celula mesclada)
$linhaAtual = 5
$posGrupos = @()
foreach ($grupo in $grupos) {
    $linhaInicioGrupo = $linhaAtual
    foreach ($item in $grupo.linhas) {
        $wsNovo.Cells.Item($linhaAtual, 5).Value2  = $item.sku
        $wsNovo.Cells.Item($linhaAtual, 7).Value2  = $item.catalogoClassico
        $wsNovo.Cells.Item($linhaAtual, 9).Value2  = $item.statusClassico
        $wsNovo.Cells.Item($linhaAtual, 11).Value2 = $item.catalogoPremium
        $wsNovo.Cells.Item($linhaAtual, 13).Value2 = $item.statusPremium
        $wsNovo.Cells.Item($linhaAtual, 15).Value2 = $item.deposito
        $wsNovo.Cells.Item($linhaAtual, 17).Value2 = $item.full
        $wsNovo.Cells.Item($linhaAtual, 19).Value2 = $item.qualidade
        $wsNovo.Cells.Item($linhaAtual, 21).Value2 = $item.experiencia
        $wsNovo.Cells.Item($linhaAtual, 23).Value2 = $item.statusProduto
        $wsNovo.Cells.Item($linhaAtual, 25).Value2 = 'Pausado'
        $linhaAtual += 2
    }
    $linhaFimGrupo = $linhaAtual - 2
    $wsNovo.Cells.Item($linhaInicioGrupo, 1).Value2 = $grupo.campanha
    $wsNovo.Cells.Item($linhaInicioGrupo, 3).Value2 = $grupo.titulo
    $posGrupos += [PSCustomObject]@{ inicio = $linhaInicioGrupo; fim = $linhaFimGrupo }
}

# 5) SOMENTE AGORA, depois que todos os valores ja foram escritos, aplicar as mesclagens
foreach ($pg in $posGrupos) {
    if ($pg.fim -gt $pg.inicio) {
        $wsNovo.Range($wsNovo.Cells.Item($pg.inicio,1), $wsNovo.Cells.Item($pg.fim,1)).Merge() | Out-Null
        $wsNovo.Range($wsNovo.Cells.Item($pg.inicio,3), $wsNovo.Cells.Item($pg.fim,3)).Merge() | Out-Null
    }
}

$wbNovo.Save()
$excel.Calculation = -4105
$excel.ScreenUpdating = $true
$excel.DisplayAlerts = $true

Write-Output "OK -- escrita refeita do zero, ultima linha: $ultimaLinha"
