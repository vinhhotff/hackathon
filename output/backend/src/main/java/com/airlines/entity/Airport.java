package com.airlines.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "airport")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Airport {
    @Id
    @Column(name = "airportid", length = 4)
    private String airportId;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "address", length = 250, nullable = false)
    private String address;

    @Column(name = "city", length = 30, nullable = false)
    private String city;

    @Column(name = "country", length = 30, nullable = false)
    private String country;

    @Column(name = "zipcode", length = 15, nullable = false)
    private String zipCode;
}

