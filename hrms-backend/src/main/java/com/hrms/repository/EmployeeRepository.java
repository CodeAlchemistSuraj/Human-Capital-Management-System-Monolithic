package com.hrms.repository;

import com.hrms.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Employee findByEmployeeId(String employeeId);
	Employee findByEmail(String email);
	Employee findByUsername(String username);
}