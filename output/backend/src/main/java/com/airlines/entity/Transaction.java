package com.airlines.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achatid")
    private Integer achatId;

    @Column(name = "purchase_date", nullable = false)
    private LocalDate purchaseDate;

    @Column(name = "purchase_time", nullable = false)
    private LocalTime purchaseTime;

    @Column(name = "price", precision = 7, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(name = "employeeid", length = 8, nullable = false)
    private String employeeId;

    @Column(name = "clientid", nullable = false)
    private Integer clientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeid", insertable = false, updatable = false)
    @JsonIgnore
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clientid", insertable = false, updatable = false)
    @JsonIgnore
    private Passenger passenger;

    @OneToMany(mappedBy = "transaction", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> tickets;
}

