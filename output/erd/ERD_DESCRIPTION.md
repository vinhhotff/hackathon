# Entity Relationship Diagram (ERD) Description
## COBOL Airlines System

This document describes the Entity Relationship Diagram for the COBOL Airlines System database schema.

---

## Entities and Attributes

### 1. EMPLOYEE
**Primary Key:** `empid` (VARCHAR(8))  
**Foreign Keys:** `deptid` → DEPARTMENT.deptid

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| empid | VARCHAR | 8 | PK, NOT NULL | Employee ID |
| firstname | VARCHAR | 30 | NOT NULL | First name |
| lastname | VARCHAR | 30 | NOT NULL | Last name |
| address | VARCHAR | 100 | NOT NULL | Address |
| city | VARCHAR | 50 | NOT NULL | City |
| zipcode | VARCHAR | 15 | NOT NULL | Zip code |
| telephone | VARCHAR | 10 | NOT NULL | Phone number |
| email | VARCHAR | 100 | NOT NULL, UNIQUE | Email address |
| admin_date | DATE | | NOT NULL | Admission date |
| salary | DECIMAL | 8,2 | NOT NULL | Salary |
| deptid | INTEGER | | FK, NOT NULL | Department ID |

**Relationships:**
- Many-to-One with DEPARTMENT (via deptid)
- One-to-Many with TRANSACTION (employee creates transactions)

---

### 2. DEPARTMENT
**Primary Key:** `deptid` (INTEGER)  
**Foreign Keys:** `empid_director` → EMPLOYEE.empid (nullable)

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| deptid | INTEGER | | PK, NOT NULL | Department ID |
| name | VARCHAR | 50 | NOT NULL | Department name |
| empid_director | VARCHAR | 8 | FK, NULLABLE | Director employee ID |

**Relationships:**
- One-to-Many with EMPLOYEE (department has employees)
- One-to-One with EMPLOYEE (director) - optional

---

### 3. PASSENGER
**Primary Key:** `clientid` (INTEGER, AUTO_INCREMENT)

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| clientid | INTEGER | | PK, NOT NULL, SERIAL | Client ID |
| firstname | VARCHAR | 30 | NOT NULL | First name |
| lastname | VARCHAR | 30 | NOT NULL | Last name |
| address | VARCHAR | 250 | NOT NULL | Address |
| city | VARCHAR | 50 | NOT NULL | City |
| country | VARCHAR | 30 | NOT NULL | Country |
| zipcode | VARCHAR | 15 | NOT NULL | Zip code |
| telephone | VARCHAR | 18 | NOT NULL | Phone number |
| email | VARCHAR | 100 | NOT NULL | Email address |

**Relationships:**
- One-to-Many with TICKET (passenger owns tickets)
- One-to-Many with TRANSACTION (passenger makes transactions)

---

### 4. FLIGHT
**Primary Key:** `flightid` (INTEGER, AUTO_INCREMENT)  
**Foreign Keys:** 
- `shiftid` → SHIFT.shiftid
- `airplaneid` → AIRPLANE.airplaneid
- `airport_dep` → AIRPORT.airportid
- `airport_arr` → AIRPORT.airportid

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| flightid | INTEGER | | PK, NOT NULL, SERIAL | Flight ID |
| flight_date | DATE | | NOT NULL | Flight date |
| dep_time | TIME | | NOT NULL | Departure time |
| arr_time | TIME | | NOT NULL | Arrival time |
| tot_pass | INTEGER | | NOT NULL | Total passengers |
| tot_baggage | INTEGER | | NOT NULL | Total baggage count |
| flightnum | VARCHAR | 6 | NOT NULL | Flight number |
| shiftid | INTEGER | | FK, NOT NULL | Shift ID |
| airplaneid | VARCHAR | 8 | FK, NOT NULL | Airplane ID |
| airport_dep | VARCHAR | 4 | FK, NOT NULL | Departure airport code |
| airport_arr | VARCHAR | 4 | FK, NOT NULL | Arrival airport code |

