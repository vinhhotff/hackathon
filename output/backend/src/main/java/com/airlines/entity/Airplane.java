package com.airlines.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "airplane")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Airplane {
    @Id
    @Column(name = "airplaneid", length = 8)
    private String airplaneId;

    @Column(name = "type", length = 8, nullable = false)
    private String type;

    @Column(name = "num_seats", nullable = false)
    private Integer numSeats;

    @Column(name = "fuel_capacity", nullable = false)
    private Integer fuelCapacity;
}

