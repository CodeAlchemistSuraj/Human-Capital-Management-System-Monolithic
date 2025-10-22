package com.hrms.controller;

import com.hrms.model.LoanApplication;
import com.hrms.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    @Autowired
    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping
    public ResponseEntity<LoanApplication> applyLoan(@RequestBody LoanApplication loanApplication) {
        return ResponseEntity.ok(loanService.applyLoan(loanApplication));
    }

    @GetMapping
    public ResponseEntity<List<LoanApplication>> getAllLoanApplications() {
        return ResponseEntity.ok(loanService.getAllLoanApplications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanApplication> getLoanApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(loanService.getLoanApplicationById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LoanApplication> updateLoanStatus(@PathVariable Long id, @RequestBody String status) {
        return ResponseEntity.ok(loanService.updateLoanStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanApplication(@PathVariable Long id) {
        loanService.deleteLoanApplication(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LoanApplication>> getLoanApplicationsByEmployeeId(@PathVariable Long employeeId) {
        return ResponseEntity.ok(loanService.getLoanApplicationsByEmployeeId(employeeId));
    }

    @GetMapping("/type/{loanType}")
    public ResponseEntity<List<LoanApplication>> getLoanApplicationsByLoanType(@PathVariable String loanType) {
        return ResponseEntity.ok(loanService.getLoanApplicationsByLoanType(LoanApplication.LoanType.valueOf(loanType)));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LoanApplication>> getLoanApplicationsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(loanService.getLoanApplicationsByStatus(status));
    }
}