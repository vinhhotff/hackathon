package com.airlines.controller;

import com.airlines.dto.TicketSearchResponse;
import com.airlines.entity.Flight;
import com.airlines.entity.Passenger;
import com.airlines.entity.Ticket;
import com.airlines.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TicketController {
    
    private final TicketService ticketService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> searchTickets(
            @RequestParam(required = false) String ticketId,
            @RequestParam(required = false) Integer clientId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String flightNum,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightDate,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        try {
            List<Ticket> tickets = ticketService.searchTickets(
                ticketId, clientId, firstName, lastName, flightNum, flightDate, page, size);
            
            // Convert to DTOs with passenger and flight info
            List<TicketSearchResponse> ticketResponses = tickets.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("tickets", ticketResponses);
            response.put("pagination", Map.of(
                "currentPage", page,
                "totalPages", (int)Math.ceil((double)ticketResponses.size() / size),
                "totalRecords", ticketResponses.size()
            ));
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Invalid search criteria");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Search failed");
            error.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @GetMapping("/{ticketId}")
    public ResponseEntity<TicketSearchResponse> getTicket(@PathVariable String ticketId) {
        Ticket ticket = ticketService.getTicketById(ticketId);
        TicketSearchResponse response = convertToResponse(ticket);
        return ResponseEntity.ok(response);
    }
    
    private TicketSearchResponse convertToResponse(Ticket ticket) {
        // Need to fetch passenger and flight with proper joins
        // For now, use entity relationships - may need eager fetching
        Passenger passenger = ticket.getPassenger();
        Flight flight = ticket.getFlight();
        
        // If lazy loaded, may be null - will need to handle in repository queries
        String firstName = null;
        String lastName = null;
        LocalDate flightDate = null;
        LocalTime depTime = null;
        LocalTime arrTime = null;
        String flightNum = null;
        String airportDep = null;
        String airportArr = null;
        
        if (passenger != null) {
            firstName = passenger.getFirstName();
            lastName = passenger.getLastName();
        }
        
        if (flight != null) {
            flightDate = flight.getFlightDate();
            depTime = flight.getDepTime();
            arrTime = flight.getArrTime();
            flightNum = flight.getFlightNum();
            airportDep = flight.getAirportDep();
            airportArr = flight.getAirportArr();
        }
        
        return TicketSearchResponse.builder()
            .ticketId(ticket.getTicketId())
            .seatNum(ticket.getSeatNum())
            .firstName(firstName)
            .lastName(lastName)
            .clientId(ticket.getClientId())
            .flightDate(flightDate)
            .depTime(depTime)
            .arrTime(arrTime)
            .flightNum(flightNum)
            .airportDep(airportDep)
            .airportArr(airportArr)
            .build();
    }
}

