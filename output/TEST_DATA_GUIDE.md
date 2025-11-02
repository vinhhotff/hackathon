# Hướng dẫn Test Data - COBOL Airlines

## 🔍 Test Search Flights Function

### Dữ liệu mẫu có sẵn trong database:

#### 1. Flights (Chuyến bay):
```
Flight Number: CB1104
Date: 2025-11-15
Departure: CDG (Paris)
Arrival: FCO (Rome)

Flight Number: CB1105
Date: 2025-11-15
Departure: FCO (Rome)
Arrival: CDG (Paris)

Flight Number: CB1106
Date: 2025-11-16
Departure: CDG (Paris)
Arrival: LHR (London)
```

#### 2. Airports (Sân bay):
- **CDG** - Charles de Gaulle Airport (Paris)
- **FCO** - Leonardo da Vinci Airport (Rome)
- **LHR** - Heathrow Airport (London)
- **JFK** - John F. Kennedy Airport (New York)
- **NRT** - Narita Airport (Tokyo)

#### 3. Dates có data:
- **2025-11-15** - Có nhiều flights
- **2025-11-16** - Có flights
- **2025-11-17** - Có flights

---

## ✅ Các cách test Search Flights:

### Test 1: Search by Date (Dễ nhất)
**Nhập vào form:**
- **Flight Number:** (Để trống)
- **Date:** `2025-11-15`
- **Departure Airport:** (Để trống)
- **Arrival Airport:** (Để trống)
- Click **Search**

**Expected:** Hiển thị danh sách flights ngày 15/11/2025

---

### Test 2: Search by Date + Flight Number
**Nhập vào form:**
- **Flight Number:** `CB1104`
- **Date:** `2025-11-15`
- **Departure Airport:** (Để trống)
- **Arrival Airport:** (Để trống)
- Click **Search**

**Expected:** Hiển thị flight CB1104 ngày 15/11/2025

---

### Test 3: Search by Date + Airports
**Nhập vào form:**
- **Flight Number:** (Để trống)
- **Date:** `2025-11-15`
- **Departure Airport:** `CDG`
- **Arrival Airport:** `FCO`
- Click **Search**

**Expected:** Hiển thị flights từ CDG đến FCO ngày 15/11/2025

---

### Test 4: Search by Flight Number only
**Nhập vào form:**
- **Flight Number:** `CB1104`
- **Date:** (Để trống)
- **Departure Airport:** (Để trống)
- **Arrival Airport:** (Để trống)
- Click **Search**

**Expected:** Hiển thị tất cả flights có số hiệu CB1104

---

### Test 5: Search không có kết quả (Test error case)
**Nhập vào form:**
- **Flight Number:** `INVALID123`
- **Date:** `2099-12-31`
- Click **Search**

**Expected:** Hiển thị "No flights found matching criteria"

---

## 📝 Quick Test Values:

| Field | Test Value | Expected Result |
|-------|------------|-----------------|
| Date | `2025-11-15` | ✅ Có flights |
| Flight Number | `CB1104` | ✅ Có flight |
| Departure | `CDG` | ✅ Có flights |
| Arrival | `FCO` | ✅ Có flights |
| Date | `2025-11-15` + Departure `CDG` + Arrival `FCO` | ✅ Có flights |

---

## 🔍 Kiểm tra data trong database:

### Xem flights có sẵn:
```bash
# Vào database container
docker exec -it airlines-db psql -U admin -d airlines

# Xem flights
SELECT flightnum, flight_date, airport_dep, airport_arr FROM flight ORDER BY flight_date;

# Xem airports
SELECT airportid, name FROM airport;
```

---

## ⚠️ Lưu ý:

1. **Date format:** Phải nhập đúng `YYYY-MM-DD` (ví dụ: `2025-11-15`)
   - ✅ Đúng: `2025-11-15`
   - ❌ Sai: `15/11/2025` hoặc `02/06/2023`

2. **Airport codes:** Phải là mã 3-4 ký tự (ví dụ: `CDG`, `FCO`)
   - ✅ Đúng: `CDG`, `FCO`, `LHR`
   - ❌ Sai: `Paris`, `Rome`

3. **Flight Number:** Phải đúng format (ví dụ: `CB1104`)
   - ✅ Đúng: `CB1104`, `CB1105`
   - ❌ Sai: `CB-1104` (có dấu gạch)

---

## 🎯 Test Cases mẫu (Copy-paste):

### Case 1: Tìm flights ngày 15/11
```
Date: 2025-11-15
Expected: ≥ 2 flights
```

### Case 2: Tìm flight cụ thể
```
Flight Number: CB1104
Date: 2025-11-15
Expected: 1 flight (CDG → FCO)
```

### Case 3: Tìm flights từ Paris đến Rome
```
Date: 2025-11-15
Departure: CDG
Arrival: FCO
Expected: ≥ 1 flight
```

---

**Sử dụng các giá trị này để test Search Flights! ✅**

