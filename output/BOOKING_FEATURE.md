# Booking Feature - Đã thêm xong!

## ✅ Đã implement:

### Backend:
1. ✅ **BookingService** - Logic booking với validation và tạo tickets
2. ✅ **BookingController** - REST API endpoints (`/api/bookings`)
3. ✅ **BookingRequest/BookingResponse DTOs** - Request/Response format
4. ✅ **FlightRepository** - Thêm method `findByFlightNumAndFlightDate`

### Frontend:
1. ✅ **BookingPage** - UI 2-step booking process
2. ✅ **bookingApi.ts** - API client functions

---

## 🔄 Booking Flow:

### Step 1: Validate Booking
1. User nhập: Client ID, Flight Number, Flight Date, Passenger Count
2. Click "Search & Validate"
3. System validate:
   - ✅ Passenger exists
   - ✅ Flight exists
   - ✅ Available seats
   - ✅ Calculate total price

### Step 2: Confirm Booking
1. System hiển thị booking details và price
2. User click "Confirm Booking"
3. System tạo:
   - ✅ Transaction record (ACHAT)
   - ✅ Tickets (1 ticket per passenger)
   - ✅ Auto-assign seats
   - ✅ Generate ticket IDs

---

## 📝 Test Data có sẵn:

**Test booking với:**
```
Client ID: 1001
Flight Number: CB1104
Flight Date: 2025-11-15
Passenger Count: 2
```

**Expected:**
- Validates successfully
- Total Price: €241.98 (2 × €120.99)
- Creates transaction và 2 tickets
- Seats: 1A, 1B

---

## ✅ Cách test:

### Test 1: Successful Booking
```
Client ID: 1001
Flight Number: CB1104
Flight Date: 2025-11-15
Passenger Count: 2
```
1. Click "Search & Validate" → Shows price €241.98
2. Click "Confirm Booking" → Success message với ticket IDs

---

### Test 2: Validation Errors
- **Invalid Client ID:** `9999` → "Passenger not found"
- **Invalid Flight:** `INVALID` → "Flight not found"
- **Not enough seats:** Request more than available → "Not enough seats available"

---

## 🚀 API Endpoints:

### Validate Booking:
```
POST /api/bookings/validate
Body: {
  "clientId": 1001,
  "flightNum": "CB1104",
  "flightDate": "2025-11-15",
  "passengerCount": 2
}
```

### Create Booking (Requires Authentication):
```
POST /api/bookings
Body: {
  "clientId": 1001,
  "flightNum": "CB1104",
  "flightDate": "2025-11-15",
  "passengerCount": 2
}
Headers: Authorization: Bearer <token>
```

---

## 📋 Response Format:

### Validation Response:
```json
{
  "clientId": 1001,
  "clientName": "Maxime Duprat",
  "flightNum": "CB1104",
  "flightDate": "2025-11-15",
  "passengerCount": 2,
  "totalPrice": 241.98
}
```

### Booking Response:
```json
{
  "transactionId": 5004,
  "totalPrice": 241.98,
  "clientId": 1001,
  "clientName": "Maxime Duprat",
  "flightNum": "CB1104",
  "flightDate": "2025-11-15",
  "passengerCount": 2,
  "tickets": [
    {
      "ticketId": "TKT0000007",
      "seatNum": "1A",
      "clientId": 1001
    },
    {
      "ticketId": "TKT0000008",
      "seatNum": "1B",
      "clientId": 1001
    }
  ]
}
```

---

## ✅ Business Rules Implemented:

- ✅ **RULE_002**: Price calculation (TOTAL_PRICE = UNIT_PRICE × COUNT)
- ✅ **RULE_005**: Client ID validation
- ✅ **RULE_006**: Flight number validation
- ✅ **RULE_007**: Passenger count validation
- ✅ **Seat availability check** before booking
- ✅ **Auto seat assignment** (1A, 1B, 1C, ...)
- ✅ **Ticket ID generation** (format: TKT + 7 digits)
- ✅ **Transaction creation** với purchase date/time

---

## 🚀 Rebuild sau khi thêm code:

### Backend:
```bash
cd output
docker-compose down
docker-compose build backend --no-cache
docker-compose up -d
```

### Frontend:
```bash
# Nếu dùng Docker:
docker-compose build frontend --no-cache
docker-compose up -d frontend

# HOẶC nếu chạy local:
cd frontend
npm install
npm run dev
```

---

**Chức năng Booking đã được thêm đầy đủ! ✅**

Sau khi rebuild, bạn có thể test booking với test data ở trên!

