// File: src/main/java/com/hrms/service/OnboardingService.java
package com.hrms.service;

import com.hrms.dto.CandidateDTO;
import com.hrms.dto.OnboardingTaskDTO;
import com.hrms.model.Candidate;
import com.hrms.model.User;
import com.hrms.model.AuditLog;
import com.hrms.model.OnboardingTask;
import com.hrms.model.OnboardingTaskStatus;
import com.hrms.repository.CandidateRepository;
import com.hrms.repository.OnboardingTaskRepository;
import com.hrms.repository.UserRepository;
import com.hrms.exception.ResourceNotFoundException;
import com.hrms.util.EmailService;
import com.hrms.util.PdfGeneratorUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class responsible for managing the candidate onboarding process.
 * This includes initiating onboarding for a hired candidate, managing tasks, sending notifications,
 * and generating documents.
 */
@Service
public class OnboardingService {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final OnboardingTaskRepository onboardingTaskRepository;
    private final EmailService emailService;
    private final AuditLogService auditLogService;
    private final PdfGeneratorUtil pdfGeneratorUtil;
    private final SystemSettingService systemSettingService;

    @Autowired
    public OnboardingService(CandidateRepository candidateRepository,
                             UserRepository userRepository,
                             OnboardingTaskRepository onboardingTaskRepository,
                             EmailService emailService,
                             AuditLogService auditLogService,
                             PdfGeneratorUtil pdfGeneratorUtil,
                             SystemSettingService systemSettingService) {
        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
        this.onboardingTaskRepository = onboardingTaskRepository;
        this.emailService = emailService;
        this.auditLogService = auditLogService;
        this.pdfGeneratorUtil = pdfGeneratorUtil;
        this.systemSettingService = systemSettingService;
    }

    /**
     * Initiates the onboarding process for a new candidate who has been hired.
     * This involves updating the candidate record, creating a user account (if applicable),
     * assigning default tasks, and sending a welcome email.
     *
     * @param candidateDTO The DTO containing candidate details for onboarding.
     * @return The CandidateDTO of the newly onboarded candidate.
     * @throws IllegalArgumentException if candidateDTO is null or essential fields are missing.
     * @throws ResourceNotFoundException if the candidate is not found (if updating existing).
     */
    @Transactional
    public CandidateDTO initiateOnboarding(CandidateDTO candidateDTO) {
        if (candidateDTO == null) {
            throw new IllegalArgumentException("Candidate DTO cannot be null for onboarding initiation.");
        }

        Candidate candidate;
        if (candidateDTO.getId() != null) {
            // If ID is provided, assume we are updating an existing candidate (e.g., changing status to HIRED/ONBOARDING)
            candidate = candidateRepository.findById(candidateDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateDTO.getId()));
        } else {
            // Otherwise, create a new candidate record if this is the first step
            candidate = new Candidate();
        }

        // Map DTO to Entity
        candidate.setFirstName(candidateDTO.getFirstName());
        candidate.setLastName(candidateDTO.getLastName());
        candidate.setEmail(candidateDTO.getEmail());
        candidate.setJobTitle(candidateDTO.getJobTitle());
        candidate.setResumePath(candidateDTO.getResumePath());
        candidate.setApplicationDate(candidateDTO.getApplicationDate() != null ? candidateDTO.getApplicationDate() : LocalDate.now());
        candidate.setStatus("ONBOARDING"); // Set status to ONBOARDING

        // New fields from CandidateDTO to Candidate model
        candidate.setAddress(candidateDTO.getAddress());
        candidate.setDateOfBirth(candidateDTO.getDateOfBirth());
        candidate.setGender(candidateDTO.getGender());
        candidate.setMaritalStatus(candidateDTO.getMaritalStatus());
        candidate.setNationality(candidateDTO.getNationality());
        candidate.setPhoneNumber(candidateDTO.getPhoneNumber());
        candidate.setEmergencyContactName(candidateDTO.getEmergencyContactName());
        candidate.setEmergencyContactPhone(candidateDTO.getEmergencyContactPhone());


        Candidate savedCandidate = candidateRepository.save(candidate);

        // 2. Create User Account (This step assumes that once a candidate starts onboarding, they become an "employee"
        // and require a system user account. If user accounts are only created after full hire, this logic might need adjustment.)
        User newUser = new User();
        newUser.setUsername(generateUsername(savedCandidate.getFirstName(), savedCandidate.getLastName()));
        newUser.setEmail(savedCandidate.getEmail());
        newUser.setPassword("defaultPassword"); // In a real app, generate strong password and force reset
        newUser.setRole("EMPLOYEE"); // Assign default role
        newUser.setCreatedAt(LocalDateTime.now());
        userRepository.save(newUser);

