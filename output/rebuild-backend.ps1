# Rebuild Backend Script
Write-Host "🔄 Rebuilding Backend..." -ForegroundColor Yellow

# Stop and remove backend container
Write-Host "⏹️  Stopping backend container..." -ForegroundColor Cyan
docker stop airlines-backend 2>$null
docker rm airlines-backend 2>$null

# Remove old image
Write-Host "🗑️  Removing old backend image..." -ForegroundColor Cyan
docker rmi output-backend -f 2>$null

# Rebuild backend
Write-Host "🔨 Building backend (no-cache)..." -ForegroundColor Cyan
docker-compose build backend --no-cache

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Start backend
    Write-Host "🚀 Starting backend..." -ForegroundColor Cyan
    docker-compose up -d backend
    
    Write-Host "✅ Backend rebuild complete!" -ForegroundColor Green
    Write-Host "⏳ Waiting for backend to start (30 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
    
    Write-Host "📋 Backend logs:" -ForegroundColor Cyan
    docker logs airlines-backend --tail 20
} else {
    Write-Host "❌ Build failed! Check errors above." -ForegroundColor Red
    exit 1
}
