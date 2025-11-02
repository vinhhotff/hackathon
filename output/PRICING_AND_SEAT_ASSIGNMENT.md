# 💰 Giải Thích: Số Tiền Vé và Chỗ Ngồi

## 📊 **SỐ TIỀN VÉ (PRICE)**

### 🎯 **Cơ sở tính toán:**

**File:** `BookingService.java`

```java
// Unit price per ticket (cố định)
private static final BigDecimal UNIT_PRICE = new BigDecimal("120.99");

// Công thức tính giá
BigDecimal totalPrice = UNIT_PRICE.multiply(BigDecimal.valueOf(request.getPassengerCount()));
```

### 📝 **Chi tiết:**

1. **Giá đơn vị (UNIT_PRICE):**
   - **Giá cố định:** `120.99 EUR` cho mỗi vé
   - **Nguồn gốc:** Được reverse-engineer từ COBOL code (`RULE_002`)
   - **Vị trí:** Hardcode trong `BookingService.java` (có comment: "can be moved to pricing service")

2. **Công thức tính:**
   ```
   TOTAL_PRICE = UNIT_PRICE × PASSENGER_COUNT
   ```

3. **Ví dụ:**
   - Khách hàng đặt **3 vé** → `120.99 × 3 = 362.97 EUR`
   - Khách hàng đặt **2 vé** → `120.99 × 2 = 241.98 EUR`
   - Khách hàng đặt **1 vé** → `120.99 × 1 = 120.99 EUR`

4. **Lưu ý:**
   - ⚠️ Hiện tại giá là **cố định**, không phụ thuộc vào:
     - Route (đường bay)
     - Thời gian đặt vé
     - Loại ghế
     - Mùa/ngày lễ
   - 💡 **Tương lai:** Có thể tạo `PricingService` riêng để tính giá động

---

## 🪑 **CHỖ NGỒI (SEAT ASSIGNMENT)**

### 🎯 **Cơ sở gán chỗ:**

**File:** `BookingService.java` → Method `assignSeat()`

```java
private String assignSeat(Integer flightId, int index) {
    // Đếm số ghế đã được đặt cho chuyến bay này
    int bookedSeats = ticketRepository.countByFlightId(flightId).intValue();
    int totalIndex = bookedSeats + index;
    
    // Logic đơn giản: 1A, 1B, 1C, ... 2A, 2B, etc.
    // 6 ghế mỗi hàng (A-F)
    int row = (totalIndex / 6) + 1;
    char seat = (char) ('A' + (totalIndex % 6));
    
    // Kiểm tra nếu ghế đã được đặt (safety check)
    String seatNum = String.format("%d%c", row, seat);
    while (ticketRepository.findByFlightIdAndSeatNum(flightId, seatNum).isPresent()) {
        totalIndex++;
        row = (totalIndex / 6) + 1;
        seat = (char) ('A' + (totalIndex % 6));
        seatNum = String.format("%d%c", row, seat);
    }
    
    return seatNum;
}
```

### 📝 **Chi tiết:**

1. **Logic gán chỗ:**

   - **Bước 1:** Đếm số ghế đã được đặt cho chuyến bay
     ```java
     int bookedSeats = ticketRepository.countByFlightId(flightId).intValue();
     ```
   
   - **Bước 2:** Tính chỉ số tổng
     ```java
     int totalIndex = bookedSeats + index;
     ```
     - `bookedSeats`: Số ghế đã đặt trước đó
     - `index`: Vị trí trong nhóm vé đang đặt (0, 1, 2, ...)
   
   - **Bước 3:** Tính hàng và ghế
     ```java
     int row = (totalIndex / 6) + 1;  // Hàng: 1, 2, 3, ...
     char seat = (char) ('A' + (totalIndex % 6));  // Ghế: A, B, C, D, E, F
     ```
     - **6 ghế mỗi hàng:** A, B, C, D, E, F
     - Ví dụ:
       - `totalIndex = 0` → Hàng 1, Ghế A → `1A`
       - `totalIndex = 5` → Hàng 1, Ghế F → `1F`
       - `totalIndex = 6` → Hàng 2, Ghế A → `2A`
       - `totalIndex = 7` → Hàng 2, Ghế B → `2B`
   
   - **Bước 4:** Kiểm tra trùng lặp (safety check)
     - Nếu ghế đã được đặt → tự động tìm ghế tiếp theo
     - Lặp cho đến khi tìm được ghế trống

