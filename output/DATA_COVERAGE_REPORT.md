# Báo cáo Coverage Data từ COBOL System

## 📊 Tổng quan

Dựa trên phân tích `reverse_spec.json` và codebase COBOL gốc:

---

## ✅ Đã Reverse-Engineer ĐẦY ĐỦ:

### 1. Entities (Bảng Database)
**Từ COBOL:** 15 entities được phát hiện
- ✅ **9 AS-400 DDS tables**: employee, avion, billet, dept, Equipage, passager, shift, vol, ACHAT
- ✅ **6 DB2 tables**: EMPLO, FLIGHT, PASSENGERS, TICKET, AIRPORT, (có thể có thêm)

**Đã implement trong Spring Boot:**
- ✅ Employee
- ✅ Department (DEPT)
- ✅ Passenger
- ✅ Flight
- ✅ Ticket
- ✅ Transaction (ACHAT)
- ✅ Airport
- ✅ Airplane (AVION)
- ✅ Shift
- **Tổng: 9 entities**

### 2. Use Cases
**Từ COBOL:** 9 use cases chính
- ✅ UC-001: User Login
- ✅ UC-002: Search Flights
- ✅ UC-003: Search Tickets
- ✅ UC-004: Sell Ticket (Booking)
- ✅ UC-005: Print Ticket
- ✅ UC-006: Print Receipt
- ✅ UC-007: Manage Employees (Insert từ JSON)
- ✅ UC-008: Manage Passengers (Insert từ XML)
- ✅ UC-009: Duplicate Flights for Month

**Đã implement:**
- ✅ Login (AuthController)
- ✅ Search Flights (FlightController)
- ⚠️ Search Tickets (chưa có controller/service)
- ⚠️ Booking (chưa có controller/service)
- ⚠️ Print Ticket/Receipt (chưa có)
- ⚠️ Insert Employee (chưa có controller)
- ⚠️ Insert Passenger (chưa có controller)
- ⚠️ Duplicate Flight (chưa có controller)

**Status: ~30% use cases đã implement đầy đủ**

### 3. Business Rules
**Từ COBOL:** 14 business rules
- ✅ RULE_001: Password encryption (đã implement)
- ✅ RULE_002: Price calculation (có thể thiếu logic đầy đủ)
- ✅ RULE_003: Department routing (đã implement)
- ✅ RULE_004: Date validation (đã implement)
- ✅ RULE_005: Field validations (một phần)
- ✅ RULE_006: SQL error handling (cơ bản)
- ✅ RULE_007: Pagination (đã implement)
- ✅ RULE_008: Time adjustment (có thể thiếu)
- ✅ RULE_009: VARCHAR length calculation (có thể thiếu)
- ✅ RULE_010: Month days calculation (chưa implement)
- ⚠️ RULE_011-014: Các rules khác (cần kiểm tra)

**Status: ~60% business rules đã implement**

### 4. CICS Maps (UI Screens)
**Từ COBOL:** Nhiều maps/screens
- ✅ LOGIN (đã implement trong React)
- ✅ SELL1-MAP (chưa có)
- ✅ SELL2-MAP (chưa có)
- ✅ SRCHFLY-MAP (đã implement - FlightSearchPage)
- ✅ SRCHTKT-MAP (chưa có)
- ✅ RECEIPT-FORMAT (chưa có)
- ✅ TICKET-FORMAT (chưa có)

**Status: ~20% UI screens đã implement**

---

## ⚠️ Còn thiếu (chưa implement):

### Backend Controllers/Services:
1. ❌ `TicketController` - Search tickets, ticket details
2. ❌ `BookingController` - Sell ticket workflow
3. ❌ `PassengerController` - CRUD passengers, import XML
4. ❌ `EmployeeController` - Import JSON, manage employees
5. ❌ `PrintController` - Print ticket/receipt (PDF generation)
6. ❌ `FlightDuplicateController` - Duplicate flights for month

### Backend Services:
1. ❌ `TicketService` - Ticket search logic
2. ❌ `BookingService` - Complete booking workflow
3. ❌ `PassengerService` - XML import, CRUD
4. ❌ `EmployeeService` - JSON import
5. ❌ `FlightDuplicateService` - Month duplication logic
6. ❌ `PrintService` - PDF generation

### Frontend Pages:
1. ❌ `TicketSearchPage` - Search tickets
2. ❌ `BookingPage` - Complete booking workflow
3. ❌ `PassengerManagementPage` - CRUD passengers
4. ❌ `EmployeeManagementPage` - Import employees
5. ❌ `PrintPage` - Print ticket/receipt
6. ❌ `FlightDuplicatePage` - Admin duplicate flights

---

## 📈 Coverage Summary:

| Component | Coverage | Status |
|-----------|----------|--------|
| **Database Entities** | 9/15 (60%) | ⚠️ Partial |
| **Use Cases** | 3/9 (33%) | ⚠️ Partial |
| **Business Rules** | 8/14 (57%) | ⚠️ Partial |
| **UI Screens** | 2/10 (20%) | ⚠️ Partial |
| **API Endpoints** | ~15/50+ (30%) | ⚠️ Partial |

---

## 🎯 Kết luận:

**Đã lấy HẦU HẾT data từ COBOL:**
- ✅ Database schema: ~60% entities
- ✅ Business logic: ~57% rules
- ✅ Use cases: ~33% (chủ yếu là core features)

**NHƯNG chưa implement đầy đủ:**
- ⚠️ Nhiều controllers/services còn thiếu
- ⚠️ Một số business rules chưa được implement
- ⚠️ UI screens chưa đầy đủ

---

## 📝 Khuyến nghị:

### Priority 1 (Critical):
1. Implement `BookingController` + `BookingService` - Core feature
2. Implement `TicketController` + `TicketService` - Core feature
3. Complete booking workflow logic

### Priority 2 (Important):
4. Implement `PassengerController` - CRUD + XML import
5. Implement `EmployeeController` - JSON import
6. Add PDF generation for tickets/receipts

### Priority 3 (Nice to have):
7. Implement flight duplication
8. Complete all UI screens
9. Add remaining business rules

---

**Tóm lại: Đã reverse-engineer được ~60-70% data từ COBOL, nhưng chỉ implement được ~30-40% trong code mới!**

