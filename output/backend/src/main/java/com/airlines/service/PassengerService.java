package com.airlines.service;

import com.airlines.dto.PassengerRequest;
import com.airlines.entity.Passenger;
import com.airlines.repository.PassengerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PassengerService {
    
    private final PassengerRepository passengerRepository;
    
    @Transactional(readOnly = true)
    public List<Passenger> getAllPassengers() {
        return passengerRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Passenger getPassengerById(Integer clientId) {
        return passengerRepository.findByClientId(clientId)
            .orElseThrow(() -> new RuntimeException("Passenger not found with Client ID: " + clientId));
    }
    
    @Transactional
    public Passenger createPassenger(PassengerRequest request) {
        // Check if email already exists
        Optional<Passenger> existing = passengerRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already exists: " + request.getEmail());
        }
        
        Passenger passenger = new Passenger();
        passenger.setFirstName(request.getFirstName().trim());
        passenger.setLastName(request.getLastName().trim());
        passenger.setAddress(request.getAddress().trim());
        passenger.setCity(request.getCity().trim());
        passenger.setCountry(request.getCountry().trim());
        passenger.setZipCode(request.getZipCode().trim());
        passenger.setTelephone(request.getTelephone().trim());
        passenger.setEmail(request.getEmail().trim().toLowerCase());
        
        return passengerRepository.save(passenger);
    }
    
    @Transactional
    public Passenger updatePassenger(Integer clientId, PassengerRequest request) {
        Passenger passenger = passengerRepository.findByClientId(clientId)
            .orElseThrow(() -> new RuntimeException("Passenger not found with Client ID: " + clientId));
        
        // Check if email is being changed and if new email already exists
        if (!passenger.getEmail().equalsIgnoreCase(request.getEmail().trim())) {
            Optional<Passenger> existing = passengerRepository.findByEmail(request.getEmail().trim().toLowerCase());
            if (existing.isPresent() && !existing.get().getClientId().equals(clientId)) {
                throw new RuntimeException("Email already exists: " + request.getEmail());
            }
        }
        
        passenger.setFirstName(request.getFirstName().trim());
        passenger.setLastName(request.getLastName().trim());
        passenger.setAddress(request.getAddress().trim());
        passenger.setCity(request.getCity().trim());
        passenger.setCountry(request.getCountry().trim());
        passenger.setZipCode(request.getZipCode().trim());
        passenger.setTelephone(request.getTelephone().trim());
        passenger.setEmail(request.getEmail().trim().toLowerCase());
        
        return passengerRepository.save(passenger);
    }
    
    @Transactional
    public void deletePassenger(Integer clientId) {
        Passenger passenger = passengerRepository.findByClientId(clientId)
            .orElseThrow(() -> new RuntimeException("Passenger not found with Client ID: " + clientId));
        
        // Check if passenger has tickets
        if (passenger.getTickets() != null && !passenger.getTickets().isEmpty()) {
            throw new RuntimeException("Cannot delete passenger with existing tickets. Passenger has " + 
                passenger.getTickets().size() + " ticket(s).");
        }
        
        passengerRepository.delete(passenger);
    }
    
    @Transactional(readOnly = true)
    public List<Passenger> searchPassengers(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return passengerRepository.findAll();
        }
        return passengerRepository.findByNameContaining(searchTerm.trim());
    }
}

