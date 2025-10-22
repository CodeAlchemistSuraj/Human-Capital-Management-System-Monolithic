package com.hrms.service.impl;


import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.Payroll;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.PayrollRepository;
import com.hrms.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PayrollServiceImpl implements PayrollService {

    @Autowired
    private PayrollRepository payrollRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Payroll generatePayroll(Payroll payroll) {
        Employee employee = employeeRepository.findById(payroll.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + payroll.getEmployee().getId()));
        payroll.setEmployee(employee);
        payroll.setPayslipStatus("PENDING"); // Default status
        // Basic net salary calculation (can be expanded for 7th Pay Commission logic)
        payroll.setNetSalary(payroll.getBasicSalary()
                .add(payroll.getAllowances() != null ? payroll.getAllowances() : BigDecimal.ZERO)
                .subtract(payroll.getDeductions() != null ? payroll.getDeductions() : BigDecimal.ZERO));
        return payrollRepository.save(payroll);
    }

    @Override
    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }

    @Override
    public Payroll getPayrollById(Long id) {
        return payrollRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payroll not found with id: " + id));
    }

    @Override
    public Payroll updatePayroll(Long id, Payroll payrollDetails) {
        Payroll payroll = getPayrollById(id);
        payroll.setPayrollDate(payrollDetails.getPayrollDate());
        payroll.setBasicSalary(payrollDetails.getBasicSalary());
        payroll.setAllowances(payrollDetails.getAllowances());
        payroll.setDeductions(payrollDetails.getDeductions());
        payroll.setPfContribution(payrollDetails.getPfContribution());
        payroll.setEsiContribution(payrollDetails.getEsiContribution());
        payroll.setTds(payrollDetails.getTds());
        payroll.setPayslipStatus(payrollDetails.getPayslipStatus());
        payroll.setNetSalary(payrollDetails.getBasicSalary()
                .add(payrollDetails.getAllowances() != null ? payrollDetails.getAllowances() : BigDecimal.ZERO)
                .subtract(payrollDetails.getDeductions() != null ? payrollDetails.getDeductions() : BigDecimal.ZERO));
        return payrollRepository.save(payroll);
    }

    @Override
    public void deletePayroll(Long id) {
        Payroll payroll = getPayrollById(id);
        payrollRepository.delete(payroll);
    }

    @Override
    public List<Payroll> getPayrollsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return payrollRepository.findByEmployee(employee);
    }

    @Override
    public List<Payroll> getPayrollsByDateRange(LocalDate startDate, LocalDate endDate) {
        return payrollRepository.findByPayrollDateBetween(startDate, endDate);
    }
    
    @Override
    public List<Payroll> getPayrollsByEmployeeUsername(String username) {
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new ResourceNotFoundException("Employee not found with username: " + username);
        }
        return payrollRepository.findByEmployee(employee);
    }
}