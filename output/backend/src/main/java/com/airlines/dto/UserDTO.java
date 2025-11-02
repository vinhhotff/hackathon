package com.airlines.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String empId;
    private String firstName;
    private String lastName;
    private String address;
    private String city;
    private String zipCode;
    private String telephone;
    private String email;
    private LocalDate adminDate;
    private BigDecimal salary;
    private Integer deptId;
}

