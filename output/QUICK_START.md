# Quick Start Guide - COBOL Airlines System

## ✅ Bạn có thể chạy trực tiếp từ folder `output/` mà KHÔNG CẦN UNZIP!

---

## 🚀 Cách chạy nhanh nhất (Docker Compose)

```bash
# Chỉ cần vào folder output và chạy:
cd output
docker-compose up
```

Sau đó truy cập:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:5432

---

## 📋 Cách chạy từng phần (Manual)

### 1. Database (PostgreSQL)

```bash
# Tạo database
createdb airlines

# Chạy schema
psql -d airlines -f output/backend/src/main/resources/schema.sql

# Load dữ liệu mẫu
psql -d airlines -f output/backend/src/main/resources/data.sql
```

### 2. Backend (Spring Boot)

```bash
cd output/backend
mvn clean install
mvn spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080**

### 3. Frontend (React)

```bash
# Terminal mới
cd output/frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

---

## 🔑 Đăng nhập mặc định

- **User ID**: `EMP00001`
- **Password**: `password123`

---

## ⚠️ Lưu ý

1. **Docker Compose** (khuyến nghị): Tự động setup database, không cần cài PostgreSQL riêng
2. **Manual**: Cần cài PostgreSQL trước, sau đó chạy schema.sql và data.sql
3. **File zip** chỉ để backup/archive, không cần unzip để chạy

---

## 🐛 Troubleshooting

### Database connection error:
```bash
# Kiểm tra PostgreSQL đang chạy
psql -U admin -d airlines
```

### Port đã được sử dụng:
- Sửa ports trong `docker-compose.yml` hoặc `application.yml`

### Frontend không kết nối được Backend:
- Kiểm tra `VITE_API_URL` trong frontend/.env
- Mặc định: `http://localhost:8080/api`

---

**Tóm lại: Chạy trực tiếp từ folder `output/`, KHÔNG CẦN UNZIP! ✅**

