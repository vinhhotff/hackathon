# PowerShell Script Ä‘á»ƒ Test API
# Cháº¡y sau khi docker-compose up

Write-Host "=== Testing COBOL Airlines API ===" -ForegroundColor Green
Write-Host ""

# Test 1: Login
Write-Host "1. Testing Login..." -ForegroundColor Yellow
$loginBody = @{
    userId = "EMP00001"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body $loginBody
    
    Write-Host "âœ… Login successful!" -ForegroundColor Green
    Write-Host "Token: $($loginResponse.token.Substring(0, 20))..." -ForegroundColor Cyan
    Write-Host "User: $($loginResponse.user.firstName) $($loginResponse.user.lastName)" -ForegroundColor Cyan
    Write-Host ""
    
    $token = $loginResponse.token
    
    # Test 2: Search Flights
    Write-Host "2. Testing Search Flights..." -ForegroundColor Yellow
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    $flightsResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/flights?flightDate=2025-11-15" `
        -Method GET `
        -Headers $headers
    
    Write-Host "âœ… Flight search successful!" -ForegroundColor Green
    Write-Host "Found $($flightsResponse.flights.Count) flights" -ForegroundColor Cyan
    
    if ($flightsResponse.flights.Count -gt 0) {
        Write-Host "First flight: $($flightsResponse.flights[0].flightNum) on $($flightsResponse.flights[0].flightDate)" -ForegroundColor Cyan
    }
    Write-Host ""
    
    # Test 3: Get Flight Details
    if ($flightsResponse.flights.Count -gt 0) {
        Write-Host "3. Testing Get Flight Details..." -ForegroundColor Yellow
        $flightId = $flightsResponse.flights[0].flightId
        
        $flightDetail = Invoke-RestMethod -Uri "http://localhost:8080/api/flights/$flightId" `
            -Method GET `
            -Headers $headers
        
        Write-Host "âœ… Flight details retrieved!" -ForegroundColor Green
        Write-Host "Flight: $($flightDetail.flightNum)" -ForegroundColor Cyan
        Write-Host ""
    }
    
    Write-Host "=== All Tests Passed! ===" -ForegroundColor Green
    
} catch {
    Write-Host "âŒ Test failed!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure docker-compose is running:" -ForegroundColor Yellow
    Write-Host "  docker-compose up" -ForegroundColor Yellow
}

