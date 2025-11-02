package com.airlines.controller;

import com.airlines.entity.Flight;
import com.airlines.entity.Ticket;
import com.airlines.entity.Transaction;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.TicketRepository;
import com.airlines.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {
    
    private final FlightRepository flightRepository;
    private final TransactionRepository transactionRepository;
    private final TicketRepository ticketRepository;
    
    @GetMapping("/flights")
    public ResponseEntity<Map<String, Object>> getAllFlights(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "flightDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? 
            Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Flight> flightPage = flightRepository.findAll(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("flights", flightPage.getContent());
        response.put("pagination", Map.of(
            "currentPage", flightPage.getNumber(),
            "totalPages", flightPage.getTotalPages(),
            "totalRecords", flightPage.getTotalElements(),
            "pageSize", size
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/bookings")
    public ResponseEntity<Map<String, Object>> getAllBookings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "purchaseDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? 
            Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Transaction> transactionPage = transactionRepository.findAll(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("bookings", transactionPage.getContent());
        response.put("pagination", Map.of(
            "currentPage", transactionPage.getNumber(),
            "totalPages", transactionPage.getTotalPages(),
            "totalRecords", transactionPage.getTotalElements(),
            "pageSize", size
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/tickets")
    public ResponseEntity<Map<String, Object>> getAllTickets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "ticketId") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? 
            Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Ticket> ticketPage = ticketRepository.findAll(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("tickets", ticketPage.getContent());
        response.put("pagination", Map.of(
            "currentPage", ticketPage.getNumber(),
            "totalPages", ticketPage.getTotalPages(),
            "totalRecords", ticketPage.getTotalElements(),
            "pageSize", size
        ));
        
        return ResponseEntity.ok(response);
    }
}

