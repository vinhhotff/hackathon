# Dashboard Table với Pagination - Đã thêm xong!

## ✅ Đã implement:

### Backend:
1. ✅ **DashboardController** - 3 endpoints với pagination:
   - `GET /api/dashboard/flights` - Tất cả flights
   - `GET /api/dashboard/bookings` - Tất cả bookings (transactions)
   - `GET /api/dashboard/tickets` - Tất cả tickets

### Frontend:
1. ✅ **FlightSearchPage** - Thêm tabs và tables:
   - Tab "All Flights" - Hiển thị tất cả flights với pagination
   - Tab "All Bookings" - Hiển thị tất cả bookings với pagination
   - Tab "All Tickets" - Hiển thị tất cả tickets với pagination
2. ✅ **dashboardApi.ts** - API client functions

---

## 🎯 Tính năng:

### 1. Tabs Navigation
- 3 tabs: All Flights, All Bookings, All Tickets
- Active tab có màu xanh
- Tự động load data khi chuyển tab

### 2. Pagination
- Page size: 10 records per page
- Previous/Next buttons
- Page numbers clickable
- Hiển thị: "Showing page X of Y (Z total records)"

### 3. Tables
- **Flights Table**: Flight ID, Number, Date, Times, Airports, Passengers, Airplane
- **Bookings Table**: Transaction ID, Purchase Date/Time, Price, Employee, Client
- **Tickets Table**: Ticket ID, Transaction ID, Client ID, Flight ID, Seat Number

---

## 📊 API Endpoints:

### Get All Flights:
```
GET /api/dashboard/flights?page=0&size=10&sortBy=flightDate&sortDir=desc
```

### Get All Bookings:
```
GET /api/dashboard/bookings?page=0&size=10&sortBy=purchaseDate&sortDir=desc
```

### Get All Tickets:
```
GET /api/dashboard/tickets?page=0&size=10&sortBy=ticketId&sortDir=asc
```

**Query Parameters:**
- `page` (default: 0) - Page number (0-indexed)
- `size` (default: 10) - Records per page
- `sortBy` - Field to sort by
- `sortDir` - Sort direction: 'asc' or 'desc'

---

## 📋 Response Format:

```json
{
  "flights": [...],
  "pagination": {
    "currentPage": 0,
    "totalPages": 1,
    "totalRecords": 5,
    "pageSize": 10
  }
}
```

---

## 🔄 Rebuild sau khi thêm code:

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

## ✅ Cách sử dụng:

1. **Vào trang Search Flights**
2. **Scroll xuống** → Thấy tabs: "All Flights", "All Bookings", "All Tickets"
3. **Click tab** để xem data tương ứng
4. **Dùng pagination** để xem các trang tiếp theo

---

**Dashboard tables với pagination đã được thêm! ✅**

Sau khi rebuild backend và frontend, bạn sẽ thấy tables ở dưới form search!

