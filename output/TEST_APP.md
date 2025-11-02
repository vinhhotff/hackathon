# Hướng dẫn Test App - COBOL Airlines System

Sau khi chạy `docker-compose up`, bạn có thể test app theo các bước sau:

---

## 🔍 Bước 1: Kiểm tra Services đang chạy

```bash
# Kiểm tra containers
docker-compose ps

# Xem logs
docker-compose logs -f
```

**Kết quả mong đợi:**
- ✅ `airlines-db` - Running
- ✅ `airlines-backend` - Running  
- ✅ `airlines-frontend` - Running

---

## 🌐 Bước 2: Test Frontend (Browser)

### 2.1 Truy cập Frontend
Mở browser: **http://localhost:3000**

### 2.2 Test Login
1. **User ID**: `EMP00001`
2. **Password**: `password123`
3. Click **LOGIN**
4. **Kết quả mong đợi**: 
   - ✅ Đăng nhập thành công
   - ✅ Redirect đến màn hình Search Flight
   - ✅ Navigation bar hiển thị tên user

### 2.3 Test Search Flight
1. Vào màn hình **Search Flight**
2. Nhập thông tin:
   - Flight Number: `CB1104` (hoặc để trống)
   - Date: `2025-11-15`
   - Departure: `CDG`
   - Arrival: `FCO`
3. Click **Search**
4. **Kết quả mong đợi**:
   - ✅ Hiển thị danh sách flights trong bảng
   - ✅ Có thông tin: FID, TDEP, TLAND, DEP, LAND, PLACES, DATE

### 2.4 Test Navigation
- Click các menu: Search Flight, Booking, Search Ticket
- **Kết quả mong đợi**: Chuyển trang thành công

---

## 🔧 Bước 3: Test Backend API (Postman/curl)

### 3.1 Test Login API

```bash
# Sử dụng curl
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"EMP00001\",\"password\":\"password123\"}"
```

**Kết quả mong đợi:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "empId": "EMP00001",
    "firstName": "John",
    "lastName": "Doe",
    "deptId": 7,
    ...
  }
}
```

### 3.2 Test Search Flights API

```bash
# Lấy token từ login response trước đó
TOKEN="your-token-here"

# Search flights
curl -X GET "http://localhost:8080/api/flights?flightDate=2025-11-15" \
  -H "Authorization: Bearer $TOKEN"
```

**Kết quả mong đợi:**
```json
{
  "flights": [
    {
      "flightId": 1,
      "flightNum": "CB1104",
      "flightDate": "2025-11-15",
      "depTime": "10:00:00",
      ...
    }
  ],
  "pagination": {...}
}
```

### 3.3 Test với các tiêu chí khác:

```bash
# Search by flight number
curl "http://localhost:8080/api/flights?flightNum=CB1104" \
  -H "Authorization: Bearer $TOKEN"

# Search by airports
curl "http://localhost:8080/api/flights?flightDate=2025-11-15&airportDep=CDG&airportArr=FCO" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Bước 4: Test với Postman Collection

### Import vào Postman:

1. **Login Request:**
   - Method: `POST`
   - URL: `http://localhost:8080/api/auth/login`
   - Headers: `Content-Type: application/json`
   - Body:
     ```json
     {
       "userId": "EMP00001",
       "password": "password123"
     }
     ```

2. **Search Flights:**
   - Method: `GET`
   - URL: `http://localhost:8080/api/flights?flightDate=2025-11-15`
   - Headers: `Authorization: Bearer {{token}}`
   - (Lưu token từ login response vào biến `{{token}}`)

---

## ✅ Checklist Test Cases

### Authentication
- [ ] Login với credentials đúng → Thành công
- [ ] Login với credentials sai → Lỗi "PASSWORD OR USERID INCORRECT"
- [ ] Login với userId rỗng → Validation error
- [ ] Login với password rỗng → Validation error

### Flight Search
- [ ] Search by flight number → Trả về flights
- [ ] Search by date → Trả về flights
- [ ] Search by date + flight number → Trả về flights
- [ ] Search by date + airports → Trả về flights
- [ ] Search không có kết quả → Trả về empty array
- [ ] Date format sai → Error message

### Database
- [ ] Kiểm tra database có data:
  ```bash
  docker exec -it airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) FROM flight;"
  ```
- [ ] Kiểm tra employee có data:
  ```bash
  docker exec -it airlines-db psql -U admin -d airlines -c "SELECT empid, firstname FROM employee;"
  ```

---

## 🐛 Test Error Cases

### 1. Test Invalid Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"INVALID\",\"password\":\"wrong\"}"
```
**Kết quả mong đợi:** HTTP 401 hoặc error message

### 2. Test Invalid Date Format
```bash
curl "http://localhost:8080/api/flights?flightDate=2025/11/15" \
  -H "Authorization: Bearer $TOKEN"
```
**Kết quả mong đợi:** Error về date format

### 3. Test Unauthorized Access
```bash
# Không có token
curl http://localhost:8080/api/flights
```
**Kết quả mong đợi:** HTTP 401 Unauthorized

---

## 📊 Kiểm tra Database

### Xem dữ liệu trong database:

```bash
# Kết nối vào database container
docker exec -it airlines-db psql -U admin -d airlines

# Trong psql, chạy các lệnh:
SELECT * FROM employee LIMIT 5;
SELECT * FROM flight LIMIT 5;
SELECT * FROM passenger LIMIT 5;
SELECT * FROM ticket LIMIT 5;
```

---

## 🌍 Test Frontend API Calls

### Mở Browser DevTools (F12):

1. Vào tab **Network**
2. Đăng nhập → Xem request `POST /api/auth/login`
3. Search flight → Xem request `GET /api/flights`
4. Kiểm tra:
   - ✅ Status code: 200
   - ✅ Response có data
   - ✅ Headers có Authorization token

---

## 🚨 Common Issues & Solutions

### Issue 1: Frontend không kết nối được Backend
**Kiểm tra:**
```bash
# Backend có đang chạy?
curl http://localhost:8080/api/auth/login

# Frontend API URL đúng chưa?
# Xem file: frontend/src/api/authApi.ts
# Đảm bảo: API_URL = 'http://localhost:8080/api'
```

### Issue 2: Database connection failed
```bash
# Kiểm tra database logs
docker-compose logs db

# Kiểm tra database có tồn tại
docker exec -it airlines-db psql -U admin -l
```

### Issue 3: CORS error
**Kiểm tra:** Backend SecurityConfig có allow origin `http://localhost:3000`

---

## 📝 Test Report Template

```
✅ Login: PASSED
✅ Search Flight: PASSED  
✅ Search by Date: PASSED
✅ Search by Flight Number: PASSED
✅ Invalid Login: PASSED (trả về error đúng)
✅ Database Connection: PASSED
```

---

## 🔄 Quick Test Script

Tạo file `test.sh` (hoặc `test.ps1` cho PowerShell):

```bash
#!/bin/bash
echo "Testing Backend API..."

# Test Login
echo "1. Testing Login..."
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId":"EMP00001","password":"password123"}' \
  -w "\nStatus: %{http_code}\n"

echo "\n2. Testing Flight Search..."
curl http://localhost:8080/api/flights?flightDate=2025-11-15 \
  -w "\nStatus: %{http_code}\n"

echo "\n✅ Test completed!"
```

---

**Sau khi test xong, bạn sẽ biết app có hoạt động đúng không! 🎯**

