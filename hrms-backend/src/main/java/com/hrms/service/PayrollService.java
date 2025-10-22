package com.hrms.service;

import com.hrms.model.Payroll;

import java.time.LocalDate;
import java.util.List;

public interface PayrollService {
    Payroll generatePayroll(Payroll payroll);
    List<Payroll> getAllPayrolls();
    Payroll getPayrollById(Long id);
    Payroll updatePayroll(Long id, Payroll payroll);
    void deletePayroll(Long id);
    List<Payroll> getPayrollsByEmployeeId(Long employeeId);
    List<Payroll> getPayrollsByDateRange(LocalDate startDate, LocalDate endDate);
    List<Payroll> getPayrollsByEmployeeUsername(String username);
}