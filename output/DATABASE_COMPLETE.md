# 📊 COBOL Airlines Database - Complete Documentation

## Tổng Quan Database

**Database Name:** `airlines`  
**Database Type:** PostgreSQL 16  
**Character Encoding:** UTF-8  
**Timezone:** UTC

---

## 📋 Danh Sách Tables

1. **department** - Phòng ban
2. **employee** - Nhân viên
3. **passenger** - Hành khách
4. **airport** - Sân bay
5. **airplane** - Máy bay
6. **shift** - Ca làm việc
7. **flight** - Chuyến bay
8. **transaction** - Giao dịch mua vé (ACHAT)
9. **ticket** - Vé máy bay

**Tổng:** 9 bảng

---

## 🗂️ Chi Tiết Từng Bảng

### 1. DEPARTMENT (Phòng Ban)

**Mục đích:** Quản lý các phòng ban trong công ty

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `deptid` | INTEGER (SERIAL) | PRIMARY KEY | ID phòng ban |
| `name` | VARCHAR(50) | NOT NULL | Tên phòng ban |
| `empid_director` | VARCHAR(8) | FOREIGN KEY, NULLABLE | ID nhân viên làm giám đốc |

**Sample Data:**
```sql
deptid | name              | empid_director
-------|-------------------|---------------
1      | CEO               | NULL
2      | Flight Crew       | NULL
3      | Ground Crew       | NULL
4      | Maintenance Crew  | NULL
5      | Human Resources   | NULL
6      | IT                | NULL
7      | Sales             | NULL
8      | Legal             | NULL
9      | Schedule          | NULL
```

**Relationships:**
- One-to-Many với `employee` (một phòng ban có nhiều nhân viên)
- One-to-One với `employee` (director) - optional

---

### 2. EMPLOYEE (Nhân Viên)

**Mục đích:** Quản lý thông tin nhân viên

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `empid` | VARCHAR(8) | PRIMARY KEY | ID nhân viên |
| `firstname` | VARCHAR(30) | NOT NULL | Tên |
| `lastname` | VARCHAR(30) | NOT NULL | Họ |
| `address` | VARCHAR(100) | NOT NULL | Địa chỉ |
| `city` | VARCHAR(50) | NOT NULL | Thành phố |
| `zipcode` | VARCHAR(15) | NOT NULL | Mã bưu điện |
| `telephone` | VARCHAR(10) | NOT NULL | Số điện thoại |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Email |
| `admin_date` | DATE | NOT NULL | Ngày vào làm |
| `salary` | NUMERIC(8,2) | NOT NULL | Lương |
| `deptid` | INTEGER | FOREIGN KEY, NOT NULL | ID phòng ban |

**Indexes:**
- `idx_employee_deptid` trên `deptid`
- `idx_employee_email` trên `email` (UNIQUE)

**Sample Data:**
```sql
empid   | firstname | lastname  | deptid | salary  | email
--------|-----------|-----------|--------|---------|------------------------
EMP00001| John      | Doe       | 7      | 50000.00| john.doe@airlines.com
EMP00002| Jane      | Smith     | 5      | 55000.00| jane.smith@airlines.com
EMP00003| Bob       | Johnson   | 6      | 60000.00| bob.johnson@airlines.com
EMP00004| Alice     | Williams  | 7      | 52000.00| alice.williams@airlines.com
EMP00005| Charlie   | Brown     | 7      | 48000.00| charlie.brown@airlines.com
```

**Relationships:**
- Many-to-One với `department` (via `deptid`)
- One-to-Many với `transaction` (nhân viên tạo nhiều giao dịch)

---

### 3. PASSENGER (Hành Khách)

