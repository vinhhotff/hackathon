package com.airlines.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "passenger")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "clientid")
    private Integer clientId;

    @Column(name = "firstname", length = 30, nullable = false)
    private String firstName;

    @Column(name = "lastname", length = 30, nullable = false)
    private String lastName;

    @Column(name = "address", length = 250, nullable = false)
    private String address;

    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @Column(name = "country", length = 30, nullable = false)
    private String country;

    @Column(name = "zipcode", length = 15, nullable = false)
    private String zipCode;

    @Column(name = "telephone", length = 18, nullable = false)
    private String telephone;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @OneToMany(mappedBy = "passenger", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> tickets;
}

