# 🔴 REBUILD BACKEND NGAY - Lỗi Booking API

## ❌ Lỗi hiện tại:
```
No static resource api/bookings/validate
```

**Nguyên nhân:** Backend chưa được rebuild sau khi thêm BookingController mới.

---

## ✅ Cách fix:

### Option 1: Rebuild bằng Docker Compose (Khuyên dùng)
```powershell
cd output
docker-compose down
docker-compose build backend --no-cache
docker-compose up -d
```

### Option 2: Rebuild thủ công
```powershell
# Stop backend container
docker stop airlines-backend

# Remove old image
docker rmi output-backend -f

# Rebuild và start
cd output
docker-compose build backend --no-cache
docker-compose up -d backend
```

### Option 3: Dùng script rebuild
```powershell
cd output
.\rebuild-backend.ps1
```

---

## ✅ Verify sau khi rebuild:

### 1. Check backend logs:
```powershell
docker logs airlines-backend -f
```

**Expected:** Thấy Spring Boot start thành công, không có error về BookingController

### 2. Test API trực tiếp:
```powershell
# Get token first
$token = (Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method POST -Body (@{userId="EMP00001";password="password123"} | ConvertTo-Json) -ContentType "application/json").token

# Test validate endpoint
Invoke-RestMethod -Uri "http://localhost:8080/api/bookings/validate" -Method POST -Headers @{Authorization="Bearer $token"} -Body (@{clientId=1001;flightNum="CB1104";flightDate="2025-11-15";passengerCount=1} | ConvertTo-Json) -ContentType "application/json"
```

**Expected:** Response với booking details và price

---

## 🔍 Nếu vẫn lỗi sau khi rebuild:

### Check 1: Backend có start không?
```powershell
docker ps | findstr airlines-backend
```

### Check 2: Backend logs có error không?
```powershell
docker logs airlines-backend --tail 50
```

### Check 3: BookingController có được load không?
```powershell
docker logs airlines-backend | findstr BookingController
```

---

## ⚠️ Lưu ý:

- **PHẢI rebuild** sau mỗi lần thêm/sửa code backend
- Dùng `--no-cache` để đảm bảo rebuild hoàn toàn
- Đợi backend start xong (khoảng 30-60 giây) trước khi test

---

**Sau khi rebuild, refresh trang và test lại! ✅**

