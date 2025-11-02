package com.airlines.service;

import com.airlines.dto.LoginRequest;
import com.airlines.dto.LoginResponse;
import com.airlines.dto.UserDTO;
import com.airlines.entity.Employee;
import com.airlines.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final EmployeeRepository employeeRepository;
    private final PasswordEncryptionService passwordEncryptionService;
    private final JwtService jwtService;
    
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Employee employee = employeeRepository.findByEmpId(request.getUserId())
            .orElseThrow(() -> new RuntimeException("PASSWORD OR USERID INCORRECT"));
        
        // Verify password using legacy encryption for migration
        boolean isValid = passwordEncryptionService.verifyPassword(
            request.getPassword(),
            employee.getEmpId(),
            employee.getAdminDate()
        );
        
        if (!isValid) {
            throw new RuntimeException("PASSWORD OR USERID INCORRECT");
        }
        
        String token = jwtService.generateToken(employee);
        
        // Convert Employee to UserDTO to avoid lazy loading issues
        UserDTO userDTO = UserDTO.builder()
            .empId(employee.getEmpId())
            .firstName(employee.getFirstName())
            .lastName(employee.getLastName())
            .address(employee.getAddress())
            .city(employee.getCity())
            .zipCode(employee.getZipCode())
            .telephone(employee.getTelephone())
            .email(employee.getEmail())
            .adminDate(employee.getAdminDate())
            .salary(employee.getSalary())
            .deptId(employee.getDeptId())
            .build();
        
        return new LoginResponse(token, userDTO);
    }
}

