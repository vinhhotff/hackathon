# 🔄 Lệnh Cập Nhật Database Ngay Bây Giờ

## ✅ **LỆNH NHANH (Chạy trong PowerShell):**

```powershell
# Bước 1: Xóa data cũ (giữ lại schema)
docker exec airlines-db psql -U admin -d airlines -c "DELETE FROM ticket; DELETE FROM transaction; DELETE FROM passenger WHERE clientid >= 1009; DELETE FROM flight; DELETE FROM shift; DELETE FROM airplane; DELETE FROM airport; DELETE FROM employee; DELETE FROM department;"

# Bước 2: Chạy lại data.sql mới
docker exec -i airlines-db psql -U admin -d airlines < backend/src/main/resources/data.sql
```

---

## 📋 **HOẶC LÀM TỪNG BƯỚC (An Toàn Hơn):**

### **Bước 1: Xóa tất cả data cũ**

```powershell
docker exec -it airlines-db psql -U admin -d airlines -c "TRUNCATE TABLE ticket, transaction, passenger, flight, shift, airplane, airport, employee, department CASCADE;"
```

### **Bước 2: Chạy lại data.sql**

```powershell
docker exec -i airlines-db psql -U admin -d airlines < backend/src/main/resources/data.sql
```

---

## 🔍 **KIỂM TRA SAU KHI CẬP NHẬT:**

```powershell
# Đếm số tickets (nên = 21)
docker exec airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) as total_tickets FROM ticket;"

# Kiểm tra accounts mới
docker exec airlines-db psql -U admin -d airlines -c "SELECT clientid, firstname, lastname FROM passenger WHERE clientid IN (1009, 1010, 1011);"

# Kiểm tra tickets của Thomas Garcia (1009) - nên có 7 vé
docker exec airlines-db psql -U admin -d airlines -c "SELECT COUNT(*) as tickets_count FROM ticket WHERE clientid = 1009;"
```

---

## 🎯 **NẾU MUỐN CLEAN START (Xóa Hết và Tạo Lại):**

```powershell
# Dừng và xóa containers + volumes
docker-compose down -v

# Tạo lại (tự động chạy schema.sql và data.sql)
docker-compose up -d

# Xem logs
docker-compose logs -f db
```

---

**Chọn cách nào phù hợp với bạn! ✅**

