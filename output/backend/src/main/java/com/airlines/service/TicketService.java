package com.airlines.service;

import com.airlines.entity.Ticket;
import com.airlines.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {
    
    private final TicketRepository ticketRepository;
    
    @Transactional(readOnly = true)
    public List<Ticket> searchTickets(
            String ticketId,
            Integer clientId,
            String firstName,
            String lastName,
            String flightNum,
            LocalDate flightDate,
            int page,
            int size) {
        
        // Validate: At least one identifier must be provided
        boolean hasTicketId = ticketId != null && !ticketId.trim().isEmpty();
        boolean hasClientId = clientId != null;
        boolean hasName = firstName != null && lastName != null && 
                         !firstName.trim().isEmpty() && !lastName.trim().isEmpty();
        
        if (!hasTicketId && !hasClientId && !hasName) {
            throw new IllegalArgumentException("At least one of TICKETID, CLIENTID, or (FIRSTNAME + LASTNAME) must be provided");
        }
        
        // Search by TICKETID
        if (hasTicketId) {
            Optional<Ticket> ticket = ticketRepository.findByTicketIdWithDetails(ticketId.trim());
            if (ticket.isPresent()) {
                return List.of(ticket.get());
            }
            return List.of();
        }
        
        // Search by CLIENTID (with optional flight filters)
        if (hasClientId) {
            if (flightNum != null && !flightNum.trim().isEmpty() && flightDate != null) {
                return ticketRepository.findByClientIdAndFlightNumAndFlightDate(
                    clientId, flightNum.trim(), flightDate);
            } else if (flightNum != null && !flightNum.trim().isEmpty()) {
                return ticketRepository.findByClientIdAndFlightNum(clientId, flightNum.trim());
            } else if (flightDate != null) {
                return ticketRepository.findByClientIdAndFlightDate(clientId, flightDate);
            } else {
                return ticketRepository.findByClientIdWithDetails(clientId);
            }
        }
        
        // Search by FIRSTNAME + LASTNAME (with optional flight filters)
        if (hasName) {
            if (flightNum != null && !flightNum.trim().isEmpty() && flightDate != null) {
                return ticketRepository.findByPassengerNameAndFlightNumAndFlightDate(
                    firstName.trim(), lastName.trim(), flightNum.trim(), flightDate);
            } else if (flightNum != null && !flightNum.trim().isEmpty()) {
                return ticketRepository.findByPassengerNameAndFlightNum(
                    firstName.trim(), lastName.trim(), flightNum.trim());
            } else if (flightDate != null) {
                return ticketRepository.findByPassengerNameAndFlightDate(
                    firstName.trim(), lastName.trim(), flightDate);
            } else {
                return ticketRepository.findByPassengerName(firstName.trim(), lastName.trim());
            }
        }
        
        return List.of();
    }
    
    @Transactional(readOnly = true)
    public Ticket getTicketById(String ticketId) {
        return ticketRepository.findByTicketIdWithDetails(ticketId)
            .orElseThrow(() -> new RuntimeException("Ticket not found: " + ticketId));
    }
}
