package com.airlines.repository;

import com.airlines.entity.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AirplaneRepository extends JpaRepository<Airplane, String> {
    Optional<Airplane> findByAirplaneId(String airplaneId);
}

