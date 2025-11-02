package com.airlines.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PassengerRequest {
    @NotBlank(message = "First name is required")
    @Size(max = 30, message = "First name must not exceed 30 characters")
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 30, message = "Last name must not exceed 30 characters")
    private String lastName;
    
    @NotBlank(message = "Address is required")
    @Size(max = 250, message = "Address must not exceed 250 characters")
    private String address;
    
    @NotBlank(message = "City is required")
    @Size(max = 50, message = "City must not exceed 50 characters")
    private String city;
    
    @NotBlank(message = "Country is required")
    @Size(max = 30, message = "Country must not exceed 30 characters")
    private String country;
    
    @NotBlank(message = "Zip code is required")
    @Size(max = 15, message = "Zip code must not exceed 15 characters")
    private String zipCode;
    
    @NotBlank(message = "Telephone is required")
    @Size(max = 18, message = "Telephone must not exceed 18 characters")
    private String telephone;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;
}

