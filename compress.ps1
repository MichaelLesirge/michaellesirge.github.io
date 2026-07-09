param(
    [string]$InputDir = "."
)

$OutputDir = Join-Path $InputDir "compressed"
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

# PNG -> WebP
Get-ChildItem -Path $InputDir -Filter *.png | ForEach-Object {
    $outFile = Join-Path $OutputDir ($_.BaseName + ".webp")
    cwebp -q 85 $_.FullName -o $outFile
    Write-Host "PNG -> WebP: $($_.Name)"
}

# GIF -> animated WebP
Get-ChildItem -Path $InputDir -Filter *.gif | ForEach-Object {
    $outFile = Join-Path $OutputDir ($_.BaseName + ".webp")
    gif2webp -q 80 $_.FullName -o $outFile
    Write-Host "GIF -> WebP: $($_.Name)"
}

Write-Host "`nDone. Files saved to: $OutputDir"