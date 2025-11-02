# Customer Management Feature - Đã thêm xong!

## ✅ Đã implement:

### Backend:
1. ✅ **PassengerService** - CRUD operations với validation
2. ✅ **PassengerController** - REST API endpoints (`/api/passengers`)
3. ✅ **PassengerRequest DTO** - Validation cho create/update

### Frontend:
1. ✅ **CustomerManagementPage** - Full CRUD UI với:
   - Add New Customer form
   - Edit Customer form
   - Delete với confirmation
   - Search by name
   - Table với pagination
2. ✅ **passengerApi.ts** - API client functions
3. ✅ **NavigationBar** - Thêm link "Customer"
4. ✅ **App.tsx** - Thêm route `/customers`

---

## 🎯 Chức năng:

### 1. View All Customers
- Table hiển thị tất cả hành khách
- Pagination (10 records/page)
- Search by name (firstname hoặc lastname)

### 2. Add New Customer
- Click "Add New Customer" button
- Form với validation:
  - First Name, Last Name (required, max 30 chars)
  - Address (required, max 250 chars)
  - City, Country (required, max 50/30 chars)
  - Zip Code (required, max 15 chars)
  - Telephone (required, max 18 chars)
  - Email (required, valid email, max 100 chars, unique)
- Email validation: tự động lowercase và check duplicate

### 3. Edit Customer
- Click "Edit" button trên row
- Form tự động fill data
- Validation giống Add
- Email check: cho phép giữ email cũ hoặc đổi sang email chưa tồn tại

### 4. Delete Customer
- Click "Delete" button → Confirmation dialog
- **Validation:** Không cho xóa nếu passenger có tickets
- Hiển thị error nếu có tickets: "Cannot delete passenger with existing tickets. Passenger has X ticket(s)."

### 5. Search
- Search box ở trên table
- Tìm theo firstname hoặc lastname (LIKE search)
- Real-time search với debounce
- Reset về page 0 khi search

---

## 📝 API Endpoints:

### Get All Passengers (with search & pagination):
```
GET /api/passengers?page=0&size=10&search=john
```

### Get Passenger by ID:
```
GET /api/passengers/{clientId}
```

### Create Passenger:
```
POST /api/passengers
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St",
  "city": "Paris",
  "country": "France",
  "zipCode": "75001",
  "telephone": "+33123456789",
  "email": "john.doe@email.com"
}
```

### Update Passenger:
```
PUT /api/passengers/{clientId}
Body: { ... same as create }
```

### Delete Passenger:
```
DELETE /api/passengers/{clientId}
```

---

## ✅ Validation Rules:

### Backend:
- ✅ Email phải unique
- ✅ Không cho xóa nếu có tickets
- ✅ Trim whitespace cho tất cả fields
- ✅ Email tự động lowercase

### Frontend:
- ✅ Required fields validation
- ✅ Max length validation
- ✅ Email format validation
- ✅ Confirmation dialog cho delete

---

## 📋 Table Columns:

| Column | Description |
|--------|-------------|
| Client ID | Auto-generated ID |
| First Name | Passenger first name |
| Last Name | Passenger last name |
| Email | Unique email address |
| City | City |
| Country | Country |
| Telephone | Phone number |
| Actions | Edit & Delete buttons |

---

## 🔄 Workflow:

### Add New Customer:
1. Click "Add New Customer"
2. Fill form
3. Click "Create"
4. Success message → Table refresh

### Edit Customer:
1. Click "Edit" trên row
2. Form hiển thị với data hiện tại
3. Modify fields
4. Click "Update"
5. Success message → Table refresh

### Delete Customer:
1. Click "Delete" trên row
2. Confirm dialog
3. Nếu có tickets → Error message
4. Nếu không có tickets → Success → Table refresh

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

## ✅ Test Data:

**Existing customers:**
- Client ID 1001: Maxime Duprat
- Client ID 1002: Sophie Martin
- Client ID 1003: Pierre Dubois
- ... (8 customers total)

**Test Add:**
```
First Name: Test
Last Name: User
Address: 123 Test Street
City: Paris
Country: France
Zip Code: 75001
Telephone: +33123456789
Email: test.user@email.com
```

---

**Customer Management feature đã được thêm đầy đủ! ✅**

Sau khi rebuild, bạn sẽ thấy menu "Customer" và có thể quản lý hành khách!

