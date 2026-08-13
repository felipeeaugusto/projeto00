$ErrorActionPreference = 'Stop'
$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$excel.DisplayAlerts = $false
$excel.ScreenUpdating = $false
$excel.Calculation = -4135  # xlCalculationManual

$wbOficial = $excel.Workbooks | Where-Object { $_.Name -eq 'Analise Oficial.xlsx' }
$wsOficial = $wbOficial.Worksheets | Where-Object { $_.Name -eq 'Mapeamento Completo da Planilha' }

$wbNovo = $excel.Workbooks | Where-Object { $_.Name -eq 'Pausados em Campanha - Karzen.xlsx' }
$wsNovo = $wbNovo.Worksheets | Where-Object { $_.Name -eq 'Produtos Pausados em Ads' }

# Ler o JSON de resultado do pipeline
$jsonPath = 'C:\Users\Felipe Augusto\projeto00\packages\karzen\.aiox-runtime\pausados-campanha-resultado.json'
$dados = Get-Content -Path $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json

# Montar lista de linhas: uma entrada por SKU, agrupada por produto
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
        $grupos += [PSCustomObject]@{
            campanha = $nomeCampanha
            titulo = $tituloProduto
            linhas = $linhasSku
        }
    }
}

$totalSkus = ($grupos | ForEach-Object { $_.linhas.Count } | Measure-Object -Sum).Sum
Write-Output "Grupos (produtos com pelo menos 1 SKU): $($grupos.Count)"
Write-Output "Total de linhas de SKU: $totalSkus"

# Total de linhas necessarias: 1 por SKU + 1 espacadora por produto
$totalLinhasGrid = $totalSkus + $grupos.Count
$ultimaLinha = 4 + $totalLinhasGrid

Write-Output "Ultima linha do grid: $ultimaLinha"

# 1) Montar bloco modelo formatado (linha dado + linha espacadora) em A5:M6, copiado do Oficial
$origemModelo = $wsOficial.Range("A5:M6")
$destinoModelo = $wsNovo.Range("A5:M6")
$origemModelo.Copy($destinoModelo) | Out-Null

$ultimoParModelo = $wsNovo.Range("L5:M6")
$destinosModelo = @("N5:O6", "P5:Q6", "R5:S6", "T5:U6", "V5:W6", "X5:Y6")
foreach ($dest in $destinosModelo) {
    $ultimoParModelo.Copy($wsNovo.Range($dest)) | Out-Null
}

# 2) Replicar o bloco de 2 linhas (5-6) para baixo, cobrindo ate a ultima linha necessaria
if ($ultimaLinha -gt 6) {
    $origemReplicar = $wsNovo.Range("A5:Y6")
    $destinoReplicar = $wsNovo.Range("A7:Y$ultimaLinha")
    $origemReplicar.Copy($destinoReplicar) | Out-Null
}

# 3) Preencher valores + mesclar Campanha/Titulo quando o produto tem mais de 1 SKU
# Colunas (confirmadas no cabecalho): 1=Campanha 3=Titulo na Campanha 5=SKU 7=Cat.Classico
# 9=Status Classico 11=Cat.Premium 13=Status Premium 15=Deposito 17=FULL 19=Qualidade
# 21=Experiencia 23=Status do Produto 25=Status na Campanha
$linhaAtual = 5
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
        $linhaAtual += 2   # pula a linha espacadora (ja formatada, fica vazia)
    }
    $linhaFimGrupo = $linhaAtual - 2

    # Escrever Campanha e Titulo na 1a linha do grupo, mesclando se houver mais de 1 SKU
    $wsNovo.Cells.Item($linhaInicioGrupo, 1).Value2 = $grupo.campanha
    $wsNovo.Cells.Item($linhaInicioGrupo, 3).Value2 = $grupo.titulo

    if ($linhaFimGrupo -gt $linhaInicioGrupo) {
        $wsNovo.Range($wsNovo.Cells.Item($linhaInicioGrupo,1), $wsNovo.Cells.Item($linhaFimGrupo,1)).Merge() | Out-Null
        $wsNovo.Range($wsNovo.Cells.Item($linhaInicioGrupo,3), $wsNovo.Cells.Item($linhaFimGrupo,3)).Merge() | Out-Null
    }
}

$wbNovo.Save()
$excel.Calculation = -4105  # xlCalculationAutomatic
$excel.ScreenUpdating = $true
$excel.DisplayAlerts = $true

Write-Output "OK -- escrita concluida ate a linha $ultimaLinha"
