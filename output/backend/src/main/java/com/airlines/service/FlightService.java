package com.airlines.service;

import com.airlines.entity.Flight;
import com.airlines.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlightService {
    private final FlightRepository flightRepository;
    
    @Transactional(readOnly = true)
    public List<Flight> searchFlights(String flightNum, LocalDate flightDate, 
                                      String airportDep, String airportArr) {
        if (flightDate != null && airportDep != null && airportArr != null) {
            return flightRepository.findByFlightDateAndAirports(flightDate, airportDep, airportArr);
        } else if (flightDate != null && airportDep != null) {
            return flightRepository.findByFlightDateAndAirportDep(flightDate, airportDep);
        } else if (flightDate != null && airportArr != null) {
            return flightRepository.findByFlightDateAndAirportArr(flightDate, airportArr);
        } else if (flightDate != null && flightNum != null) {
            return flightRepository.findByFlightDateAndFlightNum(flightDate, flightNum);
        } else if (flightDate != null) {
            return flightRepository.findByFlightDate(flightDate);
        } else if (flightNum != null) {
            return flightRepository.findByFlightNum(flightNum);
        }
        return List.of();
    }
    
    @Transactional(readOnly = true)
    public Flight getFlightById(Integer flightId) {
        return flightRepository.findById(flightId)
            .orElseThrow(() -> new RuntimeException("Flight not found"));
    }
}

