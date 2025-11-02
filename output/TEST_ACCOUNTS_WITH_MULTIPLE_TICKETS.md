# 🎫 Test Accounts với Nhiều Vé (>2 vé)

## 📊 **Tổng Quan:**

Đã thêm **3 accounts mới** với **nhiều vé** để test functionality:

---

## 👥 **Accounts Mới:**

### 1. **Thomas Garcia (Client ID: 1009)**
- **Email:** thomas.garcia@email.com
- **Địa chỉ:** 78 Rue de la Republique, Marseille, France
- **Tổng số vé:** **7 vé** (nhiều nhất!)
  - **Transaction 5004:** 4 vé cho Flight 1 (CB1104)
    - TKT0000007 - Seat 3A
    - TKT0000008 - Seat 3B
    - TKT0000009 - Seat 3C
    - TKT0000010 - Seat 3D
  - **Transaction 5007:** 3 vé cho Flight 4 (CB2205)
    - TKT0000019 - Seat 9A
    - TKT0000020 - Seat 9B
    - TKT0000021 - Seat 9C

### 2. **Emma Lopez (Client ID: 1010)**
- **Email:** emma.lopez@email.com
- **Địa chỉ:** 90 Boulevard Haussmann, Paris, France
- **Tổng số vé:** **5 vé**
  - **Transaction 5005:** 5 vé cho Flight 2 (CB1105)
    - TKT0000011 - Seat 5A
    - TKT0000012 - Seat 5B
    - TKT0000013 - Seat 5C
    - TKT0000014 - Seat 5D
    - TKT0000015 - Seat 5E

### 3. **Lucas Muller (Client ID: 1011)**
- **Email:** lucas.muller@email.com
- **Địa chỉ:** 123 Avenue des Ternes, Paris, France
- **Tổng số vé:** **3 vé**
  - **Transaction 5006:** 3 vé cho Flight 3 (CB2204)
    - TKT0000016 - Seat 7A
    - TKT0000017 - Seat 7B
    - TKT0000018 - Seat 7C

---

## 💰 **Chi Tiết Transactions:**

| Transaction ID | Client ID | Client Name | Số Vé | Tổng Tiền (€) | Flight | Ngày |
|---------------|-----------|-------------|-------|---------------|--------|------|
| 5004 | 1009 | Thomas Garcia | 4 | 483.96 | CB1104 | 2025-11-03 |
| 5005 | 1010 | Emma Lopez | 5 | 604.95 | CB1105 | 2025-11-03 |
| 5006 | 1011 | Lucas Muller | 3 | 362.97 | CB2204 | 2025-11-03 |
| 5007 | 1009 | Thomas Garcia | 3 | 362.97 | CB2205 | 2025-11-04 |

**Tổng:** 15 vé mới được thêm vào database.

---

## 🔍 **Cách Test:**

### **Test 1: Search Ticket by Client ID**

1. Vào trang **Search Ticket**
2. Nhập **Client ID:**
   - `1009` → Sẽ hiển thị **7 vé** (2 transactions)
   - `1010` → Sẽ hiển thị **5 vé** (1 transaction)
   - `1011` → Sẽ hiển thị **3 vé** (1 transaction)

### **Test 2: Search Ticket by Name**

1. Nhập **First Name + Last Name:**
   - `Thomas Garcia` → 7 vé
   - `Emma Lopez` → 5 vé
   - `Lucas Muller` → 3 vé

### **Test 3: All Tickets Table**

1. Vào trang **Search Ticket**
2. Scroll xuống table **"All Tickets"**
3. Sẽ thấy 21 tickets tổng cộng (6 vé cũ + 15 vé mới)
4. Test pagination với 10 records/page

### **Test 4: Customer Management**

1. Vào trang **Customer Management**
2. Search hoặc browse sẽ thấy:
   - Thomas Garcia (1009)
   - Emma Lopez (1010)
   - Lucas Muller (1011)

---

## 📈 **Thống Kê:**

### **Trước khi thêm:**
- **Tổng passengers:** 8
- **Tổng transactions:** 3
- **Tổng tickets:** 6

### **Sau khi thêm:**
- **Tổng passengers:** 11 (+3)
- **Tổng transactions:** 7 (+4)
- **Tổng tickets:** 21 (+15)

---

## ✅ **Accounts có Nhiều Vé (>2 vé):**

| Client ID | Client Name | Số Vé | Chi Tiết |
|-----------|-------------|-------|----------|
| **1009** | Thomas Garcia | **7 vé** | 4 vé + 3 vé (2 transactions) |
| **1010** | Emma Lopez | **5 vé** | 1 transaction |
| **1011** | Lucas Muller | **3 vé** | 1 transaction |
| 1003 | Pierre Dubois | 3 vé | (đã có sẵn) |

---

## 🎯 **Mục Đích Test:**

1. ✅ Test search ticket với accounts có nhiều vé
2. ✅ Test pagination trong All Tickets table
3. ✅ Test hiển thị multiple transactions cho cùng 1 client
4. ✅ Test customer management với accounts có nhiều bookings
5. ✅ Test booking flow với accounts đã có vé

---

**Tất cả data đã được thêm vào `data.sql`! ✅**