        // 3. Assign Default Onboarding Tasks
        assignDefaultOnboardingTasks(savedCandidate.getId());

        // 4. Send Welcome Email
        sendWelcomeEmail(savedCandidate.getEmail(), savedCandidate.getFirstName(), savedCandidate.getId()); // Pass candidate ID

        // 5. Notify Stakeholders (HR, IT, Hiring Manager)
        sendOnboardingNotification(savedCandidate.getId(), "NEW_HIRE_ONBOARDING_NOTIFICATION");

        // 6. Log the onboarding initiation
        auditLogService.logAction(
            "Onboarding Initiated", // Action description
            "Candidate", // Entity Type
            savedCandidate.getId() // Entity ID
        );

        // Map saved candidate back to DTO
        CandidateDTO onboardedCandidateDTO = new CandidateDTO();
        onboardedCandidateDTO.setId(savedCandidate.getId());
        onboardedCandidateDTO.setFirstName(savedCandidate.getFirstName());
        onboardedCandidateDTO.setLastName(savedCandidate.getLastName());
        onboardedCandidateDTO.setEmail(savedCandidate.getEmail());
        onboardedCandidateDTO.setJobTitle(savedCandidate.getJobTitle());
        onboardedCandidateDTO.setResumePath(savedCandidate.getResumePath());
        onboardedCandidateDTO.setApplicationDate(savedCandidate.getApplicationDate());
        onboardedCandidateDTO.setStatus(savedCandidate.getStatus());
        // Map new fields back to DTO
        onboardedCandidateDTO.setAddress(savedCandidate.getAddress());
        onboardedCandidateDTO.setDateOfBirth(savedCandidate.getDateOfBirth());
        onboardedCandidateDTO.setGender(savedCandidate.getGender());
        onboardedCandidateDTO.setMaritalStatus(savedCandidate.getMaritalStatus());
        onboardedCandidateDTO.setNationality(savedCandidate.getNationality());
        onboardedCandidateDTO.setPhoneNumber(savedCandidate.getPhoneNumber());
        onboardedCandidateDTO.setEmergencyContactName(savedCandidate.getEmergencyContactName());
        onboardedCandidateDTO.setEmergencyContactPhone(savedCandidate.getEmergencyContactPhone());
        return onboardedCandidateDTO;
    }

    /**
     * Assigns a predefined set of default onboarding tasks to a new candidate.
     * These tasks can be configured via system settings.
     *
     * @param candidateId The ID of the candidate to assign tasks to.
     */
    private void assignDefaultOnboardingTasks(Long candidateId) {
        List<String> defaultTasks = systemSettingService.getSettingValue("onboarding.defaultTasks", List.class)
                                        .orElse(List.of(
                                            "Complete HR Forms",
                                            "IT Account Setup",
                                            "Attend New Hire Orientation",
                                            "Review Employee Handbook",
                                            "Meet Your Hiring Manager"
                                        ));

        for (String taskName : defaultTasks) {
            OnboardingTask task = new OnboardingTask();
            task.setCandidateId(candidateId);
            task.setTaskName(taskName);
            task.setDescription("Please complete the task: " + taskName);
            task.setStatus(OnboardingTaskStatus.PENDING);
            task.setAssignedDate(LocalDateTime.now());
            task.setDueDate(LocalDateTime.now().plusDays(7));
            task.setAssignedTo(getResponsiblePartyForTask(taskName));
            onboardingTaskRepository.save(task);
        }
        auditLogService.logAction(
            "Assigned Default Onboarding Tasks",
            "Candidate",
            candidateId
        );
    }

    /**
     * Helper method to determine the responsible party for a given task.
     * This could be based on task name patterns or a configuration.
     * @param taskName The name of the task.
     * @return The responsible party (e.g., "HR", "IT", "Candidate").
     */
    private String getResponsiblePartyForTask(String taskName) {
        if (taskName.contains("HR Forms") || taskName.contains("Handbook")) {
            return "Candidate";
        } else if (taskName.contains("IT Account")) {
            return "IT Department";
        } else if (taskName.contains("Orientation") || taskName.contains("Manager")) {
            return "HR Department";
        }
        return "Unknown";
    }

    /**
     * Sends a welcome email to the newly onboarded candidate.
     *
     * @param email The email address of the candidate.
     * @param firstName The first name of the candidate.
     * @param candidateId The ID of the candidate.
     */
    private void sendWelcomeEmail(String email, String firstName, Long candidateId) {
        String subject = systemSettingService.getSettingValue("onboarding.welcomeEmailSubject", String.class)
                                .orElse("Welcome to Our Company!");
        String body = systemSettingService.getSettingValue("onboarding.welcomeEmailBody", String.class)
                            .orElse("Dear " + firstName + ",\n\nWelcome to the team! We are thrilled to have you join us.");
        try {
            emailService.sendEmail(email, subject, body);
            auditLogService.logAction(
                "Welcome Email Sent",
                "Candidate",
                candidateId
            );
        } catch (Exception e) {
            System.err.println("Failed to send welcome email to " + email + ": " + e.getMessage());
            auditLogService.logAction(
                "Welcome Email Failed",
                "Candidate",
                candidateId
            );
        }
    }

    /**
     * Sends notifications to relevant stakeholders (HR, IT, Hiring Manager) about a candidate starting onboarding.
     * The type of notification can vary.
     *
     * @param candidateId The ID of the candidate.
     * @param notificationType The type of notification (e.g., "NEW_HIRE_ONBOARDING_NOTIFICATION").
     */
    public void sendOnboardingNotification(Long candidateId, String notificationType) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateId));

        String subject = "";
        String body = "";
        List<String> recipients = new java.util.ArrayList<>();

        switch (notificationType) {
            case "NEW_HIRE_ONBOARDING_NOTIFICATION":
                subject = "Candidate Onboarding Started: " + candidate.getFirstName() + " " + candidate.getLastName();
                body = String.format("Candidate %s %s (%s), for job title %s, has started the onboarding process.",
                    candidate.getFirstName(), candidate.getLastName(), candidate.getEmail(), candidate.getJobTitle());
                recipients.add(systemSettingService.getSettingValue("notification.hrEmail", String.class).orElse("hr@example.com"));
                recipients.add(systemSettingService.getSettingValue("notification.itEmail", String.class).orElse("it@example.com"));
                // Add logic to get hiring manager's email if available in Candidate or JobRequisition
                break;
            default:
                System.err.println("Unknown notification type: " + notificationType);
                return;
        }

        for (String recipient : recipients) {
            try {
                emailService.sendEmail(recipient, subject, body);
                auditLogService.logAction(
                    "Onboarding Notification Sent: " + notificationType,
                    "Candidate",
                    candidateId
                );
            } catch (Exception e) {
                System.err.println("Failed to send notification to " + recipient + ": " + e.getMessage());
                auditLogService.logAction(
                    "Onboarding Notification Failed: " + notificationType,
                    "Candidate",
                    candidateId
                );
            }
        }
    }

    /**
     * Retrieves all onboarding tasks for a specific candidate.
     *
     * @param candidateId The ID of the candidate.
     * @return A list of OnboardingTaskDTOs.
     * @throws ResourceNotFoundException if the candidate is not found.
     */
    public List<OnboardingTaskDTO> getOnboardingTasks(Long candidateId) {
        candidateRepository.findById(candidateId)
            .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateId));

        List<OnboardingTask> tasks = onboardingTaskRepository.findByCandidateId(candidateId);
        return tasks.stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    /**
     * Updates the status of a specific onboarding task.
     *
     * @param taskId The ID of the task to update.
     * @param newStatus The new status for the task.
     * @return The updated OnboardingTaskDTO.
     * @throws ResourceNotFoundException if the task is not found.
     */
    @Transactional
    public OnboardingTaskDTO updateOnboardingTaskStatus(Long taskId, OnboardingTaskStatus newStatus) {
        OnboardingTask task = onboardingTaskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Onboarding task not found with ID: " + taskId));

        task.setStatus(newStatus);
        if (newStatus == OnboardingTaskStatus.COMPLETED) {
            task.setCompletedDate(LocalDateTime.now());
        } else if (newStatus == OnboardingTaskStatus.PENDING || newStatus == OnboardingTaskStatus.IN_PROGRESS) {
            task.setCompletedDate(null);
        }

        OnboardingTask updatedTask = onboardingTaskRepository.save(task);

        auditLogService.logAction(
            "Onboarding Task Status Updated to " + newStatus.name(),
            "OnboardingTask",
            taskId
        );
        return convertToDto(updatedTask);
    }

    /**
     * Assigns a custom onboarding task to a candidate.
     *
     * @param candidateId The ID of the candidate.
     * @param taskName The name of the custom task.
     * @param description The description of the custom task.
     * @param dueDate The due date for the task.
     * @param assignedTo The party responsible for the task.
     * @return The newly created OnboardingTaskDTO.
     * @throws ResourceNotFoundException if the candidate is not found.
     */
    @Transactional
    public OnboardingTaskDTO assignCustomTask(Long candidateId, String taskName, String description, LocalDateTime dueDate, String assignedTo) {
        candidateRepository.findById(candidateId)
            .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateId));

        OnboardingTask customTask = new OnboardingTask();
        customTask.setCandidateId(candidateId);
        customTask.setTaskName(taskName);
        customTask.setDescription(description);
        customTask.setStatus(OnboardingTaskStatus.PENDING);
        customTask.setAssignedDate(LocalDateTime.now());
        customTask.setDueDate(dueDate);
        customTask.setAssignedTo(assignedTo);

        OnboardingTask savedTask = onboardingTaskRepository.save(customTask);

        auditLogService.logAction(
            "Custom Onboarding Task Assigned: " + taskName,
            "OnboardingTask",
            savedTask.getId() // Use the ID of the newly saved task
        );
        return convertToDto(savedTask);
    }

    /**
     * Calculates the onboarding progress for a candidate based on completed tasks.
     *
     * @param candidateId The ID of the candidate.
     * @return The percentage of completed tasks (0-100).
     * @throws ResourceNotFoundException if the candidate is not found.
     */
    public double getOnboardingProgress(Long candidateId) {
        candidateRepository.findById(candidateId)
            .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateId));

        List<OnboardingTask> tasks = onboardingTaskRepository.findByCandidateId(candidateId);
        if (tasks.isEmpty()) {
            return 0.0;
        }

        long completedTasks = tasks.stream()
            .filter(task -> task.getStatus() == OnboardingTaskStatus.COMPLETED)
            .count();

        return (double) completedTasks / tasks.size() * 100.0;
    }

    /**
     * Generates a welcome kit PDF for the candidate.
     * This could include offer letters, pre-onboarding documents, etc.
     *
     * @param candidateId The ID of the candidate.
     * @return A byte array representing the generated PDF.
     * @throws ResourceNotFoundException if the candidate is not found.
     * @throws RuntimeException if PDF generation fails.
     */
    public byte[] generateWelcomeKit(Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
            .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with ID: " + candidateId));

        String content = String.format(
            "<h1>Welcome Kit for %s %s</h1>" +
            "<p>Dear %s,</p>" +
            "<p>We are thrilled to welcome you to our team as a %s.</p>" +
            "<p>Your application date was %s.</p>" +
            "<p>This kit contains important information to help you get started with your onboarding.</p>" +
            "<p>Best Regards,</p>" +
            "<p>HR Team</p>",
            candidate.getFirstName(), candidate.getLastName(),
            candidate.getFirstName(), candidate.getJobTitle(),
            candidate.getApplicationDate().toString()
        );

        try {
            byte[] pdfBytes = pdfGeneratorUtil.generatePdfFromHtml(content);
            auditLogService.logAction(
                "Welcome Kit Generated",
                "Candidate",
                candidateId
            );
            return pdfBytes;
        } catch (Exception e) {
            auditLogService.logAction(
                "Welcome Kit Generation Failed",
                "Candidate",
                candidateId
            );
            throw new RuntimeException("Failed to generate welcome kit PDF: " + e.getMessage(), e);
        }
    }

    /**
     * Helper method to convert an OnboardingTask entity to an OnboardingTaskDTO.
     * @param task The OnboardingTask entity.
     * @return The corresponding OnboardingTaskDTO.
     */
    private OnboardingTaskDTO convertToDto(OnboardingTask task) {
        OnboardingTaskDTO dto = new OnboardingTaskDTO();
        dto.setId(task.getId());
        dto.setCandidateId(task.getCandidateId());
        dto.setTaskName(task.getTaskName());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setAssignedDate(task.getAssignedDate());
        dto.setDueDate(task.getDueDate());
        dto.setCompletedDate(task.getCompletedDate());
        dto.setAssignedTo(task.getAssignedTo());
        return dto;
    }

    /**
     * Generates a simple username based on first and last name.
     * In a real application, this would be more sophisticated to ensure uniqueness.
     * @param firstName Candidate's first name.
     * @param lastName Candidate's last name.
     * @return Generated username.
     */
    private String generateUsername(String firstName, String lastName) {
        String baseUsername = (firstName.toLowerCase().charAt(0) + lastName.toLowerCase()).replaceAll("\\s", "");
        return baseUsername + (System.currentTimeMillis() % 1000);
    }
}
