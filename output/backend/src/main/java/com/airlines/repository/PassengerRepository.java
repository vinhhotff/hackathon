package com.airlines.repository;

import com.airlines.entity.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Integer> {
    Optional<Passenger> findByClientId(Integer clientId);
    
    Optional<Passenger> findByEmail(String email);
    
    List<Passenger> findByFirstNameAndLastName(String firstName, String lastName);
    
    @Query("SELECT p FROM Passenger p WHERE p.firstName LIKE %:name% OR p.lastName LIKE %:name%")
    List<Passenger> findByNameContaining(@Param("name") String name);
}

