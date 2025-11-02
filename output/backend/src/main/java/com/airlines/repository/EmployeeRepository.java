package com.airlines.repository;

import com.airlines.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    Optional<Employee> findByEmpId(String empId);
    
    Optional<Employee> findByEmail(String email);
    
    @Query("SELECT e FROM Employee e WHERE e.deptId = :deptId")
    java.util.List<Employee> findByDeptId(@Param("deptId") Integer deptId);
}

