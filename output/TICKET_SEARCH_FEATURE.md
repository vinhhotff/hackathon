# Ticket Search Feature - Đã thêm xong!

## ✅ Đã implement:

### Backend:
1. ✅ **TicketService** - Logic tìm kiếm tickets với nhiều tiêu chí
2. ✅ **TicketController** - REST API endpoints
3. ✅ **TicketRepository** - Query methods với JOIN FETCH để load passenger và flight
4. ✅ **TicketSearchResponse DTO** - Response format chuẩn

### Frontend:
1. ✅ **TicketSearchPage** - UI đầy đủ với form search
2. ✅ **ticketApi.ts** - API client functions

---

## 🔍 Search Criteria hỗ trợ:

### Bắt buộc phải có ÍT NHẤT MỘT trong các field:
- ✅ **TICKETID** - Tìm theo mã vé
- ✅ **CLIENTID** - Tìm theo mã khách hàng
- ✅ **FIRSTNAME + LASTNAME** - Tìm theo tên hành khách

### Optional filters (có thể thêm):
- ✅ **FLIGHTNUM** - Lọc theo số hiệu chuyến bay
- ✅ **FLIGHTDATE** - Lọc theo ngày bay

---

## 📝 Test Data có sẵn:

Từ `data.sql`:
```
Ticket ID: TKT0000001
Client ID: 1001
Passenger: Maxime Duprat
Flight: CB1104 (2025-11-15)

Ticket ID: TKT0000002
Client ID: 1001
Passenger: Maxime Duprat  
Flight: CB1104 (2025-11-15)

Ticket ID: TKT0000003
Client ID: 1002
Passenger: Sophie Martin
Flight: CB1104 (2025-11-15)
```

---

## ✅ Cách test:

### Test 1: Search by Ticket ID
```
Ticket ID: TKT0000001
Expected: 1 ticket (Maxime Duprat, CB1104)
```

### Test 2: Search by Client ID
```
Client ID: 1001
Expected: 2 tickets (Maxime Duprat có 2 vé)
```

### Test 3: Search by Passenger Name
```
First Name: Maxime
Last Name: Duprat
Expected: 2 tickets
```

### Test 4: Search by Client ID + Flight Number
```
Client ID: 1001
Flight Number: CB1104
Expected: 2 tickets
```

### Test 5: Search by Name + Flight Date
```
First Name: Sophie
Last Name: Martin
Flight Date: 2025-11-15
Expected: 1 ticket
```

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

## ✅ API Endpoints:

### Search Tickets:
```
GET /api/tickets?clientId=1001
GET /api/tickets?firstName=Maxime&lastName=Duprat
GET /api/tickets?ticketId=TKT0000001
GET /api/tickets?clientId=1001&flightNum=CB1104
GET /api/tickets?firstName=Maxime&lastName=Duprat&flightDate=2025-11-15
```

### Get Ticket by ID:
```
GET /api/tickets/TKT0000001
```

---

## 📋 Response Format:

```json
{
  "tickets": [
    {
      "ticketId": "TKT0000001",
      "seatNum": "12A",
      "firstName": "Maxime",
      "lastName": "Duprat",
      "clientId": 1001,
      "flightDate": "2025-11-15",
      "depTime": "10:00:00",
      "arrTime": "12:30:00",
      "flightNum": "CB1104",
      "airportDep": "CDG",
      "airportArr": "FCO"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalRecords": 1
  }
}
```

---

**Chức năng Search Ticket đã được thêm đầy đủ! ✅**