2. **Ví dụ thực tế:**

   **Scenario:** Chuyến bay CB1104 đã có **6 ghế được đặt** (1A, 1B, 1C, 1D, 1E, 1F)
   
   **Khách hàng mới đặt 3 vé:**
   
   - **Vé 1** (index = 0):
     - `bookedSeats = 6`
     - `totalIndex = 6 + 0 = 6`
     - `row = (6 / 6) + 1 = 2`
     - `seat = 'A' + (6 % 6) = 'A'`
     - **Kết quả:** `2A`
   
   - **Vé 2** (index = 1):
     - `totalIndex = 6 + 1 = 7`
     - `row = 2`, `seat = 'B'`
     - **Kết quả:** `2B`
   
   - **Vé 3** (index = 2):
     - `totalIndex = 6 + 2 = 8`
     - `row = 2`, `seat = 'C'`
     - **Kết quả:** `2C`

3. **Ví dụ từ hình ảnh:**

   Hình ảnh hiển thị:
   - **3 vé:** TKT0000009 (Seat 1D), TKT0000010 (Seat 1F), TKT0000011 (Seat 2B)
   
   **Điều này có nghĩa:**
   - Trước đó đã có ít nhất 3 ghế được đặt (1A, 1B, 1C)
   - Vé đầu tiên: `1D` (ghế thứ 4, index = 3)
   - Vé thứ hai: `1F` (ghế thứ 6, index = 5) - có thể 1E đã được đặt
   - Vé thứ ba: `2B` (ghế thứ 8, index = 7) - chuyển sang hàng 2

---

## 🔄 **QUY TRÌNH HOÀN CHỈNH**

### **Khi khách hàng đặt vé:**

1. **Validate:**
   - ✅ Passenger tồn tại
   - ✅ Flight tồn tại
   - ✅ Có đủ ghế trống

2. **Tính giá:**
   ```
   TOTAL_PRICE = 120.99 × PASSENGER_COUNT
   ```

3. **Tạo Transaction (ACHAT):**
   - Lưu thông tin giao dịch
   - Lưu tổng số tiền

4. **Tạo Tickets:**
   - Với mỗi vé:
     - Generate Ticket ID (TKT0000001, TKT0000002, ...)
     - **Gán chỗ ngồi tự động** (1A, 1B, ...)
     - Link với Transaction (BUYID)
     - Link với Flight và Client

5. **Response:**
   ```json
   {
     "transactionId": 2,
     "totalPrice": 362.97,
     "tickets": [
       {"ticketId": "TKT0000009", "seatNum": "1D"},
       {"ticketId": "TKT0000010", "seatNum": "1F"},
       {"ticketId": "TKT0000011", "seatNum": "2B"}
     ]
   }
   ```

---

## 📌 **TÓM TẮT**

| **Yếu tố** | **Nguồn** | **Cách xác định** |
|-----------|-----------|-------------------|
| **Giá vé** | `BookingService.java` | `UNIT_PRICE = 120.99 EUR` (cố định) |
| **Tổng tiền** | Tính toán | `UNIT_PRICE × PASSENGER_COUNT` |
| **Chỗ ngồi** | `assignSeat()` method | Tự động gán theo thứ tự: 1A, 1B, 1C, ..., 1F, 2A, 2B, ... |
| **Số ghế/hàng** | Logic cố định | 6 ghế/hàng (A-F) |

---

## 💡 **CẢI TIẾN TƯƠNG LAI**

1. **Dynamic Pricing:**
   - Tạo `PricingService` riêng
   - Tính giá dựa trên route, thời gian, loại ghế, etc.

2. **Seat Selection:**
   - Cho phép khách hàng chọn ghế
   - Hiển thị sơ đồ ghế với màu sắc (available/booked)

3. **Seat Classes:**
   - Economy, Business, First Class
   - Mỗi loại có giá khác nhau

4. **Premium Seats:**
   - Ghế cửa sổ, hàng ghế rộng → giá cao hơn

---

**Tóm lại:**
- **Giá vé:** `120.99 EUR` cố định × số lượng vé
- **Chỗ ngồi:** Tự động gán theo thứ tự, bắt đầu từ 1A, 6 ghế/hàng (A-F)

