package com.airlines.controller;

import com.airlines.dto.PassengerRequest;
import com.airlines.entity.Passenger;
import com.airlines.service.PassengerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/passengers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PassengerController {
    
    private final PassengerService passengerService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPassengers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        try {
            List<Passenger> passengers;
            if (search != null && !search.trim().isEmpty()) {
                passengers = passengerService.searchPassengers(search);
            } else {
                passengers = passengerService.getAllPassengers();
            }
            
            // Manual pagination
            int start = page * size;
            int end = Math.min(start + size, passengers.size());
            List<Passenger> paginatedPassengers = passengers.subList(
                Math.min(start, passengers.size()), 
                end
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("passengers", paginatedPassengers);
            response.put("pagination", Map.of(
                "currentPage", page,
                "totalPages", (int)Math.ceil((double)passengers.size() / size),
                "totalRecords", passengers.size(),
                "pageSize", size
            ));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to retrieve passengers");
            error.put("message", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
    
    @GetMapping("/{clientId}")
    public ResponseEntity<Passenger> getPassenger(@PathVariable Integer clientId) {
        try {
            Passenger passenger = passengerService.getPassengerById(clientId);
            return ResponseEntity.ok(passenger);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createPassenger(@Valid @RequestBody PassengerRequest request) {
        try {
            Passenger passenger = passengerService.createPassenger(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(passenger);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create passenger");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{clientId}")
    public ResponseEntity<?> updatePassenger(
            @PathVariable Integer clientId,
            @Valid @RequestBody PassengerRequest request) {
        try {
            Passenger passenger = passengerService.updatePassenger(clientId, request);
            return ResponseEntity.ok(passenger);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update passenger");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deletePassenger(@PathVariable Integer clientId) {
        try {
            passengerService.deletePassenger(clientId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Passenger deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete passenger");
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}

