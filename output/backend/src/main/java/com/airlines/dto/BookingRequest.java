package com.airlines.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequest {
    @NotNull(message = "Client ID is required")
    @Min(value = 1, message = "Client ID must be greater than 0")
    private Integer clientId;
    
    @NotBlank(message = "Flight number is required")
    private String flightNum;
    
    @NotNull(message = "Flight date is required")
    private LocalDate flightDate;
    
    @NotNull(message = "Passenger count is required")
    @Min(value = 1, message = "Passenger count must be at least 1")
    private Integer passengerCount;
}
