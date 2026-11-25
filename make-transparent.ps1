Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public\chalobuddy-logo.png"
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
$w = $bmp.Width
$h = $bmp.Height

$newBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($x = 0; $x -lt $w; $x++) {
    for ($y = 0; $y -lt $h; $y++) {
        $p = $bmp.GetPixel($x, $y)
        # If pixel is white or near white (background), make it transparent
        if ($p.R -ge 240 -and $p.G -ge 240 -and $p.B -ge 240) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } else {
            $newBmp.SetPixel($x, $y, $p)
        }
    }
}

$bmp.Dispose()
$outPath = [System.IO.Path]::Combine((Resolve-Path "public"), "chalobuddy-logo-clean.png")
$newBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$newBmp.Dispose()
Write-Host "Created transparent chalobuddy-logo-clean.png successfully!"
