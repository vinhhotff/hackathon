# Testing Guide - COBOL Airlines System

## 🚀 Sau khi chạy `docker-compose up`, làm theo các bước sau:

---

## 📋 Quick Test (2 phút)

### 1. Kiểm tra Services
```bash
docker-compose ps
```
Phải thấy 3 services: `airlines-db`, `airlines-backend`, `airlines-frontend` đều **Up**

### 2. Test Frontend (Browser)
1. Mở: **http://localhost:3000**
2. Login với:
   - User ID: `EMP00001`
   - Password: `password123`
3. Nếu thấy màn hình Search Flight → ✅ Frontend OK!

### 3. Test Backend API (Terminal)

**Windows PowerShell:**
```powershell
cd output
.\test-api.ps1
```

**Linux/Mac:**
```bash
cd output
chmod +x test-api.sh
./test-api.sh
```

**Hoặc test thủ công:**
```bash
# Test Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"EMP00001\",\"password\":\"password123\"}"
```

---

## 🧪 Chi tiết Test Cases

### ✅ Test Case 1: Login Success
**Input:**
- User ID: `EMP00001`
- Password: `password123`

**Expected:**
- Status: 200 OK
- Response có `token` và `user` object
- User có `deptId: 7` (Sales department)

### ✅ Test Case 2: Login Failure
**Input:**
- User ID: `INVALID`
- Password: `wrong`

**Expected:**
- Status: 401 hoặc 400
- Message: "PASSWORD OR USERID INCORRECT"

### ✅ Test Case 3: Search Flights
**Input:**
- Flight Date: `2025-11-15`

**Expected:**
- Status: 200 OK
- Response có array `flights` với ít nhất 1 flight
- Mỗi flight có: `flightNum`, `flightDate`, `depTime`, `arrTime`, `airportDep`, `airportArr`

### ✅ Test Case 4: Search Flights - No Results
**Input:**
- Flight Date: `2099-12-31`

**Expected:**
- Status: 200 OK
- Response có `flights: []` (empty array)

### ✅ Test Case 5: Unauthorized Access
**Input:**
- Request không có token

**Expected:**
- Status: 401 Unauthorized

---

## 🌐 Test với Browser DevTools

1. Mở **http://localhost:3000**
2. Mở DevTools (F12) → Tab **Network**
3. Đăng nhập
4. Kiểm tra:
   - Request `POST /api/auth/login` → Status 200
   - Response có token
5. Search flight
6. Kiểm tra:
   - Request `GET /api/flights?...` → Status 200
   - Response có flights array

---

## 📊 Kiểm tra Database

### Xem dữ liệu:
```bash
docker exec -it airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) FROM employee;"
docker exec -it airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) FROM flight;"
docker exec -it airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) FROM passenger;"
```

**Expected:**
- Employee: 5 records
- Flight: 5 records
- Passenger: 8 records

---

## 🔍 Troubleshooting Test

### Nếu test script lỗi:

1. **Check backend đang chạy:**
   ```bash
   curl http://localhost:8080/api/auth/login
   # Nếu không response → backend chưa start
   ```

2. **Check logs:**
   ```bash
   docker-compose logs backend
   docker-compose logs db
   ```

3. **Check database connection:**
   ```bash
   docker exec -it airlines-db psql -U admin -d airlines
   # Nếu vào được psql → database OK
   ```

---

## ✅ Test Checklist

- [ ] Services đang chạy (docker-compose ps)
- [ ] Frontend accessible (http://localhost:3000)
- [ ] Login thành công
- [ ] Search flights thành công
- [ ] API returns data
- [ ] Database có dữ liệu
- [ ] Error handling hoạt động

---

**Sau khi test xong, bạn sẽ biết app hoạt động như thế nào! 🎯**

