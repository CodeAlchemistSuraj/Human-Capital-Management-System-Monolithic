// File: src/main/java/com/hrms/controller/OnboardingController.java
package com.hrms.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // Assuming Spring Security is used
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.CandidateDTO;
import com.hrms.dto.OnboardingTaskDTO;
import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.OnboardingTaskStatus;
import com.hrms.service.OnboardingService;


/**
 * REST Controller for managing candidate onboarding processes.
 * Provides endpoints for initiating onboarding, managing tasks, and generating documents.
 */
@RestController
@RequestMapping("/api/onboarding")
@PreAuthorize("hasRole('HR') or hasRole('ADMIN')") // Restrict access to HR and Admin roles
public class OnboardingController {

    private final OnboardingService onboardingService;

    @Autowired
    public OnboardingController(OnboardingService onboardingService) {
        this.onboardingService = onboardingService;
    }

    /**
     * Initiates the onboarding process for a hired candidate.
     *
     * @param candidateDTO The CandidateDTO containing details of the candidate to be onboarded.
     * @return ResponseEntity with the onboarded CandidateDTO and HTTP status 200 OK.
     */
    @PostMapping("/initiate")
    public ResponseEntity<CandidateDTO> initiateOnboarding(@RequestBody CandidateDTO candidateDTO) {
        try {
            CandidateDTO onboardedCandidate = onboardingService.initiateOnboarding(candidateDTO);
            return ResponseEntity.ok(onboardedCandidate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found if candidate ID is provided but not found
        } catch (Exception e) {
            // Log the exception for debugging
            System.err.println("Error initiating onboarding: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }

    /**
     * Retrieves all onboarding tasks for a specific candidate.
     *
     * @param candidateId The ID of the candidate.
     * @return ResponseEntity with a list of OnboardingTaskDTOs and HTTP status 200 OK.
     */
    @GetMapping("/tasks/{candidateId}")
    public ResponseEntity<List<OnboardingTaskDTO>> getOnboardingTasks(@PathVariable Long candidateId) {
        try {
            List<OnboardingTaskDTO> tasks = onboardingService.getOnboardingTasks(candidateId);
            return ResponseEntity.ok(tasks);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // 404 Not Found
        } catch (Exception e) {
            System.err.println("Error fetching onboarding tasks for candidate " + candidateId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Updates the status of a specific onboarding task.
     *
     * @param taskId The ID of the onboarding task to update.
     * @param statusMap A map containing the new status (e.g., {"status": "COMPLETED"}).
     * @return ResponseEntity with the updated OnboardingTaskDTO and HTTP status 200 OK.
     */
    @PutMapping("/tasks/{taskId}/status")
    public ResponseEntity<OnboardingTaskDTO> updateOnboardingTaskStatus(@PathVariable Long taskId,
                                                                        @RequestBody Map<String, String> statusMap) {
        try {
            String statusString = statusMap.get("status");
            if (statusString == null) {
                return ResponseEntity.badRequest().build(); // Missing status in request body
            }
            OnboardingTaskStatus newStatus = OnboardingTaskStatus.valueOf(statusString.toUpperCase());
            OnboardingTaskDTO updatedTask = onboardingService.updateOnboardingTaskStatus(taskId, newStatus);
            return ResponseEntity.ok(updatedTask);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build(); // Invalid status enum value
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // Task not found
        } catch (Exception e) {
            System.err.println("Error updating onboarding task " + taskId + " status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Assigns a custom onboarding task to a candidate.
     *
     * @param candidateId The ID of the candidate.
     * @param taskDetails A map containing task details (taskName, description, dueDate, assignedTo).
     * @return ResponseEntity with the newly created OnboardingTaskDTO and HTTP status 200 OK.
     */
    @PostMapping("/tasks/{candidateId}/custom")
    public ResponseEntity<OnboardingTaskDTO> assignCustomTask(@PathVariable Long candidateId,
                                                              @RequestBody Map<String, String> taskDetails) {
        try {
            String taskName = taskDetails.get("taskName");
            String description = taskDetails.get("description");
            String dueDateString = taskDetails.get("dueDate");
            String assignedTo = taskDetails.get("assignedTo");

            if (taskName == null || description == null || dueDateString == null || assignedTo == null) {
                return ResponseEntity.badRequest().build(); // Missing required fields
            }

            LocalDateTime dueDate = LocalDateTime.parse(dueDateString); // Assuming ISO format for LocalDateTime

            OnboardingTaskDTO newTask = onboardingService.assignCustomTask(
                candidateId, taskName, description, dueDate, assignedTo
            );
            return ResponseEntity.ok(newTask);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // Candidate not found
        } catch (Exception e) {
            System.err.println("Error assigning custom task to candidate " + candidateId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Calculates the onboarding progress for a specific candidate.
     *
     * @param candidateId The ID of the candidate.
     * @return ResponseEntity with the progress percentage (double) and HTTP status 200 OK.
     */
    @GetMapping("/progress/{candidateId}")
    public ResponseEntity<Double> getOnboardingProgress(@PathVariable Long candidateId) {
        try {
            double progress = onboardingService.getOnboardingProgress(candidateId);
            return ResponseEntity.ok(progress);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // Candidate not found
        } catch (Exception e) {
            System.err.println("Error getting onboarding progress for candidate " + candidateId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Generates and returns a welcome kit PDF for the specified candidate.
     *
     * @param candidateId The ID of the candidate.
     * @return ResponseEntity with the PDF as a byte array and appropriate headers, or error status.
     */
    @GetMapping("/welcome-kit/{candidateId}")
    public ResponseEntity<byte[]> generateWelcomeKit(@PathVariable Long candidateId) {
        try {
            byte[] pdfBytes = onboardingService.generateWelcomeKit(candidateId);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            String filename = "welcome_kit_candidate_" + candidateId + ".pdf";
            headers.setContentDispositionFormData("attachment", filename);
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build(); // Candidate not found
        } catch (Exception e) {
            System.err.println("Error generating welcome kit for candidate " + candidateId + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
