package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketSearchResponse {
    private String ticketId;
    private String seatNum;
    private String firstName;
    private String lastName;
    private Integer clientId;
    private LocalDate flightDate;
    private LocalTime depTime;
    private LocalTime arrTime;
    private String flightNum;
    private String airportDep;
    private String airportArr;
}

