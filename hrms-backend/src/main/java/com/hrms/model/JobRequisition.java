// File: src/main/java/com/hrms/model/JobRequisition.java
package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Represents a Job Requisition (Job Opening) within the HRMS.
 * This entity defines the details of a position that needs to be filled.
 */
@Entity
@Table(name = "job_requisitions")
public class JobRequisition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the job requisition

    @Column(nullable = false, unique = true)
    private String requisitionCode; // A unique code for the job requisition (e.g., JR-2024-001)

    @Column(nullable = false)
    private String jobTitle; // The title of the job (e.g., "Software Engineer", "HR Manager")

    @Column(nullable = false)
    private String department; // The department where the job belongs

    @Column(columnDefinition = "TEXT")
    private String description; // Detailed job description

    @Column(nullable = false)
    private String status; // Current status of the requisition (e.g., "OPEN", "CLOSED", "FILLED", "ON_HOLD")

    private int numberOfPositions; // Number of positions available for this requisition

    private LocalDate postedDate; // Date when the requisition was posted

    private LocalDate closingDate; // Date when the requisition is expected to close

    private String hiringManager; // Name or ID of the hiring manager for this position

    private String location; // Job location

    // --- Constructors ---
    public JobRequisition() {
        // Default constructor for JPA
    }

    public JobRequisition(String requisitionCode, String jobTitle, String department, String description,
                          String status, int numberOfPositions, LocalDate postedDate,
                          LocalDate closingDate, String hiringManager, String location) {
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

    // --- Getters and Setters ---
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
        return "JobRequisition{" +
               "id=" + id +
               ", requisitionCode='" + requisitionCode + '\'' +
               ", jobTitle='" + jobTitle + '\'' +
               ", department='" + department + '\'' +
               ", status='" + status + '\'' +
               ", numberOfPositions=" + numberOfPositions +
               ", postedDate=" + postedDate +
               ", closingDate=" + closingDate +
               ", hiringManager='" + hiringManager + '\'' +
               ", location='" + location + '\'' +
               '}';
    }
}
