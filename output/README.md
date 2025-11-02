# COBOL Airlines System - Modernization Documentation

This directory contains all documentation and specifications for modernizing the COBOL Airlines System from legacy COBOL/CICS/DB2 to Spring Boot + React + PostgreSQL.

---

## 📁 Directory Structure

```
output/
├── README.md                    # This file
├── reverse_spec.json            # Reverse-engineered system specification (source)
├── fsd/
│   └── COBOL_AIRLINES_FSD.md    # Functional Specification Document
├── erd/
│   ├── ERD.mmd                  # Mermaid ERD diagram (text format)
│   └── ERD_DESCRIPTION.md       # ERD detailed description
└── api/
    └── OpenAPI.yaml             # OpenAPI 3.0 specification
```

---

## 📘 Functional Specification Document (FSD)

**Location:** `fsd/COBOL_AIRLINES_FSD.md`

### Contents:
- System Overview
- Complete Use Cases (9 use cases):
  - UC-001: User Login
  - UC-002: Search Flights
  - UC-003: Search Tickets
  - UC-004: Sell Ticket (Booking)
  - UC-005: Print Ticket
  - UC-006: Print Receipt
  - UC-007: Manage Employees
  - UC-008: Manage Passengers
  - UC-009: Duplicate Flights for Month
- Data Model (10 entities)
- Business Rules (14 rules)
- User Interface Specifications
- API Endpoints Overview

### Usage:
This document serves as the primary reference for:
- Frontend developers (UI/UX requirements)
- Backend developers (business logic)
- QA team (test cases)
- Project managers (scope and features)

---

## 🧭 Entity Relationship Diagram (ERD)

**Location:** `erd/ERD.mmd` (Mermaid format)  
**Description:** `erd/ERD_DESCRIPTION.md`

### Converting ERD to PNG:

#### Option 1: Using Mermaid CLI
```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Convert to PNG
mmdc -i erd/ERD.mmd -o erd/ERD.png
```

#### Option 2: Using Online Mermaid Editor
1. Visit https://mermaid.live/
2. Copy contents of `erd/ERD.mmd`
3. Paste into editor
4. Export as PNG

#### Option 3: Using VS Code Extension
1. Install "Markdown Preview Mermaid Support" extension
2. Open `erd/ERD.mmd` in VS Code
3. Right-click → "Export as PNG"

### ERD Entities:
- **EMPLOYEE** - Employee information
- **DEPARTMENT** - Department/role definitions
- **PASSENGER** - Customer information
- **FLIGHT** - Flight schedules
- **TICKET** - Booking records
- **TRANSACTION** (ACHAT) - Purchase records
- **AIRPORT** - Airport information
- **AIRPLANE** (AVION) - Aircraft information
- **CREW** (EQUIPE) - Flight crew
- **SHIFT** - Work shifts

### Relationships:
- 14 relationships documented (Many-to-One, One-to-Many)
- All foreign keys specified
- Unique constraints documented

---

## ⚙️ OpenAPI Specification

**Location:** `api/OpenAPI.yaml`

### Overview:
Complete REST API specification in OpenAPI 3.0.3 format with:
- **50+ endpoints** across 8 modules
- Request/Response schemas
- Authentication (JWT Bearer)
- Error codes and messages
- Examples for all operations

### API Modules:

1. **Authentication** (`/auth/*`)
   - Login, Logout, Current User

2. **Flights** (`/flights/*`)
   - Search, Create, Update, Duplicate

3. **Tickets** (`/tickets/*`)
   - Search, Create Booking, Print

4. **Passengers** (`/passengers/*`)
   - CRUD operations, XML Import

5. **Employees** (`/employees/*`)
   - CRUD operations, JSON Import

6. **Transactions** (`/transactions/*`)
   - View details, Print Receipt

7. **Airports** (`/airports/*`)
   - List, View details

8. **Admin** (shared endpoints)
   - Bulk imports, System operations

### Using the OpenAPI Spec:

#### Generate Client Code:
```bash
# Using OpenAPI Generator
openapi-generator generate -i api/OpenAPI.yaml -g typescript-axios -o ./generated/client
openapi-generator generate -i api/OpenAPI.yaml -g spring -o ./generated/server
```