**Mục đích:** Quản lý thông tin hành khách

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `clientid` | INTEGER (SERIAL) | PRIMARY KEY | ID khách hàng |
| `firstname` | VARCHAR(30) | NOT NULL | Tên |
| `lastname` | VARCHAR(30) | NOT NULL | Họ |
| `address` | VARCHAR(250) | NOT NULL | Địa chỉ |
| `city` | VARCHAR(50) | NOT NULL | Thành phố |
| `country` | VARCHAR(30) | NOT NULL | Quốc gia |
| `zipcode` | VARCHAR(15) | NOT NULL | Mã bưu điện |
| `telephone` | VARCHAR(18) | NOT NULL | Số điện thoại |
| `email` | VARCHAR(100) | NOT NULL | Email |

**Indexes:**
- `idx_passenger_email` trên `email`
- `idx_passenger_name` trên `(firstname, lastname)`

**Sample Data:**
```sql
clientid| firstname | lastname | city          | country | email
--------|-----------|----------|---------------|---------|------------------------
1001    | Maxime    | Duprat   | Paris         | France  | maxime.duprat@email.com
1002    | Sophie    | Martin   | Paris         | France  | sophie.martin@email.com
1003    | Pierre    | Dubois   | Paris         | France  | pierre.dubois@email.com
1004    | Marie     | Lefebvre | Paris         | France  | marie.lefebvre@email.com
1005    | Jean      | Bernard  | Paris         | France  | jean.bernard@email.com
```

**Relationships:**
- One-to-Many với `ticket` (hành khách có nhiều vé)
- One-to-Many với `transaction` (hành khách thực hiện nhiều giao dịch)

---

### 4. AIRPORT (Sân Bay)

**Mục đích:** Quản lý thông tin sân bay

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `airportid` | VARCHAR(4) | PRIMARY KEY | Mã sân bay (IATA) |
| `name` | VARCHAR(100) | NOT NULL | Tên sân bay |
| `address` | VARCHAR(250) | NOT NULL | Địa chỉ |
| `city` | VARCHAR(30) | NOT NULL | Thành phố |
| `country` | VARCHAR(30) | NOT NULL | Quốc gia |
| `zipcode` | VARCHAR(15) | NOT NULL | Mã bưu điện |

**Sample Data:**
```sql
airportid | name                              | city     | country
----------|-----------------------------------|----------|------------------
CDG       | Charles de Gaulle Airport         | Paris    | France
FCO       | Leonardo da Vinci Airport         | Rome     | Italy
LHR       | Heathrow Airport                  | London   | United Kingdom
JFK       | John F. Kennedy International     | New York | United States
NRT       | Narita International Airport      | Tokyo    | Japan
```

**Relationships:**
- One-to-Many với `flight` (sân bay là điểm khởi hành)
- One-to-Many với `flight` (sân bay là điểm đến)

---

### 5. AIRPLANE (Máy Bay)

**Mục đích:** Quản lý thông tin máy bay

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `airplaneid` | VARCHAR(8) | PRIMARY KEY | ID máy bay |
| `type` | VARCHAR(8) | NOT NULL | Loại máy bay |
| `num_seats` | INTEGER | NOT NULL | Số ghế |
| `fuel_capacity` | INTEGER | NOT NULL | Dung tích nhiên liệu |

**Sample Data:**
```sql
airplaneid | type    | num_seats | fuel_capacity
-----------|---------|-----------|---------------
BOEING01   | 737-800 | 189       | 26000
BOEING02   | 737-900 | 220       | 30000
AIRBUS01   | A320    | 180       | 23800
AIRBUS02   | A321    | 220       | 30000
BOEING03   | 787-8   | 242       | 126000
```

**Relationships:**
- One-to-Many với `flight` (máy bay được dùng trong nhiều chuyến bay)

---

### 6. SHIFT (Ca Làm Việc)

**Mục đích:** Quản lý ca làm việc

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `shiftid` | INTEGER (SERIAL) | PRIMARY KEY | ID ca làm việc |
| `shift_date` | DATE | NOT NULL | Ngày ca |
| `start_time` | TIME | NOT NULL | Giờ bắt đầu |
| `end_time` | TIME | NOT NULL | Giờ kết thúc |
| `equipeid` | INTEGER | FOREIGN KEY | ID tổ bay |

