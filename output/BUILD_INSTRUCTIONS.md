# Build and Run Instructions

## Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 20+
- Docker & Docker Compose (optional)
- PostgreSQL 16 (if not using Docker)

---

## Backend (Spring Boot)

### Using Maven:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Using Docker:

```bash
docker-compose up db backend
```

Backend will be available at: http://localhost:8080

---

## Frontend (React)

### Using npm:

```bash
cd frontend
npm install
npm run dev
```

### Using Docker:

```bash
docker-compose up frontend
```

Frontend will be available at: http://localhost:3000

---

## Full Stack with Docker Compose

```bash
docker-compose up
```

This will start:
- PostgreSQL (port 5432)
- Backend API (port 8080)
- Frontend (port 3000)

---

## Database Setup

### If using Docker:
Database is automatically initialized with schema.sql and data.sql

### Manual Setup:
```bash
# Create database
createdb airlines

# Run schema
psql -d airlines -f backend/src/main/resources/schema.sql

# Load data
psql -d airlines -f backend/src/main/resources/data.sql
```

---

## Testing

### Backend Tests:
```bash
cd backend
mvn test
```

### Frontend Tests:
```bash
cd frontend
npm test
```

---

## Default Credentials

**Employee Login:**
- User ID: EMP00001
- Password: password123

**Database:**
- User: admin
- Password: admin
- Database: airlines

---

## Troubleshooting

1. **Port conflicts:** Change ports in docker-compose.yml or application.yml
2. **Database connection:** Check DB_HOST, DB_PORT, DB_NAME in environment
3. **CORS errors:** Verify SecurityConfig allows frontend origin
4. **JWT errors:** Check JWT_SECRET is set (minimum 32 characters)

