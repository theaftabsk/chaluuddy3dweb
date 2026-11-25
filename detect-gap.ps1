Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\chalobuddy-logo-clean.png"))
$w = $bmp.Width
$h = $bmp.Height

# Find vertical density of non-transparent pixels to find the gap between illustration and text
for ($y = 0; $y -lt $h; $y += 5) {
    $count = 0
    for ($x = 0; $x -lt $w; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 20) {
            $count++
        }
    }
    if ($y -gt 180 -and $y -lt 260) {
        Write-Host "Y=$y count=$count"
    }
}
$bmp.Dispose()