#### View in Swagger UI:
```bash
# Using Docker
docker run -p 8080:8080 -e SWAGGER_JSON=/api/OpenAPI.yaml -v $(pwd)/api:/api swaggerapi/swagger-ui
```

Then visit: http://localhost:8080

#### View in ReDoc:
```bash
# Install ReDoc CLI
npm install -g redoc-cli

# Serve documentation
redoc-cli serve api/OpenAPI.yaml
```

---

## 🔄 Workflow for Development

### Phase 1: Database Setup
1. Review ERD (`erd/ERD_DESCRIPTION.md`)
2. Create PostgreSQL schema from ERD
3. Set up indexes and constraints
4. Create initial data (departments, airports, etc.)

### Phase 2: Backend Development
1. Review FSD for business rules (`fsd/COBOL_AIRLINES_FSD.md`)
2. Use OpenAPI spec as API contract (`api/OpenAPI.yaml`)
3. Implement Spring Boot services:
   - Authentication service (JWT)
   - Flight service
   - Ticket/Booking service
   - Passenger service
   - Employee service
4. Implement business rules from FSD Section 5

### Phase 3: Frontend Development
1. Review UI specifications in FSD Section 6
2. Generate TypeScript client from OpenAPI spec
3. Implement React components:
   - Login page
   - Flight search
   - Booking flow (2 steps)
   - Ticket search
   - Admin panels
4. Integrate with backend API

### Phase 4: Testing
1. Use FSD use cases as test scenarios
2. Test all business rules
3. Validate API against OpenAPI spec
4. Integration testing

---

## 📊 Data Migration

### Legacy to Modern Mapping:

| Legacy Type | PostgreSQL Type | Notes |
|------------|----------------|-------|
| CHAR(8) | VARCHAR(8) | Direct mapping |
| VARCHAR(30) | VARCHAR(30) | Direct mapping |
| DECIMAL(8,2) | NUMERIC(8,2) | Direct mapping |
| DATE | DATE | Direct mapping |
| TIME | TIME | Direct mapping |
| INTEGER | INTEGER | Direct mapping |
| COMP-3 (Packed) | NUMERIC | Convert during migration |

### Entity Name Mapping:
- AS-400 DDS names → PostgreSQL snake_case
- Example: `EMPLOYEE` → `employee`, `ADMINDATE` → `admin_date`

### Password Migration:
- Legacy system uses custom encryption algorithm
- New system uses bcrypt
- Migration script required to convert passwords

---

## 🔐 Security Considerations

1. **Authentication:**
   - JWT tokens (not session-based)
   - Token expiration: 24 hours
   - Refresh token mechanism recommended

2. **Authorization:**
   - Role-based access control (RBAC)
   - Department-based permissions (see RULE_003 in FSD)

3. **Password Storage:**
   - Bcrypt hashing (not custom encryption)
   - Password reset functionality needed

4. **API Security:**
   - HTTPS required in production
   - Rate limiting recommended
   - Input validation (OpenAPI schemas)

---

## 🚀 Next Steps

1. **Database Setup:**
   - Create PostgreSQL database
   - Run migration scripts based on ERD

2. **Backend Setup:**
   - Initialize Spring Boot project
   - Configure database connection
   - Implement JWT authentication
   - Start with Authentication API

3. **Frontend Setup:**
   - Initialize React project
   - Set up routing
   - Implement login page first
   - Connect to backend API

4. **Testing:**
   - Unit tests for business rules
   - API integration tests
   - End-to-end tests for use cases

---

## 📝 Notes

- All dates in format: `YYYY-MM-DD`
- All times in format: `HH:MM:SS`
- Prices in EUR (DECIMAL(7,2))
- Seat numbers format: `[0-9]{1,2}[A-Z]` (e.g., "12A", "1B")

---

## 🤝 Contributing

When making changes:
1. Update `reverse_spec.json` if source system changes
2. Regenerate FSD if business rules change
3. Update OpenAPI spec if API changes
4. Update ERD if data model changes

---

**Last Updated:** 2025-11-02  
**Version:** 1.0.0

