package com.airlines.repository;

import com.airlines.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
    List<Flight> findByFlightNum(String flightNum);
    
    List<Flight> findByFlightDate(LocalDate flightDate);
    
    List<Flight> findByFlightDateAndFlightNum(LocalDate flightDate, String flightNum);
    
    List<Flight> findByFlightDateAndAirportDep(LocalDate flightDate, String airportDep);
    
    List<Flight> findByFlightDateAndAirportArr(LocalDate flightDate, String airportArr);
    
    @Query("SELECT f FROM Flight f WHERE f.flightDate = :flightDate AND f.airportDep = :airportDep AND f.airportArr = :airportArr")
    List<Flight> findByFlightDateAndAirports(
        @Param("flightDate") LocalDate flightDate,
        @Param("airportDep") String airportDep,
        @Param("airportArr") String airportArr
    );
    
    @Query("SELECT f FROM Flight f WHERE f.flightDate >= :flightDate AND f.flightNum > :flightNum")
    List<Flight> findByFlightDateAfterAndFlightNumGreaterThan(
        @Param("flightDate") LocalDate flightDate,
        @Param("flightNum") String flightNum
    );
    
    Optional<Flight> findByFlightNumAndFlightDate(String flightNum, LocalDate flightDate);
}

