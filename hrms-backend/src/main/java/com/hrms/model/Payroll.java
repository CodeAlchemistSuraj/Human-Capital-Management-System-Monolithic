package com.hrms.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payrolls")
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDate payrollDate;

    @Column(nullable = false)
    private BigDecimal basicSalary;

    private BigDecimal allowances;

    private BigDecimal deductions;

    private BigDecimal netSalary;

    private BigDecimal pfContribution;

    private BigDecimal esiContribution;

    private BigDecimal tds;

    private String payslipStatus; // e.g., GENERATED, SENT, PENDING

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
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