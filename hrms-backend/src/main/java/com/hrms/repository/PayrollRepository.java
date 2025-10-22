package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployee(Employee employee);
    List<Payroll> findByPayrollDateBetween(LocalDate startDate, LocalDate endDate);
}