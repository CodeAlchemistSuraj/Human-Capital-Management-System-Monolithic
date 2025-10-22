// File: src/main/java/com/hrms/model/OnboardingTask.java
package com.hrms.model;

import jakarta.persistence.*; // Changed from javax.persistence to jakarta.persistence for consistency
import java.time.LocalDateTime;

/**
 * Represents an individual task within the candidate onboarding process.
 * Each task is associated with a specific candidate.
 */
@Entity
@Table(name = "onboarding_tasks")
public class OnboardingTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the onboarding task

    @Column(nullable = false)
    private Long candidateId; // Foreign key to the Candidate entity (changed from employeeId)

    @Column(nullable = false)
    private String taskName; // Name of the task (e.g., "Complete HR Forms", "IT Setup")

    @Column(columnDefinition = "TEXT")
    private String description; // Detailed description of the task

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OnboardingTaskStatus status; // Current status of the task (PENDING, IN_PROGRESS, COMPLETED, OVERDUE, CANCELLED)

    @Column(nullable = false)
    private LocalDateTime assignedDate; // Date and time when the task was assigned

    private LocalDateTime dueDate; // Optional: Date and time when the task is due

    private LocalDateTime completedDate; // Optional: Date and time when the task was completed

    private String assignedTo; // Role or department responsible for the task (e.g., "HR", "IT", "Candidate", "Hiring Manager")

    // --- Constructors ---

    public OnboardingTask() {
        // Default constructor for JPA
    }

    public OnboardingTask(Long candidateId, String taskName, String description, OnboardingTaskStatus status,
                          LocalDateTime assignedDate, LocalDateTime dueDate, String assignedTo) {
        this.candidateId = candidateId;
        this.taskName = taskName;
        this.description = description;
        this.status = status;
        this.assignedDate = assignedDate;
        this.dueDate = dueDate;
        this.assignedTo = assignedTo;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public OnboardingTaskStatus getStatus() {
        return status;
    }

    public void setStatus(OnboardingTaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(LocalDateTime assignedDate) {
        this.assignedDate = assignedDate;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDateTime completedDate) {
        this.completedDate = completedDate;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    @Override
    public String toString() {
        return "OnboardingTask{" +
               "id=" + id +
               ", candidateId=" + candidateId +
               ", taskName='" + taskName + '\'' +
               ", status=" + status +
               ", assignedDate=" + assignedDate +
               ", dueDate=" + dueDate +
               ", completedDate=" + completedDate +
               ", assignedTo='" + assignedTo + '\'' +
               '}';
    }
}
