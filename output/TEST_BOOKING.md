# Hướng dẫn Test Booking

## 🔍 Quick Test:

### Test 1: Successful Booking (2 passengers)
**Nhập vào form:**
- **Client ID:** `1001`
- **Flight Number:** `CB1104`
- **Flight Date:** `2025-11-15`
- **Passenger Count:** `2`

**Steps:**
1. Click **"Search & Validate"**
   - Expected: Hiển thị validation info với price €241.98
   
2. Click **"Confirm Booking"**
   - Expected: Success message với:
     - Transaction ID
     - 2 tickets (TKT0000007, TKT0000008)
     - Seats: 1A, 1B
     - Total: €241.98

---

### Test 2: Booking 4 passengers
**Nhập vào form:**
- **Client ID:** `1002`
- **Flight Number:** `CB1104`
- **Flight Date:** `2025-11-15`
- **Passenger Count:** `4`

**Expected:**
- Total Price: €483.96 (4 × €120.99)
- 4 tickets với seats: 1A, 1B, 1C, 1D

---

## ❌ Error Cases:

### Error 1: Invalid Client ID
```
Client ID: 9999
Flight Number: CB1104
Flight Date: 2025-11-15
Passenger Count: 1
```
**Expected Error:** "Passenger not found with Client ID: 9999"

---

### Error 2: Invalid Flight
```
Client ID: 1001
Flight Number: INVALID
Flight Date: 2025-11-15
Passenger Count: 1
```
**Expected Error:** "Flight not found: INVALID on 2025-11-15"

---

### Error 3: Not enough seats
```
Client ID: 1001
Flight Number: CB1104
Flight Date: 2025-11-15
Passenger Count: 200  (quá nhiều!)
```
**Expected Error:** "Not enough seats available. Available: X, Requested: 200"

---

### Error 4: Invalid date format
```
Flight Date: 15/11/2025  (sai format!)
```
**Expected:** Browser date picker sẽ validate

---

## ✅ Available Test Data:

### Passengers:
- **Client ID 1001:** Maxime Duprat
- **Client ID 1002:** Sophie Martin
- **Client ID 1003:** Pierre Dubois
- **Client ID 1004:** Marie Lefebvre
- **Client ID 1005:** Jean Bernard

### Flights:
- **CB1104** on 2025-11-15 (CDG → FCO, 150 seats)
- **CB1105** on 2025-11-15 (FCO → CDG, 180 seats)
- **CB2204** on 2025-11-16 (CDG → LHR, 160 seats)
- **CB2205** on 2025-11-16 (LHR → CDG, 175 seats)
- **CB3304** on 2025-11-17 (CDG → JFK, 190 seats)

---

## 📝 Expected Results:

### After successful booking:
1. ✅ Transaction được tạo trong database
2. ✅ Tickets được tạo (1 ticket per passenger)
3. ✅ Seats được assign tự động
4. ✅ Ticket IDs unique (format: TKT0000007, TKT0000008, ...)
5. ✅ Total price = Unit price (€120.99) × Passenger count

---

## 🔍 Verify in Database:

Sau khi booking thành công, có thể verify:

```sql
-- Check transaction
SELECT * FROM transaction WHERE achatid = <transactionId>;

-- Check tickets
SELECT * FROM ticket WHERE buyid = <transactionId>;

-- Check seat assignments
SELECT ticketid, seatnum, flightid FROM ticket 
WHERE buyid = <transactionId> 
ORDER BY seatnum;
```

---

**Sử dụng các giá trị này để test Booking! ✅**

