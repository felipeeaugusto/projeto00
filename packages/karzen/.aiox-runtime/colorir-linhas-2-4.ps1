function Get-CorPorSku {
    param([string]$Sku)
    $hash = 0
    foreach ($ch in $Sku.ToCharArray()) { $hash = ($hash * 31 + [int][char]$ch) -band 0xFFFFFFF }
    $hue = $hash % 360
    $s = 0.65; $l = 0.75
    $c = (1 - [Math]::Abs(2*$l - 1)) * $s
    $x = $c * (1 - [Math]::Abs((($hue/60) % 2) - 1))
    $m = $l - $c/2
    if ($hue -lt 60) { $r=$c;$g=$x;$b=0 }
    elseif ($hue -lt 120) { $r=$x;$g=$c;$b=0 }
    elseif ($hue -lt 180) { $r=0;$g=$c;$b=$x }
    elseif ($hue -lt 240) { $r=0;$g=$x;$b=$c }
    elseif ($hue -lt 300) { $r=$x;$g=0;$b=$c }
    else { $r=$c;$g=0;$b=$x }
    $R = [Math]::Round(($r+$m)*255)
    $G = [Math]::Round(($g+$m)*255)
    $B = [Math]::Round(($b+$m)*255)
    return [int]($B*65536 + $G*256 + $R)
}

function Colorir-Mlb {
    param($ws, [string]$Mlb, [int]$CorInt)
    $xlValues = -4163; $xlWhole = 1
    $primeira = $ws.Cells.Find($Mlb, [Type]::Missing, $xlValues, $xlWhole, [Type]::Missing, [Type]::Missing, $false, [Type]::Missing, [Type]::Missing)
    if ($null -eq $primeira) { return @() }
    $endereco = $primeira.Address()
    $atual = $primeira
    $enderecos = @()
    do {
        $atual.Interior.ColorIndex = -4142
        $atual.Interior.Color = $CorInt
        $enderecos += "L$($atual.Row)C$($atual.Column)"
        $atual = $ws.Cells.FindNext($atual)
    } while ($null -ne $atual -and $atual.Address() -ne $endereco)
    return $enderecos
}

$caminhoJson = Join-Path $PSScriptRoot 'linhas-2-4-resultado.json'
$texto = [System.IO.File]::ReadAllText($caminhoJson, [System.Text.Encoding]::UTF8)
$dados = $texto | ConvertFrom-Json

$excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
$wb = $excel.Workbooks | Where-Object { $_.Name -like '*KARZEN ELETRO*' }
$ws = $wb.Worksheets | Where-Object { $_.Name -like '*CAMPANHA*' }

$sw = [System.Diagnostics.Stopwatch]::StartNew()

foreach ($prop in $dados.PSObject.Properties) {
    $item = $prop.Value
    if (-not $item.sku) { Write-Output "$($prop.Name): PULANDO (sem SKU / erro)"; continue }
    $corInt = Get-CorPorSku -Sku $item.sku
    $enderecosTotais = @()
    foreach ($mlb in $item.todosMlbsSincronizados) {
        $enderecos = Colorir-Mlb -ws $ws -Mlb $mlb -CorInt $corInt
        if ($enderecos.Count -eq 0) {
            Write-Output "  AVISO: MLB $mlb (SKU $($item.sku)) nao encontrado na planilha"
        }
        $enderecosTotais += $enderecos
    }
    Write-Output "SKU $($item.sku) ($($item.todosMlbsSincronizados.Count) MLBs): coloridos em $($enderecosTotais -join ', ')"
}

$sw.Stop()
Write-Output ""
Write-Output "Tempo total: $($sw.ElapsedMilliseconds) ms"
