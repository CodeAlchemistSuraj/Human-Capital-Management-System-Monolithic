package com.hrms.controller;

import com.hrms.model.Payroll;
import com.hrms.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @GetMapping
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getPayrollById(@PathVariable Long id) {
        return ResponseEntity.ok(payrollService.getPayrollById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Payroll> generatePayroll(@RequestBody Payroll payroll) {
        return ResponseEntity.ok(payrollService.generatePayroll(payroll));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Payroll> updatePayroll(@PathVariable Long id, @RequestBody Payroll payroll) {
        return ResponseEntity.ok(payrollService.updatePayroll(id, payroll));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<Void> deletePayroll(@PathVariable Long id) {
        payrollService.deletePayroll(id);
        return ResponseEntity.noContent().build();
    }

    // New endpoint for employees to view their own payrolls
    @GetMapping("/employee")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ResponseEntity<List<Payroll>> getEmployeePayrolls(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(payrollService.getPayrollsByEmployeeUsername(username));
    }
}