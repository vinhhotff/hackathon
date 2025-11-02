# Chạy Local (Không dùng Docker) - Khuyến nghị

Nếu Docker gặp lỗi, bạn có thể chạy trực tiếp trên máy local:

---

## 🗄️ Bước 1: Setup Database

### Windows (PowerShell):
```powershell
# Download và cài PostgreSQL 16
# Hoặc dùng Docker chỉ cho database:
docker run -d --name airlines-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=airlines -p 5432:5432 postgres:16

# Chờ vài giây để database khởi động, sau đó:
docker exec -i airlines-db psql -U admin -d airlines < output\backend\src\main\resources\schema.sql
docker exec -i airlines-db psql -U admin -d airlines < output\backend\src\main\resources\data.sql
```

### Hoặc cài PostgreSQL local:
```bash
# Tạo database
createdb airlines

# Chạy schema
psql -d airlines -f output/backend/src/main/resources/schema.sql

# Load data
psql -d airlines -f output/backend/src/main/resources/data.sql
```

---

## ⚙️ Bước 2: Chạy Backend

```bash
cd output/backend

# Lần đầu: Build project
mvn clean install

# Chạy ứng dụng
mvn spring-boot:run
```

Backend sẽ chạy tại: **http://localhost:8080**

**Kiểm tra:**
```bash
curl http://localhost:8080/api/flights
```

---

## 🎨 Bước 3: Chạy Frontend

```bash
# Terminal mới
cd output/frontend

# Cài dependencies (chỉ lần đầu)
npm install

# Chạy dev server
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:3000**

---

## ✅ Kiểm tra

1. Mở browser: http://localhost:3000
2. Đăng nhập với:
   - User ID: `EMP00001`
   - Password: `password123`
3. Nếu thành công → thấy màn hình Search Flight

---

## 🔧 Nếu Backend lỗi kết nối database:

Kiểm tra file `output/backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/airlines  # ✅ Đúng
    username: admin
    password: admin
```

**KHÔNG PHẢI:** `jdbc:postgresql://localhost:5432/admin` ❌

---

## 🐛 Troubleshooting

### Backend không start:
```bash
# Kiểm tra Java version
java -version  # Phải >= 17

# Kiểm tra Maven
mvn -version

# Build lại
mvn clean package
```

### Frontend lỗi:
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

### Database connection failed:
```bash
# Kiểm tra PostgreSQL đang chạy
psql -U admin -d airlines

# Nếu không kết nối được, check:
# - PostgreSQL service đang chạy?
# - Port 5432 có bị chiếm?
# - Database "airlines" đã tạo chưa?
```

---

**Cách này đơn giản và ổn định hơn Docker trong development! 🚀**