**Sample Data:**
```sql
shiftid | shift_date | start_time | end_time | equipeid
--------|------------|------------|----------|----------
1       | 2025-11-15 | 08:00:00   | 16:00:00 | 1
2       | 2025-11-15 | 16:00:00   | 00:00:00 | 2
3       | 2025-11-16 | 08:00:00   | 16:00:00 | 1
```

**Relationships:**
- Many-to-One với `equipe` (crew) - not fully implemented
- One-to-Many với `flight` (ca có nhiều chuyến bay)

---

### 7. FLIGHT (Chuyến Bay)

**Mục đích:** Quản lý thông tin chuyến bay

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `flightid` | INTEGER (SERIAL) | PRIMARY KEY | ID chuyến bay |
| `flight_date` | DATE | NOT NULL | Ngày bay |
| `dep_time` | TIME | NOT NULL | Giờ khởi hành |
| `arr_time` | TIME | NOT NULL | Giờ đến |
| `tot_pass` | INTEGER | NOT NULL | Tổng số hành khách |
| `tot_baggage` | INTEGER | NOT NULL | Tổng hành lý |
| `flightnum` | VARCHAR(6) | NOT NULL | Số hiệu chuyến bay |
| `shiftid` | INTEGER | FOREIGN KEY, NOT NULL | ID ca làm việc |
| `airplaneid` | VARCHAR(8) | FOREIGN KEY, NOT NULL | ID máy bay |
| `airport_dep` | VARCHAR(4) | FOREIGN KEY, NOT NULL | Sân bay khởi hành |
| `airport_arr` | VARCHAR(4) | FOREIGN KEY, NOT NULL | Sân bay đến |

**Indexes:**
- `idx_flight_flightnum` trên `flightnum`
- `idx_flight_flightdate` trên `flight_date`
- `idx_flight_airports` trên `(airport_dep, airport_arr)`
- `idx_flight_airplaneid` trên `airplaneid`

**Sample Data:**
```sql
flightid | flightnum | flight_date | dep_time | arr_time | airport_dep | airport_arr | tot_pass
---------|-----------|-------------|----------|----------|-------------|-------------|----------
1        | CB1104    | 2025-11-15  | 10:00:00 | 12:30:00 | CDG         | FCO         | 150
2        | CB1105    | 2025-11-15  | 14:00:00 | 17:30:00 | FCO         | CDG         | 180
3        | CB2204    | 2025-11-16  | 09:00:00 | 11:00:00 | CDG         | LHR         | 160
```

**Relationships:**
- One-to-Many với `ticket` (chuyến bay có nhiều vé)
- Many-to-One với `airport` (sân bay khởi hành)
- Many-to-One với `airport` (sân bay đến)
- Many-to-One với `airplane`
- Many-to-One với `shift`

**Calculated Fields:**
- `available_seats` = `airplane.num_seats` - COUNT(tickets WHERE `flightid` = `flight.flightid`)

---

### 8. TRANSACTION (Giao Dịch - ACHAT)

**Mục đích:** Quản lý giao dịch mua vé

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `achatid` | INTEGER (SERIAL) | PRIMARY KEY | ID giao dịch |
| `purchase_date` | DATE | NOT NULL | Ngày mua |
| `purchase_time` | TIME | NOT NULL | Giờ mua |
| `price` | NUMERIC(7,2) | NOT NULL | Tổng giá |
| `employeeid` | VARCHAR(8) | FOREIGN KEY, NOT NULL | ID nhân viên bán |
| `clientid` | INTEGER | FOREIGN KEY, NOT NULL | ID khách hàng |

**Indexes:**
- `idx_transaction_employeeid` trên `employeeid`
- `idx_transaction_clientid` trên `clientid`

**Sample Data:**
```sql
achatid | purchase_date | purchase_time | price  | employeeid | clientid
--------|---------------|---------------|--------|------------|----------
5001    | 2025-11-02    | 10:30:00      | 241.98 | EMP00001   | 1001
5002    | 2025-11-02    | 11:15:00      | 120.99 | EMP00004   | 1002
5003    | 2025-11-02    | 14:20:00      | 362.97 | EMP00001   | 1003
```

