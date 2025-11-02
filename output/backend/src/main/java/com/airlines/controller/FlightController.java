package com.airlines.controller;

import com.airlines.entity.Flight;
import com.airlines.service.FlightService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FlightController {
    private final FlightService flightService;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> searchFlights(
            @RequestParam(required = false) String flightNum,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate flightDate,
            @RequestParam(required = false) String airportDep,
            @RequestParam(required = false) String airportArr,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        List<Flight> flights = flightService.searchFlights(flightNum, flightDate, airportDep, airportArr);
        
        Map<String, Object> response = new HashMap<>();
        response.put("flights", flights);
        response.put("pagination", Map.of(
            "currentPage", page,
            "totalPages", (int)Math.ceil((double)flights.size() / size),
            "totalRecords", flights.size()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlight(@PathVariable Integer id) {
        Flight flight = flightService.getFlightById(id);
        return ResponseEntity.ok(flight);
    }
}

