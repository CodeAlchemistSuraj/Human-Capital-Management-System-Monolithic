package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.LoanApplication;
import com.hrms.model.LoanApplication.LoanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByEmployee(Employee employee);
    List<LoanApplication> findByLoanType(LoanType loanType);
    List<LoanApplication> findByStatus(String status);
}