**Relationships:**
- Many-to-One với `employee` (nhân viên tạo giao dịch)
- Many-to-One với `passenger` (khách hàng thực hiện giao dịch)
- One-to-Many với `ticket` (giao dịch chứa nhiều vé)

**Business Rules:**
- Một giao dịch có thể chứa nhiều vé (ví dụ: mua vé cho cả gia đình)
- `price` = tổng giá của tất cả vé trong giao dịch

---

### 9. TICKET (Vé Máy Bay)

**Mục đích:** Quản lý vé máy bay

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `ticketid` | VARCHAR(10) | PRIMARY KEY | ID vé (format: TKT0000001) |
| `buyid` | INTEGER | FOREIGN KEY, NOT NULL | ID giao dịch |
| `clientid` | INTEGER | FOREIGN KEY, NOT NULL | ID khách hàng |
| `flightid` | INTEGER | FOREIGN KEY, NOT NULL | ID chuyến bay |
| `seatnum` | VARCHAR(3) | NOT NULL | Số ghế (format: 12A) |

**Indexes:**
- `idx_ticket_buyid` trên `buyid`
- `idx_ticket_clientid` trên `clientid`
- `idx_ticket_flightid` trên `flightid`
- `idx_ticket_seatnum` trên `seatnum`

**Unique Constraints:**
- `UNIQUE(flightid, seatnum)` - Mỗi ghế trên một chuyến bay là duy nhất

**Sample Data:**
```sql
ticketid  | buyid | clientid | flightid | seatnum
----------|-------|----------|----------|--------
TKT0000001| 5001  | 1001     | 1        | 12A
TKT0000002| 5001  | 1001     | 1        | 12B
TKT0000003| 5002  | 1002     | 1        | 15C
TKT0000004| 5003  | 1003     | 2        | 8A
```

**Relationships:**
- Many-to-One với `transaction` (vé thuộc giao dịch)
- Many-to-One với `passenger` (vé thuộc hành khách)
- Many-to-One với `flight` (vé cho chuyến bay)

**Business Rules:**
- Mỗi ghế trên một chuyến bay chỉ có thể được bán một lần
- Ticket ID format: `TKT` + 7 chữ số (ví dụ: `TKT0000001`)

---

## 🔗 Relationships Diagram

```
DEPARTMENT (1) ←─── (N) EMPLOYEE (1) ←─── (N) TRANSACTION
                                                      │
PASSENGER (1) ←─── (N) TICKET ←─── (N) ────────┘    │
              │                              │       │
              └─── (N) TRANSACTION ──────────┘       │
                                                      │
FLIGHT (1) ←─── (N) TICKET                           │
    │                                                │
    ├─── (N) → (1) AIRPORT (departure)              │
    ├─── (N) → (1) AIRPORT (arrival)                │
    ├─── (N) → (1) AIRPLANE                         │
    └─── (N) → (1) SHIFT
```

---

## 📊 Entity Relationship Summary

| From | To | Relationship Type | Foreign Key |
|------|-----|-------------------|-------------|
| EMPLOYEE | DEPARTMENT | Many-to-One | `employee.deptid` → `department.deptid` |
| EMPLOYEE | TRANSACTION | One-to-Many | `transaction.employeeid` → `employee.empid` |
| PASSENGER | TICKET | One-to-Many | `ticket.clientid` → `passenger.clientid` |
| PASSENGER | TRANSACTION | One-to-Many | `transaction.clientid` → `passenger.clientid` |
| FLIGHT | TICKET | One-to-Many | `ticket.flightid` → `flight.flightid` |
| FLIGHT | AIRPORT (dep) | Many-to-One | `flight.airport_dep` → `airport.airportid` |
| FLIGHT | AIRPORT (arr) | Many-to-One | `flight.airport_arr` → `airport.airportid` |
| FLIGHT | AIRPLANE | Many-to-One | `flight.airplaneid` → `airplane.airplaneid` |
| FLIGHT | SHIFT | Many-to-One | `flight.shiftid` → `shift.shiftid` |
| TRANSACTION | TICKET | One-to-Many | `ticket.buyid` → `transaction.achatid` |

