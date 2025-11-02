# Hướng dẫn Test Search Ticket

## 🔍 Cách test Search Ticket

### Test 1: Search by Ticket ID (Dễ nhất)
**Nhập vào form:**
- **Ticket ID:** `TKT0000001`
- (Các field khác để trống)
- Click **Search**

**Expected:** Hiển thị 1 ticket (Maxime Duprat, seat 12A, flight CB1104)

---

### Test 2: Search by Client ID
**Nhập vào form:**
- **Client ID:** `1001`
- Click **Search**

**Expected:** Hiển thị 2 tickets (Maxime Duprat có 2 vé: 12A và 12B)

---

### Test 3: Search by Passenger Name
**Nhập vào form:**
- **First Name:** `Maxime`
- **Last Name:** `Duprat`
- Click **Search**

**Expected:** Hiển thị 2 tickets

---

### Test 4: Search by Client ID + Flight Number
**Nhập vào form:**
- **Client ID:** `1001`
- **Flight Number:** `CB1104`
- Click **Search**

**Expected:** Hiển thị 2 tickets (chỉ các vé của client 1001 trên flight CB1104)

---

### Test 5: Search by Name + Flight Date
**Nhập vào form:**
- **First Name:** `Sophie`
- **Last Name:** `Martin`
- **Flight Date:** `2025-11-15`
- Click **Search**

**Expected:** Hiển thị 1 ticket (Sophie Martin, flight CB1104)

---

## 📝 Test Data có sẵn:

| Ticket ID | Client ID | Passenger | Flight | Seat |
|-----------|-----------|-----------|--------|------|
| TKT0000001 | 1001 | Maxime Duprat | CB1104 | 12A |
| TKT0000002 | 1001 | Maxime Duprat | CB1104 | 12B |
| TKT0000003 | 1002 | Sophie Martin | CB1104 | 15C |
| TKT0000004 | 1003 | Pierre Dubois | CB1105 | 8A |
| TKT0000005 | 1003 | Pierre Dubois | CB1105 | 8B |

---

## ✅ Quick Test Values:

**Copy-paste để test:**

1. **By Ticket ID:**
   ```
   Ticket ID: TKT0000001
   ```

2. **By Client ID:**
   ```
   Client ID: 1001
   ```

3. **By Passenger Name:**
   ```
   First Name: Maxime
   Last Name: Duprat
   ```

4. **Combined Search:**
   ```
   Client ID: 1001
   Flight Number: CB1104
   Flight Date: 2025-11-15
   ```

---

## ⚠️ Validation Rules:

- **Phải có ÍT NHẤT MỘT trong các field:**
  - Ticket ID, HOẶC
  - Client ID, HOẶC
  - (First Name + Last Name)

- **Nếu không có field nào → Error:**
  "At least one of TICKETID, CLIENTID, or (FIRSTNAME + LASTNAME) must be provided"

---

**Sử dụng các giá trị này để test Search Ticket! ✅**