**Relationships:**
- One-to-Many with TICKET (flight has tickets)
- Many-to-One with AIRPORT (departure airport)
- Many-to-One with AIRPORT (arrival airport)
- Many-to-One with AIRPLANE
- Many-to-One with SHIFT

**Calculated Fields:**
- `available_seats` = AIRPLANE.num_seats - COUNT(TICKET WHERE flightid = FLIGHT.flightid)

---

### 5. TICKET
**Primary Key:** `ticketid` (VARCHAR(10))  
**Foreign Keys:**
- `buyid` → TRANSACTION.achatid
- `clientid` → PASSENGER.clientid
- `flightid` → FLIGHT.flightid

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| ticketid | VARCHAR | 10 | PK, NOT NULL | Ticket ID |
| buyid | INTEGER | | FK, NOT NULL | Transaction ID |
| clientid | INTEGER | | FK, NOT NULL | Client ID |
| flightid | INTEGER | | FK, NOT NULL | Flight ID |
| seatnum | VARCHAR | 3 | NOT NULL | Seat number |

**Relationships:**
- Many-to-One with TRANSACTION (ticket belongs to transaction)
- Many-to-One with PASSENGER (ticket belongs to passenger)
- Many-to-One with FLIGHT (ticket for flight)

**Unique Constraints:**
- (flightid, seatnum) - Each seat on a flight is unique

---

### 6. TRANSACTION (ACHAT)
**Primary Key:** `achatid` (INTEGER, AUTO_INCREMENT)  
**Foreign Keys:**
- `employeeid` → EMPLOYEE.empid
- `clientid` → PASSENGER.clientid

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| achatid | INTEGER | | PK, NOT NULL, SERIAL | Transaction ID |
| purchase_date | DATE | | NOT NULL | Purchase date |
| purchase_time | TIME | | NOT NULL | Purchase time |
| price | DECIMAL | 7,2 | NOT NULL | Total price |
| employeeid | VARCHAR | 8 | FK, NOT NULL | Employee ID |
| clientid | INTEGER | | FK, NOT NULL | Client ID |

**Relationships:**
- Many-to-One with EMPLOYEE (employee creates transaction)
- Many-to-One with PASSENGER (passenger makes transaction)
- One-to-Many with TICKET (transaction contains tickets)

---

### 7. AIRPORT
**Primary Key:** `airportid` (VARCHAR(4))

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| airportid | VARCHAR | 4 | PK, NOT NULL | Airport code (IATA) |
| name | VARCHAR | 100 | NOT NULL | Airport name |
| address | VARCHAR | 250 | NOT NULL | Airport address |
| city | VARCHAR | 30 | NOT NULL | City |
| country | VARCHAR | 30 | NOT NULL | Country |
| zipcode | VARCHAR | 15 | NOT NULL | Zip code |

**Relationships:**
- One-to-Many with FLIGHT (airport as departure)
- One-to-Many with FLIGHT (airport as arrival)

---

### 8. AIRPLANE (AVION)
**Primary Key:** `airplaneid` (VARCHAR(8))

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| airplaneid | VARCHAR | 8 | PK, NOT NULL | Airplane ID |
| type | VARCHAR | 8 | NOT NULL | Airplane type |
| num_seats | INTEGER | | NOT NULL | Number of seats |
| fuel_capacity | INTEGER | | NOT NULL | Fuel capacity |

**Relationships:**
- One-to-Many with FLIGHT (airplane used in flights)

---

### 9. CREW (EQUIPE)
**Primary Key:** `equipeid` (INTEGER, AUTO_INCREMENT)

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| equipeid | INTEGER | | PK, NOT NULL, SERIAL | Crew ID |
| captain | INTEGER | | | Captain employee ID |
| copilot | INTEGER | | | Co-pilot employee ID |
| fa1 | INTEGER | | | Flight attendant 1 |
| fa2 | INTEGER | | | Flight attendant 2 |
| fa3 | INTEGER | | | Flight attendant 3 |
| fa4 | INTEGER | | | Flight attendant 4 |

