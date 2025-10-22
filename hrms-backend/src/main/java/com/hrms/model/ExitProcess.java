package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "exit_processes")
public class ExitProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDate exitDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExitType exitType; // e.g., RESIGNATION, TERMINATION, RETIREMENT

    private String exitInterviewNotes;

    private String knowledgeTransferDetails;

    private String finalSettlementStatus; // e.g., PENDING, COMPLETED

    public enum ExitType {
        RESIGNATION, TERMINATION, RETIREMENT
    }

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

    public LocalDate getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
    }

    public ExitType getExitType() {
        return exitType;
    }

    public void setExitType(ExitType exitType) {
        this.exitType = exitType;
    }

    public String getExitInterviewNotes() {
        return exitInterviewNotes;
    }

    public void setExitInterviewNotes(String exitInterviewNotes) {
        this.exitInterviewNotes = exitInterviewNotes;
    }

    public String getKnowledgeTransferDetails() {
        return knowledgeTransferDetails;
    }

    public void setKnowledgeTransferDetails(String knowledgeTransferDetails) {
        this.knowledgeTransferDetails = knowledgeTransferDetails;
    }

    public String getFinalSettlementStatus() {
        return finalSettlementStatus;
    }

    public void setFinalSettlementStatus(String finalSettlementStatus) {
        this.finalSettlementStatus = finalSettlementStatus;
    }
}