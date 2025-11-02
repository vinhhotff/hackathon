# 📊 Cập Nhật Database - Hướng Dẫn

## 🐳 **CÁCH 1: Dùng Docker (Khuyến Nghị)**

### **Option A: Xóa và Tạo Lại Database (Clean Start)**

```bash
# Bước 1: Dừng tất cả containers
docker-compose down

# Bước 2: Xóa volume database (XÓA HẾT DATA CŨ!)
docker volume rm output_postgres_data

# Bước 3: Tạo lại containers (sẽ tự động chạy schema.sql và data.sql mới)
docker-compose up -d

# Bước 4: Kiểm tra logs
docker-compose logs db
```

⚠️ **Lưu ý:** Cách này sẽ **XÓA HẾT DATA CŨ** và tạo lại từ đầu!

---

### **Option B: Chỉ Cập Nhật Data (Giữ Schema và Data Cũ)**

```bash
# Bước 1: Kiểm tra container database đang chạy
docker ps | grep airlines-db

# Bước 2: Copy file data.sql vào container và chạy
docker exec -i airlines-db psql -U admin -d airlines < backend/src/main/resources/data.sql
```

⚠️ **Lưu ý:** Cách này có thể bị **DUPLICATE** nếu data đã tồn tại!

---

### **Option C: Xóa Tables và Chạy Lại (Recommended nếu đã có data)**

```bash
# Bước 1: Vào PostgreSQL container
docker exec -it airlines-db psql -U admin -d airlines

# Bước 2: Xóa tất cả data (giữ lại schema)
DELETE FROM ticket;
DELETE FROM transaction;
DELETE FROM passenger;
DELETE FROM flight;
DELETE FROM shift;
DELETE FROM airplane;
DELETE FROM airport;
DELETE FROM employee;
DELETE FROM department;

# Bước 3: Thoát
\q

# Bước 4: Chạy lại data.sql
docker exec -i airlines-db psql -U admin -d airlines < backend/src/main/resources/data.sql
```

---

### **Option D: Chạy SQL File Trực Tiếp trong Container**

```bash
# Copy file vào container trước
docker cp backend/src/main/resources/data.sql airlines-db:/tmp/data.sql

# Chạy file SQL
docker exec airlines-db psql -U admin -d airlines -f /tmp/data.sql
```

---

## 💻 **CÁCH 2: Dùng PostgreSQL Trực Tiếp (Manual)**

### **Nếu không dùng Docker:**

```bash
# Bước 1: Kết nối PostgreSQL
psql -U admin -d airlines

# Bước 2: Xóa data cũ (nếu cần)
DELETE FROM ticket;
DELETE FROM transaction;
DELETE FROM passenger;
DELETE FROM flight;
DELETE FROM shift;
DELETE FROM airplane;
DELETE FROM airport;
DELETE FROM employee;
DELETE FROM department;

# Bước 3: Thoát
\q

# Bước 4: Chạy file SQL
psql -U admin -d airlines -f backend/src/main/resources/data.sql

# Hoặc copy-paste nội dung data.sql vào psql
```

---

## 🔄 **CÁCH NHANH NHẤT (Windows PowerShell)**

### **Nếu đang dùng Docker:**

```powershell
# 1. Xóa container và volume
docker-compose down -v

# 2. Tạo lại (tự động chạy schema.sql và data.sql)
docker-compose up -d

# 3. Xem logs
docker-compose logs -f db
```

---

## ✅ **VERIFY - Kiểm Tra Data Đã Cập Nhật**

```bash
# Vào PostgreSQL
docker exec -it airlines-db psql -U admin -d airlines

# Đếm số tickets
SELECT COUNT(*) FROM ticket;

# Kiểm tra passengers mới
SELECT clientid, firstname, lastname FROM passenger WHERE clientid IN (1009, 1010, 1011);

# Kiểm tra tickets của Thomas Garcia (1009) - nên có 7 vé
SELECT ticketid, buyid, seatnum, flightid FROM ticket WHERE clientid = 1009;

# Thoát
\q
```

**Expected Results:**
- Total tickets: **21** (6 cũ + 15 mới)
- Client 1009: **7 tickets**
- Client 1010: **5 tickets**
- Client 1011: **3 tickets**

---

## 🎯 **KHUYẾN NGHỊ:**

**Nếu đang development và muốn clean start:**
```bash
docker-compose down -v
docker-compose up -d
```

**Nếu đã có data production và chỉ muốn thêm data mới:**
- Dùng **Option C** hoặc **Option D** ở trên

---

## ⚠️ **LƯU Ý QUAN TRỌNG:**

1. **Backup data trước khi xóa:**
   ```bash
   # Export data hiện tại
   docker exec airlines-db pg_dump -U admin airlines > backup.sql
   ```

2. **Nếu gặp lỗi duplicate:**
   - Xóa data cũ trước khi chạy lại data.sql
   - Hoặc sửa data.sql để tránh INSERT duplicate

3. **Schema.sql chỉ chạy 1 lần:**
   - Schema.sql tự động chạy khi container được tạo lần đầu
   - Nếu muốn chạy lại schema, phải xóa container và volume

---

**Chọn cách phù hợp với nhu cầu của bạn! ✅**

