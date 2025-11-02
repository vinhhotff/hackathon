# 📊 Nguồn Gốc Dữ Liệu - Data Source Explanation

## 🔍 Tóm Tắt:

**Schema/Structure:** ✅ Được reverse-engineer từ COBOL code  
**Sample Data:** ⚠️ **TỰ TẠO** để demo, KHÔNG lấy trực tiếp từ COBOL data files

---

## 📋 Chi Tiết:

### 1. Schema/Structure (100% từ COBOL)

**Đã reverse-engineer từ:**
- ✅ **DDS files** (AS-400): `employee`, `dept`, `avion`, `vol`, `billet`, `achat`, `shift`, `Equipage`
- ✅ **DCLGEN files** (DB2): `EMPLO-DCLGEN`, `FLIGHT-DCLGEN`, `PASSENG-DCLGEN`, `TICKET-DCLGEN`, `AIRPORT-DCLGEN`
- ✅ **Entity relationships** từ JOIN statements trong COBOL programs
- ✅ **Business rules** từ COBOL logic

**Kết quả:**
- File `schema.sql` với đúng structure từ COBOL
- 9 tables với đúng columns, types, constraints

---

### 2. Sample Data (Tự tạo để demo)

**File `data.sql` trong output:**
- ⚠️ **KHÔNG** lấy trực tiếp từ COBOL data files
- ✅ Tự tạo để demo và testing
- ✅ Format phù hợp với schema đã reverse-engineer

**Lý do:**
1. COBOL data files có format khác (CSV với nhiều records)
2. Cần data đơn giản, dễ test (5-10 records mỗi table)
3. Data gốc có thể có privacy issues
4. Data gốc có thể quá nhiều (hàng trăm/thousands records)

---

## 📂 COBOL Data Files Gốc:

### Có trong folder COBOL-AIRLINES:

1. **`AS-400/Insert/Emplo-file`** (CSV)
   - Format: `empid,passw,firstname,lastname,addre,city,zipcode,telephone,email,admindate,salary,deptid`
   - Ví dụ: `1,zMKdQYb,Mirelle,Thurstance,9270 Esch Parkway,Khonj,87100,3106069183,mthurstance0@psu.edu,2022/01/15,9691.38,5`
   - **Có rất nhiều records** (hàng trăm employees)

2. **`AS-400/Insert/Passagers-file`** (CSV)
   - Format tương tự cho passengers
   - **Có rất nhiều records**

3. **`COB-PROG/EMPLO-INSERT/EMPLOYEE-LIST.json`**
   - JSON format cho employees
   - Dùng bởi COBOL program `EMPLO-MAIN-INSERT`

4. **`COB-PROG/PASSENGER-INSERT/PASSENGER*.xml`**
   - XML files cho passengers (PASSENGER1.xml đến PASSENGER8.xml)
   - Dùng bởi COBOL program `PASSENGER-INSERT-MAINPROG`

---

## 🔄 So Sánh:

### COBOL Data (Emplo-file):
```
empid,passw,firstname,lastname,addre,city,zipcode,telephone,email,admindate,salary,deptid
1,zMKdQYb,Mirelle,Thurstance,9270 Esch Parkway,Khonj,87100,3106069183,mthurstance0@psu.edu,2022/01/15,9691.38,5
2,0Is2FnAbwi,Torey,Fache,887 Dahle Pass,Malanville,94300,7933458250,tfache1@csmonitor.com,2006/07/04,8629.2,6
```

### Output Data (data.sql):
```sql
INSERT INTO employee (empid, firstname, lastname, ...) VALUES
('EMP00001', 'John', 'Doe', '123 Main Street', 'Paris', '75001', ...),
('EMP00002', 'Jane', 'Smith', '456 Oak Avenue', 'Paris', '75002', ...);
```

**Khác biệt:**
- COBOL: IDs là số (1, 2, 3...) → Output: String format ('EMP00001', 'EMP00002')
- COBOL: Tên thật (Mirelle, Torey...) → Output: Tên demo (John, Jane)
- COBOL: Nhiều records → Output: 5-10 records để demo

---

## ✅ Kết Luận:

| Component | Nguồn Gốc |
|-----------|-----------|
| **Schema Structure** | ✅ 100% từ COBOL (reverse-engineered) |
| **Business Rules** | ✅ 100% từ COBOL code |
| **Sample Data** | ⚠️ Tự tạo (KHÔNG từ COBOL data files) |

---

## 💡 Lý Do Tự Tạo Data:

1. **Simplicity**: Data đơn giản, dễ nhớ để test
   - John Doe thay vì Mirelle Thurstance
   - Paris thay vì Khonj, Malanville

2. **Privacy**: Không muốn dùng data thật có thể có thông tin cá nhân

3. **Testing**: Data ngắn gọn (5-10 records) thay vì hàng trăm

4. **Format**: COBOL data files cần parsing/transformation phức tạp
   - CSV format khác
   - Date format khác (2022/01/15 vs 2024-01-15)
   - ID format khác (number vs string)

---

## 🔄 Nếu Muốn Import Data Gốc:

Có thể tạo script để import từ COBOL data files:

1. **Parse CSV files** (Emplo-file, Passagers-file)
2. **Transform format:**
   - Convert IDs: `1` → `EMP00001`
   - Convert dates: `2022/01/15` → `2022-01-15`
   - Map departments
3. **Generate INSERT statements**

**Hiện tại:** Data.sql được tạo thủ công để đơn giản hóa testing.

---

**Tóm lại: Schema từ COBOL, Data tự tạo để demo! ✅**

