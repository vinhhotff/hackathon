package com.airlines.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ticket",
    uniqueConstraints = @UniqueConstraint(columnNames = {"flightid", "seatnum"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @Column(name = "ticketid", length = 10)
    private String ticketId;

    @Column(name = "buyid", nullable = false)
    private Integer buyId;

    @Column(name = "clientid", nullable = false)
    private Integer clientId;

    @Column(name = "flightid", nullable = false)
    private Integer flightId;

    @Column(name = "seatnum", length = 3, nullable = false)
    private String seatNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyid", insertable = false, updatable = false)
    @JsonIgnore
    private Transaction transaction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientid", insertable = false, updatable = false)
    @JsonIgnore
    private Passenger passenger;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightid", insertable = false, updatable = false)
    @JsonIgnore
    private Flight flight;
}

