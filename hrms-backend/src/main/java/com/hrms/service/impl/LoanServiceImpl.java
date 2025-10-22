package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.LoanApplication;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.LoanRepository;
import com.hrms.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public LoanApplication applyLoan(LoanApplication loanApplication) {
        Employee employee = employeeRepository.findById(loanApplication.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + loanApplication.getEmployee().getId()));
        loanApplication.setEmployee(employee);
        loanApplication.setStatus("HR_EVALUATION"); // Default status
        return loanRepository.save(loanApplication);
    }

    @Override
    public List<LoanApplication> getAllLoanApplications() {
        return loanRepository.findAll();
    }

    @Override
    public LoanApplication getLoanApplicationById(Long id) {
        return loanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LoanApplication not found with id: " + id));
    }

    @Override
    public LoanApplication updateLoanStatus(Long id, String status) {
        LoanApplication loanApplication = getLoanApplicationById(id);
        if (!List.of("HR_EVALUATION", "LEGAL_VERIFICATION", "SECRETARY_APPROVAL", "APPROVED", "REJECTED").contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
        loanApplication.setStatus(status);
        return loanRepository.save(loanApplication);
    }

    @Override
    public void deleteLoanApplication(Long id) {
        LoanApplication loanApplication = getLoanApplicationById(id);
        loanRepository.delete(loanApplication);
    }

    @Override
    public List<LoanApplication> getLoanApplicationsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return loanRepository.findByEmployee(employee);
    }

    @Override
    public List<LoanApplication> getLoanApplicationsByLoanType(LoanApplication.LoanType loanType) {
        return loanRepository.findByLoanType(loanType);
    }

    @Override
    public List<LoanApplication> getLoanApplicationsByStatus(String status) {
        return loanRepository.findByStatus(status);
    }
}