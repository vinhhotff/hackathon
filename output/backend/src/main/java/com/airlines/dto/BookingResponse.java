package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Integer transactionId;
    private BigDecimal totalPrice;
    private Integer clientId;
    private String clientName;
    private String flightNum;
    private String flightDate;
    private Integer passengerCount;
    private List<TicketInfo> tickets;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TicketInfo {
        private String ticketId;
        private String seatNum;
        private Integer clientId;
    }
}