---

## 🔍 Indexes

### Primary Key Indexes (Auto-generated)
- `department.deptid`
- `employee.empid`
- `passenger.clientid`
- `airport.airportid`
- `airplane.airplaneid`
- `shift.shiftid`
- `flight.flightid`
- `transaction.achatid`
- `ticket.ticketid`

### Foreign Key Indexes
- `idx_employee_deptid` trên `employee(deptid)`
- `idx_transaction_employeeid` trên `transaction(employeeid)`
- `idx_transaction_clientid` trên `transaction(clientid)`
- `idx_ticket_buyid` trên `ticket(buyid)`
- `idx_ticket_clientid` trên `ticket(clientid)`
- `idx_ticket_flightid` trên `ticket(flightid)`

### Performance Indexes
- `idx_employee_email` trên `employee(email)` - UNIQUE
- `idx_passenger_email` trên `passenger(email)`
- `idx_passenger_name` trên `passenger(firstname, lastname)`
- `idx_flight_flightnum` trên `flight(flightnum)`
- `idx_flight_flightdate` trên `flight(flight_date)`
- `idx_flight_airports` trên `flight(airport_dep, airport_arr)`
- `idx_ticket_seatnum` trên `ticket(seatnum)`

### Unique Constraints
- `employee(email)` - UNIQUE
- `ticket(flightid, seatnum)` - UNIQUE (composite)

---

## 💾 Sample Data Overview

### Department: 9 records
- CEO, Flight Crew, Ground Crew, Maintenance Crew, HR, IT, Sales, Legal, Schedule

### Employee: 5 records
- EMP00001 - EMP00005 (Sales, HR, IT departments)

### Passenger: 8 records
- Client IDs: 1001 - 1008
- Mostly from Paris, France

### Airport: 5 records
- CDG (Paris), FCO (Rome), LHR (London), JFK (New York), NRT (Tokyo)

### Airplane: 5 records
- BOEING01, BOEING02, AIRBUS01, AIRBUS02, BOEING03
- Types: 737-800, 737-900, A320, A321, 787-8

### Shift: 5 records
- Dates: 2025-11-15 to 2025-11-17
- Two shifts per day

### Flight: 5 records
- Flight numbers: CB1104, CB1105, CB2204, CB2205, CB3304
- Routes: CDG↔FCO, CDG↔LHR, CDG→JFK

### Transaction: 3 records
- Transaction IDs: 5001, 5002, 5003
- Prices: €241.98, €120.99, €362.97

### Ticket: 6 records
- Ticket IDs: TKT0000001 - TKT0000006
- Seats: 12A, 12B, 15C, 8A, 8B, 8C

---

## 📝 SQL Scripts

### Create Schema
File: `backend/src/main/resources/schema.sql`

### Insert Sample Data
File: `backend/src/main/resources/data.sql`

### Quick Reference Queries

#### 1. Lấy tất cả vé của một khách hàng
```sql
SELECT t.ticketid, t.seatnum, f.flightnum, f.flight_date, 
       f.airport_dep, f.airport_arr
FROM ticket t
JOIN flight f ON t.flightid = f.flightid
WHERE t.clientid = 1001;
```

#### 2. Đếm số ghế còn trống của một chuyến bay
```sql
SELECT 
    f.flightid,
    f.flightnum,
    a.num_seats AS total_seats,
    COUNT(t.ticketid) AS booked_seats,
    (a.num_seats - COUNT(t.ticketid)) AS available_seats
FROM flight f
JOIN airplane a ON f.airplaneid = a.airplaneid
LEFT JOIN ticket t ON f.flightid = t.flightid
WHERE f.flightid = 1
GROUP BY f.flightid, f.flightnum, a.num_seats;
```

