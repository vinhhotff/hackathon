package com.airlines.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @Column(name = "empid", length = 8)
    private String empId;

    @Column(name = "firstname", length = 30, nullable = false)
    private String firstName;

    @Column(name = "lastname", length = 30, nullable = false)
    private String lastName;

    @Column(name = "address", length = 100, nullable = false)
    private String address;

    @Column(name = "city", length = 50, nullable = false)
    private String city;

    @Column(name = "zipcode", length = 15, nullable = false)
    private String zipCode;

    @Column(name = "telephone", length = 10, nullable = false)
    private String telephone;

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email;

    @Column(name = "admin_date", nullable = false)
    private LocalDate adminDate;

    @Column(name = "salary", precision = 8, scale = 2, nullable = false)
    private BigDecimal salary;

    @Column(name = "deptid", nullable = false)
    private Integer deptId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deptid", insertable = false, updatable = false)
    @JsonIgnore
    private Department department;
}

