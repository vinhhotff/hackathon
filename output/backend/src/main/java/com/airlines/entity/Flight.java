package com.airlines.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "flight")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flightid")
    private Integer flightId;

    @Column(name = "flight_date", nullable = false)
    private LocalDate flightDate;

    @Column(name = "dep_time", nullable = false)
    private LocalTime depTime;

    @Column(name = "arr_time", nullable = false)
    private LocalTime arrTime;

    @Column(name = "tot_pass", nullable = false)
    private Integer totPass;

    @Column(name = "tot_baggage", nullable = false)
    private Integer totBaggage;

    @Column(name = "flightnum", length = 6, nullable = false)
    private String flightNum;

    @Column(name = "shiftid", nullable = false)
    private Integer shiftId;

    @Column(name = "airplaneid", length = 8, nullable = false)
    private String airplaneId;

    @Column(name = "airport_dep", length = 4, nullable = false)
    private String airportDep;

    @Column(name = "airport_arr", length = 4, nullable = false)
    private String airportArr;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airplaneid", insertable = false, updatable = false)
    @JsonIgnore
    private Airplane airplane;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airport_dep", referencedColumnName = "airportid", insertable = false, updatable = false)
    @JsonIgnore
    private Airport departureAirport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "airport_arr", referencedColumnName = "airportid", insertable = false, updatable = false)
    @JsonIgnore
    private Airport arrivalAirport;

    @OneToMany(mappedBy = "flight", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> tickets;
}

