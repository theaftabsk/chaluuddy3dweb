Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\chalobuddy-logo-clean.png"))

# Find bounding box of the top emblem (Y < 235)
$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt 232; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        if ($bmp.GetPixel($x, $y).A -gt 30) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Host "Emblem Bounds: X=[$minX, $maxX], Y=[$minY, $maxY]"
$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1

$iconBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($iconBmp)
$srcRect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$bmp.Dispose()

$outPath = [System.IO.Path]::Combine((Resolve-Path "public"), "chalobuddy-icon.png")
$iconBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$iconBmp.Dispose()
Write-Host "Saved chalobuddy-icon.png successfully! Dimensions: $cropW x $cropH"
