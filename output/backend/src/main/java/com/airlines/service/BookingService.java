package com.airlines.service;

import com.airlines.dto.BookingRequest;
import com.airlines.dto.BookingResponse;
import com.airlines.entity.Flight;
import com.airlines.entity.Passenger;
import com.airlines.entity.Ticket;
import com.airlines.entity.Transaction;
import com.airlines.repository.FlightRepository;
import com.airlines.repository.PassengerRepository;
import com.airlines.repository.TicketRepository;
import com.airlines.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final FlightRepository flightRepository;
    private final PassengerRepository passengerRepository;
    private final TransactionRepository transactionRepository;
    private final TicketRepository ticketRepository;
    
    // Unit price per ticket (can be moved to pricing service)
    private static final BigDecimal UNIT_PRICE = new BigDecimal("120.99");
    
    @Transactional
    public BookingResponse createBooking(BookingRequest request, String employeeId) {
        // Step 1: Validate passenger exists
        Passenger passenger = passengerRepository.findByClientId(request.getClientId())
            .orElseThrow(() -> new RuntimeException("Passenger not found with Client ID: " + request.getClientId()));
        
        // Step 2: Validate flight exists
        Optional<Flight> flightOpt = flightRepository.findByFlightNumAndFlightDate(
            request.getFlightNum(), request.getFlightDate());
        
        Flight flight = flightOpt.orElseThrow(() -> 
            new RuntimeException("Flight not found: " + request.getFlightNum() + " on " + request.getFlightDate()));
        
        // Step 3: Check available seats
        int bookedSeats = ticketRepository.countByFlightId(flight.getFlightId()).intValue();
        int availableSeats = flight.getTotPass() - bookedSeats;
        
        if (availableSeats < request.getPassengerCount()) {
            throw new RuntimeException(
                String.format("Not enough seats available. Available: %d, Requested: %d", 
                    availableSeats, request.getPassengerCount()));
        }
        
        // Step 4: Calculate total price
        BigDecimal totalPrice = UNIT_PRICE.multiply(BigDecimal.valueOf(request.getPassengerCount()));
        
        // Step 5: Create transaction
        Transaction transaction = new Transaction();
        transaction.setPurchaseDate(LocalDate.now());
        transaction.setPurchaseTime(LocalTime.now());
        transaction.setPrice(totalPrice);
        transaction.setEmployeeId(employeeId);
        transaction.setClientId(request.getClientId());
        transaction = transactionRepository.save(transaction);
        
        // Step 6: Generate tickets with seat assignments
        List<BookingResponse.TicketInfo> ticketInfos = new ArrayList<>();
        int buyId = transaction.getAchatId();
        
        // Get next ticket ID based on existing count
        long existingTicketCount = ticketRepository.count();
        
        for (int i = 0; i < request.getPassengerCount(); i++) {
            // Generate ticket ID (format: TKT + 7 digits)
            String ticketId = String.format("TKT%07d", 
                existingTicketCount + 1 + i);
            
            // Auto-assign seat (simple logic: start from seat 1A, 1B, etc.)
            String seatNum = assignSeat(flight.getFlightId(), i);
            
            Ticket ticket = new Ticket();
            ticket.setTicketId(ticketId);
            ticket.setBuyId(buyId);
            ticket.setClientId(request.getClientId());
            ticket.setFlightId(flight.getFlightId());
            ticket.setSeatNum(seatNum);
            ticket = ticketRepository.save(ticket);
            
            BookingResponse.TicketInfo ticketInfo = BookingResponse.TicketInfo.builder()
                .ticketId(ticket.getTicketId())
                .seatNum(ticket.getSeatNum())
                .clientId(ticket.getClientId())
                .build();
            ticketInfos.add(ticketInfo);
        }
        
        // Step 7: Build response
        return BookingResponse.builder()
            .transactionId(transaction.getAchatId())
            .totalPrice(transaction.getPrice())
            .clientId(passenger.getClientId())
            .clientName(passenger.getFirstName() + " " + passenger.getLastName())
            .flightNum(flight.getFlightNum())
            .flightDate(flight.getFlightDate().toString())
            .passengerCount(request.getPassengerCount())
            .tickets(ticketInfos)
            .build();
    }
    
    private String assignSeat(Integer flightId, int index) {
        // Get already assigned seats for this flight
        int bookedSeats = ticketRepository.countByFlightId(flightId).intValue();
        int totalIndex = bookedSeats + index;
        
        // Simple seat assignment: 1A, 1B, 1C, ... 2A, 2B, etc.
        // 6 seats per row (A-F)
        int row = (totalIndex / 6) + 1;
        char seat = (char) ('A' + (totalIndex % 6));
        
        // Check if seat is already taken (safety check)
        String seatNum = String.format("%d%c", row, seat);
        while (ticketRepository.findByFlightIdAndSeatNum(flightId, seatNum).isPresent()) {
            totalIndex++;
            row = (totalIndex / 6) + 1;
            seat = (char) ('A' + (totalIndex % 6));
            seatNum = String.format("%d%c", row, seat);
        }
        
        return seatNum;
    }
    
    @Transactional(readOnly = true)
    public BookingResponse validateBooking(BookingRequest request) {
        // Validate passenger
        Passenger passenger = passengerRepository.findByClientId(request.getClientId())
            .orElseThrow(() -> new RuntimeException("Passenger not found with Client ID: " + request.getClientId()));
        
        // Validate flight
        Flight flight = flightRepository.findByFlightNumAndFlightDate(
            request.getFlightNum(), request.getFlightDate())
            .orElseThrow(() -> new RuntimeException("Flight not found: " + request.getFlightNum() + " on " + request.getFlightDate()));
        
        // Check available seats
        int bookedSeats = ticketRepository.countByFlightId(flight.getFlightId()).intValue();
        int availableSeats = flight.getTotPass() - bookedSeats;
        
        if (availableSeats < request.getPassengerCount()) {
            throw new RuntimeException(
                String.format("Not enough seats available. Available: %d, Requested: %d", 
                    availableSeats, request.getPassengerCount()));
        }
        
        // Calculate price
        BigDecimal totalPrice = UNIT_PRICE.multiply(BigDecimal.valueOf(request.getPassengerCount()));
        
        return BookingResponse.builder()
            .clientId(passenger.getClientId())
            .clientName(passenger.getFirstName() + " " + passenger.getLastName())
            .flightNum(flight.getFlightNum())
            .flightDate(flight.getFlightDate().toString())
            .passengerCount(request.getPassengerCount())
            .totalPrice(totalPrice)
            .build();
    }
}

