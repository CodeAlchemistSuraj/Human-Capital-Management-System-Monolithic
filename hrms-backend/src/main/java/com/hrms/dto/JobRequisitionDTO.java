// File: src/main/java/com/hrms/dto/JobRequisitionDTO.java
package com.hrms.dto;

import java.time.LocalDate;
import java.time.LocalDateTime; // Assuming some timestamps might be used

/**
 * DTO for JobRequisition, used for transferring data between service and controller layers.
 */
public class JobRequisitionDTO {
    private Long id;
    private String requisitionCode;
    private String jobTitle;
    private String department;
    private String description;
    private String status;
    private int numberOfPositions;
    private LocalDate postedDate;
    private LocalDate closingDate;
    private String hiringManager;
    private String location;

    // Constructors
    public JobRequisitionDTO() {
    }

    public JobRequisitionDTO(Long id, String requisitionCode, String jobTitle, String department,
                             String description, String status, int numberOfPositions,
                             LocalDate postedDate, LocalDate closingDate, String hiringManager,
                             String location) {
        this.id = id;
        this.requisitionCode = requisitionCode;
        this.jobTitle = jobTitle;
        this.department = department;
        this.description = description;
        this.status = status;
        this.numberOfPositions = numberOfPositions;
        this.postedDate = postedDate;
        this.closingDate = closingDate;
        this.hiringManager = hiringManager;
        this.location = location;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequisitionCode() {
        return requisitionCode;
    }

    public void setRequisitionCode(String requisitionCode) {
        this.requisitionCode = requisitionCode;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getNumberOfPositions() {
        return numberOfPositions;
    }

    public void setNumberOfPositions(int numberOfPositions) {
        this.numberOfPositions = numberOfPositions;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    public LocalDate getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(LocalDate closingDate) {
        this.closingDate = closingDate;
    }

    public String getHiringManager() {
        return hiringManager;
    }

    public void setHiringManager(String hiringManager) {
        this.hiringManager = hiringManager;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "JobRequisitionDTO{" +
               "id=" + id +
               ", requisitionCode='" + requisitionCode + '\'' +
               ", jobTitle='" + jobTitle + '\'' +
               ", department='" + department + '\'' +
               ", status='" + status + '\'' +
               ", numberOfPositions=" + numberOfPositions +
               '}';
    }
}
