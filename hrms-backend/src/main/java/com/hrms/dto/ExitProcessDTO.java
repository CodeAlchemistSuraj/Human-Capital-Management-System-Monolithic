package com.hrms.dto;

import java.time.LocalDate;

public class ExitProcessDTO {

    private Long id;
    private Long employeeId;
    private LocalDate exitDate;
    private String exitType;
    private String exitInterviewNotes;
    private String knowledgeTransferDetails;
    private String finalSettlementStatus;

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

    public LocalDate getExitDate() {
        return exitDate;
    }

    public void setExitDate(LocalDate exitDate) {
        this.exitDate = exitDate;
    }

    public String getExitType() {
        return exitType;
    }

    public void setExitType(String exitType) {
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