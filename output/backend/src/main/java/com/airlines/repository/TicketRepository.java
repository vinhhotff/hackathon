package com.airlines.repository;

import com.airlines.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    Optional<Ticket> findByTicketId(String ticketId);
    
    List<Ticket> findByClientId(Integer clientId);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE t.clientId = :clientId")
    List<Ticket> findByClientIdWithDetails(@Param("clientId") Integer clientId);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE t.clientId = :clientId AND f.flightNum = :flightNum")
    List<Ticket> findByClientIdAndFlightNum(@Param("clientId") Integer clientId, @Param("flightNum") String flightNum);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE t.clientId = :clientId AND f.flightDate = :flightDate")
    List<Ticket> findByClientIdAndFlightDate(@Param("clientId") Integer clientId, @Param("flightDate") LocalDate flightDate);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE t.clientId = :clientId AND f.flightNum = :flightNum AND f.flightDate = :flightDate")
    List<Ticket> findByClientIdAndFlightNumAndFlightDate(
        @Param("clientId") Integer clientId, 
        @Param("flightNum") String flightNum,
        @Param("flightDate") LocalDate flightDate
    );
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE t.ticketId = :ticketId")
    Optional<Ticket> findByTicketIdWithDetails(@Param("ticketId") String ticketId);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE p.firstName = :firstName AND p.lastName = :lastName")
    List<Ticket> findByPassengerName(@Param("firstName") String firstName, @Param("lastName") String lastName);
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE p.firstName = :firstName AND p.lastName = :lastName AND f.flightNum = :flightNum")
    List<Ticket> findByPassengerNameAndFlightNum(
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("flightNum") String flightNum
    );
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE p.firstName = :firstName AND p.lastName = :lastName AND f.flightDate = :flightDate")
    List<Ticket> findByPassengerNameAndFlightDate(
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("flightDate") LocalDate flightDate
    );
    
    @Query("SELECT t FROM Ticket t JOIN FETCH t.passenger p JOIN FETCH t.flight f WHERE p.firstName = :firstName AND p.lastName = :lastName AND f.flightNum = :flightNum AND f.flightDate = :flightDate")
    List<Ticket> findByPassengerNameAndFlightNumAndFlightDate(
        @Param("firstName") String firstName,
        @Param("lastName") String lastName,
        @Param("flightNum") String flightNum,
        @Param("flightDate") LocalDate flightDate
    );
    
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.flightId = :flightId")
    Long countByFlightId(@Param("flightId") Integer flightId);
    
    @Query("SELECT t FROM Ticket t WHERE t.flightId = :flightId AND t.seatNum = :seatNum")
    Optional<Ticket> findByFlightIdAndSeatNum(@Param("flightId") Integer flightId, @Param("seatNum") String seatNum);
}