#### 3. Lấy thông tin đầy đủ của một vé
```sql
SELECT 
    t.ticketid,
    t.seatnum,
    p.firstname || ' ' || p.lastname AS passenger_name,
    f.flightnum,
    f.flight_date,
    f.dep_time,
    f.arr_time,
    adep.name AS departure_airport,
    aarr.name AS arrival_airport,
    tr.price,
    tr.purchase_date
FROM ticket t
JOIN passenger p ON t.clientid = p.clientid
JOIN flight f ON t.flightid = f.flightid
JOIN airport adep ON f.airport_dep = adep.airportid
JOIN airport aarr ON f.airport_arr = aarr.airportid
JOIN transaction tr ON t.buyid = tr.achatid
WHERE t.ticketid = 'TKT0000001';
```

#### 4. Lấy doanh thu theo nhân viên
```sql
SELECT 
    e.empid,
    e.firstname || ' ' || e.lastname AS employee_name,
    COUNT(tr.achatid) AS total_transactions,
    SUM(tr.price) AS total_revenue
FROM employee e
LEFT JOIN transaction tr ON e.empid = tr.employeeid
GROUP BY e.empid, e.firstname, e.lastname
ORDER BY total_revenue DESC;
```

#### 5. Tìm chuyến bay còn chỗ
```sql
SELECT 
    f.flightid,
    f.flightnum,
    f.flight_date,
    f.dep_time,
    f.arr_time,
    adep.city || ' (' || adep.airportid || ')' AS departure,
    aarr.city || ' (' || aarr.airportid || ')' AS arrival,
    a.num_seats - COALESCE(COUNT(t.ticketid), 0) AS available_seats
FROM flight f
JOIN airplane a ON f.airplaneid = a.airplaneid
JOIN airport adep ON f.airport_dep = adep.airportid
JOIN airport aarr ON f.airport_arr = aarr.airportid
LEFT JOIN ticket t ON f.flightid = t.flightid
WHERE f.flight_date >= CURRENT_DATE
GROUP BY f.flightid, f.flightnum, f.flight_date, f.dep_time, f.arr_time, 
         adep.city, adep.airportid, aarr.city, aarr.airportid, a.num_seats
HAVING (a.num_seats - COUNT(t.ticketid)) > 0
ORDER BY f.flight_date, f.dep_time;
```

---

## 🔐 Security Notes

1. **Password Storage:** Employee passwords không được lưu trong bảng `employee`. Passwords được mã hóa và lưu riêng.

2. **Data Privacy:** Thông tin cá nhân (email, telephone) cần được bảo vệ theo GDPR.

3. **Transaction Integrity:** Tất cả vé trong một giao dịch phải được tạo trong cùng một transaction. Nếu có lỗi, rollback toàn bộ.

---

## 📈 Statistics

### Current Data Counts:
- **Departments:** 9
- **Employees:** 5
- **Passengers:** 8
- **Airports:** 5
- **Airplanes:** 5
- **Shifts:** 5
- **Flights:** 5
- **Transactions:** 3
- **Tickets:** 6

### Capacity:
- **Total Seats Available:** Sum of all `airplane.num_seats`
- **Total Tickets Sold:** COUNT(`ticket`)
- **Average Transaction Value:** AVG(`transaction.price`)

---

## 🔄 Database Maintenance

### Backup Command:
```sql
pg_dump -U admin -d airlines > backup_$(date +%Y%m%d).sql
```

### Restore Command:
```sql
psql -U admin -d airlines < backup_20251102.sql
```

### Vacuum (PostgreSQL):
```sql
VACUUM ANALYZE;
```

---

## 📚 Additional Resources

- **ERD Diagram:** Xem `erd/ERD.mmd` hoặc `erd/ERD.png`
- **Schema SQL:** `backend/src/main/resources/schema.sql`
- **Data SQL:** `backend/src/main/resources/data.sql`
- **Entity Models:** Java entities trong `backend/src/main/java/com/airlines/entity/`

---

**Last Updated:** 2025-11-02  
**Database Version:** 1.0.0  
**Maintainer:** COBOL Airlines Development Team

