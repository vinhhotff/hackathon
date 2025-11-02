#!/bin/bash
# Shell script to test API
# Run after docker-compose up

echo "=== Testing COBOL Airlines API ==="
echo ""

# Test 1: Login
echo "1. Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId":"EMP00001","password":"password123"}')

if [ $? -eq 0 ]; then
    echo "✅ Login successful!"
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token: ${TOKEN:0:20}..."
    echo ""
    
    # Test 2: Search Flights
    echo "2. Testing Search Flights..."
    FLIGHTS_RESPONSE=$(curl -s -X GET "http://localhost:8080/api/flights?flightDate=2025-11-15" \
      -H "Authorization: Bearer $TOKEN")
    
    if [ $? -eq 0 ]; then
        echo "✅ Flight search successful!"
        FLIGHT_COUNT=$(echo $FLIGHTS_RESPONSE | grep -o '"flightId"' | wc -l)
        echo "Found $FLIGHT_COUNT flights"
        echo ""
        
        echo "=== All Tests Passed! ==="
    else
        echo "❌ Flight search failed"
        exit 1
    fi
else
    echo "❌ Login failed"
    echo "Make sure docker-compose is running: docker-compose up"
    exit 1
fi

