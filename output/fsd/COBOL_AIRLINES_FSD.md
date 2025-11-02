# Functional Specification Document (FSD)
## COBOL Airlines System - Modernized Version

**Version:** 1.0  
**Date:** 2025-11-02  
**Platform:** Spring Boot + React + PostgreSQL  
**Source:** Reverse-engineered from COBOL-AIRLINES system

---

## Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Use Cases](#use-cases)
4. [Data Model](#data-model)
5. [Business Rules](#business-rules)
6. [User Interfaces](#user-interfaces)
7. [API Specifications](#api-specifications)

---

## 1. Introduction

### 1.1 Purpose
This document describes the functional requirements for the COBOL Airlines System, modernized from the legacy COBOL/CICS/DB2 system to a contemporary Spring Boot + React + PostgreSQL architecture.

### 1.2 Scope
The system manages airline operations including:
- Employee authentication and role-based access
- Flight search and management
- Passenger management
- Ticket booking and sales
- Payment processing
- Reporting and printing

### 1.3 Definitions and Acronyms
- **FSD**: Functional Specification Document
- **API**: Application Programming Interface
- **REST**: Representational State Transfer
- **JWT**: JSON Web Token
- **UUID**: Universally Unique Identifier

---

## 2. System Overview

### 2.1 System Architecture
- **Frontend**: React.js (Single Page Application)
- **Backend**: Spring Boot (RESTful API)
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication
- **File Processing**: JSON/XML import capabilities

### 2.2 Key Features
1. Role-based access control (RBAC)
2. Flight search with multiple criteria
3. Ticket booking and management
4. Passenger information management
5. Employee administration
6. Reporting and document generation

---

## 3. Use Cases

### 3.1 UC-001: User Login

**Actor:** Employee  
**Preconditions:** User has valid employee credentials  
**Postconditions:** User is authenticated and redirected based on department

#### Flow:
1. User enters USERID (8 characters) and PASSWORD (8 characters)
2. System validates credentials:
   - Checks if USERID exists in EMPLO table
   - Encrypts password using custom algorithm (based on USERID + ADMIDATE)
   - Compares encrypted password with stored value
3. If valid:
   - System retrieves DEPTID
   - Generates JWT token with user info
   - Routes user based on department (see Business Rules RULE_003)
4. If invalid:
   - Display error message: "PASSWORD OR USERID INCORRECT"

#### Input Fields:
| Field | Type | Length | Required | Validation |
|-------|------|--------|----------|------------|
| USERID | String | 8 | Yes | Alphanumeric |
| PASSWORD | String | 8 | Yes | Alphanumeric |

#### Output:
- JWT Token
- User Profile (EMPID, FIRSTNAME, LASTNAME, DEPTID)
- Department-based navigation menu

#### Business Rules:
- **RULE_001**: Password encryption uses custom algorithm
- **RULE_003**: Department routing (1=CEO, 2-4=Crew, 5=HR, 6=IT, 7=Sales, 8=Lawyer, 9=Schedule)

---

### 3.2 UC-002: Search Flights

**Actor:** Sales Employee, Customer (potential)  
**Preconditions:** User is authenticated  
**Postconditions:** List of flights matching criteria is displayed

#### Flow:
1. User enters search criteria (one or more):
   - FLIGHTNUM (optional)
   - FLIGHTDATE (optional, format: YYYY-MM-DD)
   - AIRPORTDEP (optional, 4-character airport code)
   - AIRPORTARR (optional, 4-character airport code)
2. System validates date format (RULE_004)
3. System queries FLIGHT table based on provided criteria
4. Returns maximum 10 flight records per page
5. Displays: FLIGHTNUM, FLIGHTDATE, DEPTIME, ARRTIME, AIRPORTDEP, AIRPORTARR, TOTPASS

#### Search Criteria Combinations:
- FLIGHTNUM only
- FLIGHTDATE only
- FLIGHTDATE + FLIGHTNUM
- FLIGHTDATE + AIRPORTDEP
- FLIGHTDATE + AIRPORTARR
- FLIGHTDATE + AIRPORTDEP + AIRPORTARR

#### Input Fields:
| Field | Type | Format | Required | Validation |
|-------|------|--------|----------|------------|
| FLIGHTNUM | String | 6 chars | No | Alphanumeric |
| FLIGHTDATE | Date | YYYY-MM-DD | No | Valid date format |
| AIRPORTDEP | String | 4 chars | No | Airport code exists |
| AIRPORTARR | String | 4 chars | No | Airport code exists |

#### Output:
Array of Flight objects (max 10):
```json
{
  "flightId": 123,
  "flightNum": "CB1104",
  "flightDate": "2025-11-15",
  "depTime": "10:00:00",
  "arrTime": "12:30:00",
  "airportDep": "CDG",
  "airportArr": "FCO",
  "availableSeats": 45
}
```

#### Business Rules:
- **RULE_004**: Date format validation (YYYY-MM-DD)
- **RULE_011**: SQL error handling with user-friendly messages

---

### 3.3 UC-003: Search Tickets

**Actor:** Sales Employee  
**Preconditions:** User is authenticated  
**Postconditions:** Ticket information is displayed

#### Flow:
1. User enters at least ONE of:
   - TICKETID (10 characters)
   - CLIENTID (integer)
   - FIRSTNAME + LASTNAME
2. Optional additional filters:
   - FLIGHTNUM
   - FLIGHTDATE
3. System validates search criteria (RULE_008)
4. Queries TICKET table with JOIN to PASSENGERS and FLIGHT
5. Returns paginated results (20 records per page)
6. Supports pagination: Previous (F10), Next (F11)
7. Supports print function (F12)

#### Minimum Search Criteria (RULE_008):
Must have at least one of:
- TICKETID, OR
- CLIENTID, OR
- (FIRSTNAME + LASTNAME)

#### Input Fields:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| TICKETID | String(10) | No* | Alphanumeric |
| CLIENTID | Integer | No* | Positive number |
| FIRSTNAME | String(30) | No* | Text |
| LASTNAME | String(30) | No* | Text |
| FLIGHTNUM | String(6) | No | Alphanumeric |
| FLIGHTDATE | Date | No | YYYY-MM-DD |

*At least one identifier field is required

#### Output:
Paginated list of Ticket details (max 20 per page):
```json
{
  "tickets": [
    {
      "ticketId": "TKT0000001",
      "seatNum": "12A",
      "passenger": {
        "clientId": 1001,
        "firstName": "John",
        "lastName": "Doe"
      },
      "flight": {
        "flightId": 123,
        "flightNum": "CB1104",
        "flightDate": "2025-11-15",
        "depTime": "10:00:00",
        "arrTime": "12:30:00",
        "airportDep": "CDG",
        "airportArr": "FCO"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 25
  }
}
```

#### Business Rules:
- **RULE_008**: Search validation - minimum criteria required
- **RULE_012**: Pagination support
- **RULE_011**: Error handling

---

### 3.4 UC-004: Sell Ticket (Booking)

**Actor:** Sales Employee  
**Preconditions:** User is authenticated, Flight and Passenger exist  
**Postconditions:** Ticket is created, Purchase record is created, Flight available seats are updated

#### Two-Step Process:

##### Step 1: Search and Validate
1. Employee enters:
   - CLIENTID (required, numeric, > 0)
   - FLIGHTNUM (required, not empty)
   - FLIGHTDATE (required, format: YYYY-MM-DD)
   - PASSENGER_COUNT (required, numeric, > 0)
2. System validates:
   - **RULE_005**: CLIENTID is numeric and > 0
   - **RULE_006**: FLIGHTNUM is not empty
   - **RULE_004**: FLIGHTDATE format is YYYY-MM-DD
   - **RULE_007**: PASSENGER_COUNT is numeric and > 0
3. System verifies:
   - Passenger exists in PASSENGERS table
   - Flight exists in FLIGHT table
   - Flight has sufficient available seats
4. System calculates:
   - **RULE_002**: TOTAL_PRICE = UNIT_PRICE × PASSENGER_COUNT
   - Current unit price: 120.99 EUR (to be moved to pricing service)
5. Displays flight details and pricing

##### Step 2: Confirm and Create
1. Employee confirms booking details
2. System creates:
   - Purchase record (ACHAT/Transaction) with:
     - Purchase date/time
     - Total price
     - Employee ID
     - Client ID
   - Ticket record(s) for each passenger with:
     - Ticket ID (generated)
     - Seat assignment
     - Flight ID
     - Client ID
     - Purchase ID (BUYID)
3. System updates:
   - Flight available seats (TOTPASS decremented)
4. Generates receipt

#### Input Fields - Step 1:
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| CLIENTID | Integer | Yes | Numeric, > 0 |
| FLIGHTNUM | String(6) | Yes | Not empty |
| FLIGHTDATE | Date | Yes | YYYY-MM-DD format |
| PASSENGER_COUNT | Integer | Yes | Numeric, > 0 |

#### Input Fields - Step 2:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| passengerDetails | Array | Yes | Array of passenger info for each seat |
| seatAssignments | Array | Yes | Seat numbers for each passenger |
| paymentMethod | String | Yes | Payment method (CARD/CASH/CHECK) |

#### Output:
```json
{
  "transactionId": 5001,
  "tickets": [
    {
      "ticketId": "TKT0000002",
      "seatNum": "12A",
      "passengerId": 1001
    }
  ],
  "totalPrice": 241.98,
  "receiptUrl": "/api/receipts/5001"
}
```

#### Business Rules:
- **RULE_002**: Price calculation (TOTAL_PRICE = UNIT_PRICE × COUNT)
- **RULE_005**: Client ID validation
- **RULE_006**: Flight number validation
- **RULE_007**: Passenger count validation
- **RULE_014**: Workflow validation - must complete search before booking
- **NEW RULE**: Booking must check available seats before confirming
- **NEW RULE**: Seat assignment must be unique per flight

---

### 3.5 UC-005: Print Ticket

**Actor:** Sales Employee, Customer  
**Preconditions:** Ticket exists  
**Postconditions:** Ticket document is generated

#### Flow:
1. User requests ticket print via TICKETID or from booking confirmation
2. System retrieves ticket with full details:
   - Passenger information
   - Flight information
   - Seat assignment
   - Airport details
3. System formats ticket document
4. Returns PDF document or printable HTML

#### Output:
PDF/HTML Document with:
- Passenger name
- Seat number
- Flight number
- Departure/Arrival airports
- Flight date and time
- Ticket ID

#### Business Rules:
- Ticket must be valid (not cancelled)
- Passenger and flight must exist

---

### 3.6 UC-006: Print Receipt

**Actor:** Sales Employee  
**Preconditions:** Transaction exists  
**Postconditions:** Receipt document is generated

#### Flow:
1. System retrieves transaction details
2. Formats receipt with:
   - Transaction ID (BUYID)
   - Date and time
   - Total amount
   - Payment method
   - Company information
3. Returns PDF document

#### Output:
PDF Document with:
- Receipt number (BUYID)
- Date/time
- Amount (EUR)
- Payment method
- Ticket references

---

### 3.7 UC-007: Manage Employees

**Actor:** HR Employee, Admin  
**Preconditions:** User has HR or Admin role  
**Postconditions:** Employee records are created/updated

#### Sub-use cases:
- **UC-007a**: Import Employees from JSON
- **UC-007b**: Create Employee
- **UC-007c**: Update Employee
- **UC-007d**: View Employee List

#### UC-007a: Import Employees from JSON
1. Admin uploads JSON file with employee data
2. System validates JSON structure
3. For each employee:
   - Validates required fields
   - Encrypts password (RULE_001)
   - Stores encrypted password
   - Creates employee record
4. Returns import summary

#### Input Format (JSON):
```json
{
  "employees": [
    {
      "empId": "EMP00001",
      "firstName": "John",
      "lastName": "Doe",
      "address": "123 Main St",
      "city": "Paris",
      "zipCode": "75001",
      "telephone": "0123456789",
      "email": "john.doe@airlines.com",
      "adminDate": "2024-01-15",
      "salary": 50000.00,
      "deptId": 7,
      "password": "password123"
    }
  ]
}
```

#### Business Rules:
- **RULE_001**: Password encryption on import
- Employee ID must be unique
- Department must exist
- Email must be unique

---

### 3.8 UC-008: Manage Passengers

**Actor:** Sales Employee, Admin  
**Preconditions:** User is authenticated  
**Postconditions:** Passenger records are created/updated

#### Sub-use cases:
- **UC-008a**: Import Passengers from XML
- **UC-008b**: Create Passenger
- **UC-008c**: Update Passenger
- **UC-008d**: Search Passengers

#### UC-008a: Import Passengers from XML
1. Admin uploads XML file
2. System parses XML
3. For each passenger:
   - Calculates VARCHAR field lengths (RULE_009)
   - Validates data
   - Creates passenger record
4. Returns import summary

#### Business Rules:
- **RULE_009**: VARCHAR length calculation (trim spaces)
- CLIENTID is auto-generated (serial)
- Email validation

---

### 3.9 UC-009: Duplicate Flights for Month

**Actor:** Admin, Schedule Manager  
**Preconditions:** User has Admin or Schedule role  
**Postconditions:** Flight records duplicated for entire month

#### Flow:
1. Admin selects FLIGHTNUM and BASE_DATE
2. System retrieves flight template
3. System calculates days in month (RULE_010)
4. Creates flight records for each day of month
5. Returns summary of created flights

#### Business Rules:
- **RULE_010**: Month days calculation (handles leap years)
- Flight number must exist
- Dates must be in future or current month
- Avoid duplicate flight dates

---

## 4. Data Model

### 4.1 Entity Overview

#### Core Entities:
1. **Employee** (EMPLO) - Employee information
2. **Department** (DEPT) - Department/role definitions
3. **Flight** - Flight schedules and information
4. **Passenger** (PASSENGERS) - Customer information
5. **Ticket** - Booking records
6. **Transaction** (ACHAT) - Purchase records
7. **Airport** - Airport information
8. **Airplane** (AVION) - Aircraft information
9. **Crew** (EQUIPE) - Flight crew assignments
10. **Shift** - Work shift definitions

### 4.2 Entity Details

#### 4.2.1 Employee (EMPLO)
| Field | Type | Length | PK | FK | Not Null | Description |
|-------|------|--------|----|----|----------|-------------|
| EMPID | VARCHAR | 8 | Yes | | Yes | Employee ID |
| FIRSTNAME | VARCHAR | 30 | | | Yes | First name |
| LASTNAME | VARCHAR | 30 | | | Yes | Last name |
| ADDRE | VARCHAR | 100 | | | Yes | Address |
| CITY | VARCHAR | 50 | | | Yes | City |
| ZIPCODE | VARCHAR | 15 | | | Yes | Zip code |
| TELEPHONE | VARCHAR | 10 | | | Yes | Phone |
| EMAIL | VARCHAR | 100 | | | Yes | Email (unique) |
| ADMIDATE | DATE | | | | Yes | Admission date |
| SALARY | DECIMAL(8,2) | | | | Yes | Salary |
| DEPTID | INTEGER | | | DEPT | Yes | Department ID |

#### 4.2.2 Flight
| Field | Type | PK | FK | Not Null | Description |
|-------|------|----|----|----------|-------------|
| FLIGHTID | INTEGER | Yes | | Yes | Flight ID (serial) |
| FLIGHTDATE | DATE | | | Yes | Flight date |
| DEPTIME | TIME | | | Yes | Departure time |
| ARRTIME | TIME | | | Yes | Arrival time |
| TOTPASS | INTEGER | | | Yes | Total passengers |
| TOTBAGGA | INTEGER | | | Yes | Total baggage |
| FLIGHTNUM | VARCHAR(6) | | | Yes | Flight number |
| SHIFTID | INTEGER | | SHIFT | Yes | Shift ID |
| AIRPLANEID | VARCHAR(8) | | AVION | Yes | Airplane ID |
| AIRPORTDEP | VARCHAR(4) | | AIRPORT | Yes | Departure airport |
| AIRPORTARR | VARCHAR(4) | | AIRPORT | Yes | Arrival airport |

**Calculated Fields:**
- `availableSeats` = `AIRPLANE.NBRSIEGE` - `COUNT(TICKET WHERE FLIGHTID = FLIGHT.FLIGHTID)`

#### 4.2.3 Passenger (PASSENGERS)
| Field | Type | Length | PK | Not Null | Description |
|-------|------|--------|----|----------|-------------|
| CLIENTID | INTEGER | | Yes | Yes | Client ID (serial) |
| FIRSTNAME | VARCHAR | 30 | | Yes | First name |
| LASTNAME | VARCHAR | 30 | | Yes | Last name |
| ADDRESS | VARCHAR | 250 | | Yes | Address |
| CITY | VARCHAR | 50 | | Yes | City |
| COUNTRY | VARCHAR | 30 | | Yes | Country |
| ZIPCODE | VARCHAR | 15 | | Yes | Zip code |
| TELEPHONE | VARCHAR | 18 | | Yes | Phone |
| EMAIL | VARCHAR | 100 | | Yes | Email |

#### 4.2.4 Ticket
| Field | Type | Length | PK | FK | Not Null | Description |
|-------|------|--------|----|----|----------|-------------|
| TICKETID | VARCHAR | 10 | Yes | | Yes | Ticket ID |
| BUYID | INTEGER | | | ACHAT | Yes | Transaction ID |
| CLIENTID | INTEGER | | | PASSENGERS | Yes | Client ID |
| FLIGHTID | INTEGER | | | FLIGHT | Yes | Flight ID |
| SEATNUM | VARCHAR | 3 | | | Yes | Seat number |

#### 4.2.5 Transaction (ACHAT)
| Field | Type | PK | FK | Not Null | Description |
|-------|------|----|----|----------|-------------|
| ACHATID | INTEGER | Yes | | Yes | Transaction ID (serial) |
| ACHATDATE | DATE | | | Yes | Purchase date |
| ACHATHEURE | TIME | | | Yes | Purchase time |
| PRIX | DECIMAL(7,2) | | | Yes | Total price |
| EMPLOYEID | VARCHAR(8) | | EMPLO | Yes | Employee ID |
| CLIENTID | INTEGER | | PASSENGERS | Yes | Client ID |

### 4.3 Relationships

1. **Employee → Department**: Many-to-One (DEPTID)
2. **Ticket → Passenger**: Many-to-One (CLIENTID)
3. **Ticket → Flight**: Many-to-One (FLIGHTID)
4. **Ticket → Transaction**: Many-to-One (BUYID)
5. **Transaction → Employee**: Many-to-One (EMPLOYEID)
6. **Transaction → Passenger**: Many-to-One (CLIENTID)
7. **Flight → Airport (Departure)**: Many-to-One (AIRPORTDEP)
8. **Flight → Airport (Arrival)**: Many-to-One (AIRPORTARR)
9. **Flight → Airplane**: Many-to-One (AIRPLANEID)
10. **Flight → Shift**: Many-to-One (SHIFTID)
11. **Shift → Crew**: Many-to-One (EQUIPEID)

---

## 5. Business Rules

### 5.1 Authentication & Authorization

**RULE_001: Password Encryption**
- Passwords are encrypted using custom algorithm
- Encryption key is derived from USERID + ADMIDATE
- Encrypted passwords stored in separate secure storage
- Algorithm: `RANDOM(date) * 1000` used as base key
- Character-level encryption based on `MOD(position, 3)`

**RULE_003: Department Routing**
- Department ID determines user access:
  - **DEPTID 1**: CEO (full access)
  - **DEPTID 2-4**: Crew (limited access)
  - **DEPTID 5**: HR (employee management)
  - **DEPTID 6**: IT (system administration)
  - **DEPTID 7**: Sales (booking, ticket management)
  - **DEPTID 8**: Legal (documentation)
  - **DEPTID 9**: Scheduling (flight management)

### 5.2 Data Validation

**RULE_004: Date Format Validation**
- All dates must be in format: `YYYY-MM-DD`
- Validation checks:
  - Year (positions 1-4) is numeric
  - Month (positions 6-7) is numeric, range 01-12
  - Day (positions 9-10) is numeric, range 01-31
  - Separators (positions 5, 8) are hyphens '-'
- Error message: "WRONG DATE FORMAT, TRY TO INSERT DATE AS YYYY-MM-DD"

**RULE_005: Client ID Validation**
- CLIENTID must be numeric
- CLIENTID must be greater than 0
- Error message: "YOU MUST INSERT A NUMBER IN THE CLIENTID"

**RULE_006: Flight Number Validation**
- FLIGHTNUM cannot be empty/blank
- Error message: "YOU MUST INSERT A CORRECT FIGHT NUMBER"

**RULE_007: Passenger Count Validation**
- PASSENGER_COUNT must be numeric
- PASSENGER_COUNT must be greater than 0
- Error message: "YOU MUST INSERT A NUMBER IN THE NUMBER OF CLIENTS"

**RULE_008: Search Validation - Ticket**
- At least one identifier required:
  - TICKETID, OR
  - CLIENTID, OR
  - (FIRSTNAME + LASTNAME)
- Error message: "A VALIDE RESEARCHS MUST HAVE AT LEAST: TICKETID OR CLIENTID OR CLIENT'S FIRST AND LAST NAME"

### 5.3 Business Calculations

**RULE_002: Price Calculation**
- Formula: `TOTAL_PRICE = UNIT_PRICE × PASSENGER_COUNT`
- Current unit price: 120.99 EUR (hardcoded, should be moved to pricing service)
- Future enhancement: Dynamic pricing based on:
  - Flight route
  - Booking date proximity
  - Seat class
  - Seasonal factors

### 5.4 Data Processing

**RULE_009: VARCHAR Length Calculation**
- When importing data, calculate actual field length
- Algorithm: Count non-space characters
- `actualLength = MAX_LENGTH - spaceCount`
- Used for VARCHAR fields in PASSENGERS import

**RULE_010: Month Days Calculation**
- Month days table: `[31,28,31,30,31,30,31,31,30,31,30,31]`
- Used for flight duplication across month
- Handles leap years (February can be 28 or 29 days)

### 5.5 System Behavior

**RULE_011: SQL Error Handling**
- SQLCODE = 0: Success, continue processing
- SQLCODE = 100: No data found, display user-friendly message
- Other SQLCODE: System error, log details and display generic message
- Error message format: "COMMUNICATION ERROR BETWEEN SYSTEM AND DB, CALL IT DEPT"
- Include SQLCODE and SQLSTATE in logs

**RULE_012: Pagination**
- Search results paginated: 20 records per page for tickets
- Navigation: Previous (F10/button), Next (F11/button)
- Validation:
  - Previous: Check if currentPage > 1
  - Next: Check if currentPage < totalPages
- Display: "Page X of Y"

**RULE_013: Time Adjustment**
- Display time adjusted for timezone (UTC+1)
- Logic: If hour = 23, set to 00; else add 1 hour
- Used in all time displays

**RULE_014: Sell Workflow Validation**
- User must complete flight/passenger search before booking
- Flag: `WS-FLAG-MOUV = 'Y'` indicates valid search completed
- Error message: "YOU NEED TO MAKE A VAIBLE REASEARC BEFORE GO TO THE SELL SCREEN"

### 5.6 Booking Rules

**NEW RULE_015: Seat Availability Check**
- Before booking, verify: `availableSeats >= passengerCount`
- Available seats = `airplaneCapacity - bookedSeats`
- If insufficient: Reject booking with message "Not enough seats available"

**NEW RULE_016: Seat Assignment Uniqueness**
- Each seat on a flight can only be assigned once
- Check: No existing ticket with same FLIGHTID + SEATNUM
- Error message: "Seat already occupied"

**NEW RULE_017: Transaction Integrity**
- All tickets in a booking must be created in same transaction
- If any ticket creation fails, rollback entire booking
- Update flight available seats atomically

---

## 6. User Interfaces

### 6.1 Login Screen

**Layout:**
```
┌─────────────────────────────────────┐
│     COBOL AIRLINES LOGIN PAGE       │
│                                     │
│  USERID:   [________]              │
│  PASSWORD: [________]              │
│                                     │
│  [Login Button]                     │
│                                     │
│  Message: [Status message here]    │
└─────────────────────────────────────┘
```

**Fields:**
- USERID: Text input, 8 characters max, required
- PASSWORD: Password input, 8 characters max, required

**Actions:**
- Login button: Validate and authenticate

**Messages:**
- Success: Redirect to dashboard
- Error: "PASSWORD OR USERID INCORRECT"

### 6.2 Flight Search Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  Search Flights                     │
│                                     │
│  Flight Number: [______]            │
│  Date:         [YYYY-MM-DD]        │
│  Departure:    [____]              │
│  Arrival:      [____]              │
│                                     │
│  [Search Button]                    │
│                                     │
│  Results:                           │
│  ┌───────────────────────────────┐ │
│  │ FID   TDEP  TLAND DEP LAND    │ │
│  │ CB1104 10:00 12:30 CDG FCO    │ │
│  │ ...                           │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Features:**
- Multi-criteria search
- Results table with pagination
- Click flight to view details or book

### 6.3 Booking Screen (Step 1)

**Layout:**
```
┌─────────────────────────────────────┐
│  Book Flight                         │
│                                     │
│  Client ID:    [______]            │
│  Flight Number:[______]            │
│  Date:         [YYYY-MM-DD]        │
│  Passengers:   [_]                  │
│                                     │
│  [Search Button]                    │
│                                     │
│  Flight Details:                    │
│  [Display after search]             │
│                                     │
│  Price: €120.99                     │
│  Total: €241.98                     │
│                                     │
│  [Continue to Step 2]                │
└─────────────────────────────────────┘
```

### 6.4 Booking Screen (Step 2)

**Layout:**
```
┌─────────────────────────────────────┐
│  Confirm Booking                     │
│                                     │
│  Passenger Information:             │
│  [For each passenger              │
│   - Name: ...                       │
│   - Seat: ...]                      │
│                                     │
│  Payment Method:                    │
│  ( ) Card  ( ) Cash  ( ) Check      │
│                                     │
│  [Confirm Booking] [Cancel]         │
└─────────────────────────────────────┘
```

### 6.5 Ticket Search Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  Search Tickets                     │
│                                     │
│  Ticket ID:    [__________]         │
│  Client ID:    [______]            │
│  First Name:   [____________]      │
│  Last Name:    [____________]      │
│  Flight ID:    [______]            │
│  Date:         [YYYY-MM-DD]        │
│                                     │
│  [Search] [Print]                  │
│                                     │
│  Results:                           │
│  [Paginated table with ticket info] │
│  [< Previous] [Next >]             │
└─────────────────────────────────────┘
```

---

## 7. API Specifications

See `output/api/OpenAPI.yaml` for complete API documentation.

### 7.1 Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### 7.2 Flight Endpoints
- `GET /api/flights` - Search flights
- `GET /api/flights/{id}` - Get flight details
- `POST /api/flights` - Create flight (Admin)
- `PUT /api/flights/{id}` - Update flight (Admin)
- `POST /api/flights/{id}/duplicate-month` - Duplicate flights for month

### 7.3 Ticket Endpoints
- `GET /api/tickets` - Search tickets
- `GET /api/tickets/{id}` - Get ticket details
- `POST /api/tickets` - Create booking
- `GET /api/tickets/{id}/print` - Print ticket

### 7.4 Passenger Endpoints
- `GET /api/passengers` - Search passengers
- `GET /api/passengers/{id}` - Get passenger details
- `POST /api/passengers` - Create passenger
- `PUT /api/passengers/{id}` - Update passenger
- `POST /api/passengers/import-xml` - Import from XML

### 7.5 Employee Endpoints
- `GET /api/employees` - List employees
- `GET /api/employees/{id}` - Get employee details
- `POST /api/employees` - Create employee (HR)
- `PUT /api/employees/{id}` - Update employee (HR)
- `POST /api/employees/import-json` - Import from JSON

### 7.6 Transaction Endpoints
- `GET /api/transactions/{id}` - Get transaction details
- `GET /api/transactions/{id}/receipt` - Print receipt

---

## Appendix A: Error Codes

| Code | Message | Description |
|------|---------|-------------|
| ERR_001 | Invalid credentials | Login failed |
| ERR_002 | Invalid date format | Date must be YYYY-MM-DD |
| ERR_003 | Invalid client ID | Client ID must be numeric and > 0 |
| ERR_004 | Flight not found | Flight does not exist |
| ERR_005 | Passenger not found | Passenger does not exist |
| ERR_006 | Insufficient seats | Not enough available seats |
| ERR_007 | Seat already occupied | Seat is already booked |
| ERR_008 | Invalid search criteria | At least one search field required |
| ERR_009 | Database error | System error, contact IT |

---

## Appendix B: Data Migration Notes

### Legacy to Modern Mapping:
- **AS-400 DDS → PostgreSQL**: Entity names converted to lowercase, snake_case
- **DB2 → PostgreSQL**: Direct mapping with type conversions
- **CHAR/VARCHAR**: PostgreSQL VARCHAR
- **DECIMAL**: PostgreSQL DECIMAL
- **DATE/TIME**: PostgreSQL DATE/TIME
- **Packed Decimal (COMP-3)**: PostgreSQL NUMERIC

### Password Migration:
- Legacy encrypted passwords need re-encryption
- New system uses bcrypt for password hashing
- Migration script required to convert legacy passwords

---

**Document End**