**Relationships:**
- One-to-Many with SHIFT (crew assigned to shifts)

---

### 10. SHIFT
**Primary Key:** `shiftid` (INTEGER, AUTO_INCREMENT)  
**Foreign Keys:** `equipeid` → CREW.equipeid

| Attribute | Type | Size | Constraints | Description |
|-----------|------|------|--------------|-------------|
| shiftid | INTEGER | | PK, NOT NULL, SERIAL | Shift ID |
| shift_date | DATE | | NOT NULL | Shift date |
| start_time | TIME | | NOT NULL | Start time |
| end_time | TIME | | NOT NULL | End time |
| equipeid | INTEGER | | FK, NOT NULL | Crew ID |

**Relationships:**
- Many-to-One with CREW (shift uses crew)
- One-to-Many with FLIGHT (shift has flights)

---

## Relationship Summary

| Relationship | Type | Description |
|--------------|------|-------------|
| EMPLOYEE ↔ DEPARTMENT | Many-to-One | Employee belongs to one department |
| EMPLOYEE ↔ TRANSACTION | One-to-Many | Employee creates many transactions |
| PASSENGER ↔ TICKET | One-to-Many | Passenger owns many tickets |
| PASSENGER ↔ TRANSACTION | One-to-Many | Passenger makes many transactions |
| FLIGHT ↔ TICKET | One-to-Many | Flight has many tickets |
| FLIGHT ↔ AIRPORT (dep) | Many-to-One | Flight departs from one airport |
| FLIGHT ↔ AIRPORT (arr) | Many-to-One | Flight arrives at one airport |
| FLIGHT ↔ AIRPLANE | Many-to-One | Flight uses one airplane |
| FLIGHT ↔ SHIFT | Many-to-One | Flight belongs to one shift |
| SHIFT ↔ CREW | Many-to-One | Shift uses one crew |
| TRANSACTION ↔ TICKET | One-to-Many | Transaction contains many tickets |

---

## Indexes

### Primary Indexes
- All primary keys are automatically indexed

### Foreign Key Indexes
- `employee.deptid` → department.deptid
- `ticket.buyid` → transaction.achatid
- `ticket.clientid` → passenger.clientid
- `ticket.flightid` → flight.flightid
- `transaction.employeeid` → employee.empid
- `transaction.clientid` → passenger.clientid
- `flight.shiftid` → shift.shiftid
- `flight.airplaneid` → airplane.airplaneid
- `flight.airport_dep` → airport.airportid
- `flight.airport_arr` → airport.airportid
- `shift.equipeid` → crew.equipeid

### Additional Indexes (Recommended)
- `employee.email` (UNIQUE)
- `flight.flightnum`
- `flight.flight_date`
- `ticket.seatnum`
- `(flight.flightid, ticket.seatnum)` (UNIQUE composite)
- `passenger.email`
- `passenger.lastname`

---

## Notes

1. **Seat Uniqueness**: The combination of (flightid, seatnum) must be unique to prevent double booking.

2. **Available Seats Calculation**: This is a calculated field, not stored. It should be computed as:
   ```sql
   available_seats = airplane.num_seats - COUNT(tickets WHERE flightid = flight.flightid)
   ```

3. **Transaction Integrity**: When creating a booking, all tickets must be created in the same transaction. If any ticket creation fails, the entire booking must be rolled back.

4. **Password Storage**: Employee passwords are stored separately in a secure table (not shown in this ERD) with encrypted passwords.

5. **Airport Dual Role**: The AIRPORT entity is used twice in FLIGHT (departure and arrival), but both reference the same table.

---

**End of ERD Description**

