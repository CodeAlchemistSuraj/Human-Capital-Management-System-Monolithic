// File: src/main/java/com/hrms/dto/OnboardingTaskDTO.java
package com.hrms.dto;

import com.hrms.model.OnboardingTaskStatus;

import java.time.LocalDateTime;

/**
 * DTO for OnboardingTask, used for transferring data between service and controller layers.
 */
public class OnboardingTaskDTO {
    private Long id;
    private Long candidateId; // Changed from employeeId
    private String taskName;
    private String description;
    private OnboardingTaskStatus status;
    private LocalDateTime assignedDate;
    private LocalDateTime dueDate;
    private LocalDateTime completedDate;
    private String assignedTo;

    // --- Constructors ---

    public OnboardingTaskDTO() {
    }

    public OnboardingTaskDTO(Long id, Long candidateId, String taskName, String description,
                             OnboardingTaskStatus status, LocalDateTime assignedDate,
                             LocalDateTime dueDate, LocalDateTime completedDate, String assignedTo) {
        this.id = id;
        this.candidateId = candidateId;
        this.taskName = taskName;
        this.description = description;
        this.status = status;
        this.assignedDate = assignedDate;
        this.dueDate = dueDate;
        this.completedDate = completedDate;
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
        return "OnboardingTaskDTO{" +
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
