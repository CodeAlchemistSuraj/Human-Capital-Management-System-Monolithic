package com.hrms.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PayrollDTO {

    private Long id;
    private Long employeeId;
    private LocalDate payrollDate;
    private BigDecimal basicSalary;
    private BigDecimal allowances;
    private BigDecimal deductions;
    private BigDecimal netSalary;
    private BigDecimal pfContribution;
    private BigDecimal esiContribution;
    private BigDecimal tds;
    private String payslipStatus;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getPayrollDate() {
        return payrollDate;
    }

    public void setPayrollDate(LocalDate payrollDate) {
        this.payrollDate = payrollDate;
    }

    public BigDecimal getBasicSalary() {
        return basicSalary;
    }

    public void setBasicSalary(BigDecimal basicSalary) {
        this.basicSalary = basicSalary;
    }

    public BigDecimal getAllowances() {
        return allowances;
    }

    public void setAllowances(BigDecimal allowances) {
        this.allowances = allowances;
    }

    public BigDecimal getDeductions() {
        return deductions;
    }

    public void setDeductions(BigDecimal deductions) {
        this.deductions = deductions;
    }

    public BigDecimal getNetSalary() {
        return netSalary;
    }

    public void setNetSalary(BigDecimal netSalary) {
        this.netSalary = netSalary;
    }

    public BigDecimal getPfContribution() {
        return pfContribution;
    }

    public void setPfContribution(BigDecimal pfContribution) {
        this.pfContribution = pfContribution;
    }

    public BigDecimal getEsiContribution() {
        return esiContribution;
    }

    public void setEsiContribution(BigDecimal esiContribution) {
        this.esiContribution = esiContribution;
    }

    public BigDecimal getTds() {
        return tds;
    }

    public void setTds(BigDecimal tds) {
        this.tds = tds;
    }

    public String getPayslipStatus() {
        return payslipStatus;
    }

    public void setPayslipStatus(String payslipStatus) {
        this.payslipStatus = payslipStatus;
    }
}