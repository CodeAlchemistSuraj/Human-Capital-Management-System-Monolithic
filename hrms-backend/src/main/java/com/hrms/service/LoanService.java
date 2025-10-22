package com.hrms.service;

import com.hrms.model.LoanApplication;

import java.util.List;

public interface LoanService {
 
    List<LoanApplication> getAllLoanApplications();
    LoanApplication getLoanApplicationById(Long id);
    LoanApplication updateLoanStatus(Long id, String status);
    void deleteLoanApplication(Long id);
    List<LoanApplication> getLoanApplicationsByEmployeeId(Long employeeId);
    List<LoanApplication> getLoanApplicationsByLoanType(LoanApplication.LoanType loanType);
    List<LoanApplication> getLoanApplicationsByStatus(String status);
	LoanApplication applyLoan(LoanApplication loanApplication);
}