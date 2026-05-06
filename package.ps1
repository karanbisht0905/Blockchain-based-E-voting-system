# PowerShell script to package the project
# Run with: .\package.ps1

$projectName = "blockchain-e-voting-frontend"
$outputFile = "$projectName-complete.zip"
$excludePatterns = @("node_modules", ".git", "dist", "*.zip", ".vscode", ".idea")

Write-Host "📦 Creating project package..." -ForegroundColor Cyan
Write-Host ""

# Get all files and folders
$items = Get-ChildItem -Path . -Force

# Filter out excluded items
$itemsToZip = $items | Where-Object {
    $shouldExclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($_.Name -like $pattern -or $_.FullName -like "*\$pattern\*") {
            $shouldExclude = $true
            break
        }
    }
    -not $shouldExclude
}

if (Test-Path $outputFile) {
    Remove-Item $outputFile -Force
    Write-Host "Removed existing zip file" -ForegroundColor Yellow
}

Write-Host "Adding files to zip..." -ForegroundColor Green
Compress-Archive -Path $itemsToZip.FullName -DestinationPath $outputFile -Force

if (Test-Path $outputFile) {
    $fileSize = (Get-Item $outputFile).Length / 1MB
    Write-Host ""
    Write-Host "✅ Package created successfully!" -ForegroundColor Green
    Write-Host "📁 File: $outputFile" -ForegroundColor Cyan
    Write-Host "📊 Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "The package includes all source code ready for distribution." -ForegroundColor White
} else {
    Write-Host "❌ Error creating package" -ForegroundColor Red
}

