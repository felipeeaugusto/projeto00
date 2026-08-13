$ErrorActionPreference = 'Stop'
try {
    $excel = [Runtime.InteropServices.Marshal]::GetActiveObject('Excel.Application')
} catch {
    Write-Output "NENHUMA instancia de Excel ativa encontrada via GetActiveObject: $($_.Exception.Message)"
    exit
}

Write-Output "=== Excel.Application ativo encontrado ==="
Write-Output "Visible: $($excel.Visible)"
Write-Output "Workbooks abertos: $($excel.Workbooks.Count)"
Write-Output ""

foreach ($wb in $excel.Workbooks) {
    Write-Output "--- Workbook: $($wb.Name) ---"
    Write-Output "  FullName : $($wb.FullName)"
    Write-Output "  Path     : $($wb.Path)"
    Write-Output "  Saved    : $($wb.Saved)"
    Write-Output "  ReadOnly : $($wb.ReadOnly)"
    try {
        foreach ($ws in $wb.Worksheets) {
            $usedRange = $ws.UsedRange
            Write-Output "  Aba '$($ws.Name)': UsedRange = $($usedRange.Address()) ($($usedRange.Rows.Count) linhas x $($usedRange.Columns.Count) colunas)"
        }
    } catch {
        Write-Output "  (erro ao listar abas: $($_.Exception.Message))"
    }
    Write-Output ""
}
