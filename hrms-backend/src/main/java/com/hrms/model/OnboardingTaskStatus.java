
package com.hrms.model;

// Enum representing the status of an onboarding task.
public enum OnboardingTaskStatus {
    /** Task is pending and not yet started. */
    PENDING,
    /** Task is currently in progress. */
    IN_PROGRESS,
    /** Task has been successfully completed. */
    COMPLETED,
    /** Task is overdue and has not been completed by its due date. */
    OVERDUE,
    /** Task has been cancelled. */
    CANCELLED
}
