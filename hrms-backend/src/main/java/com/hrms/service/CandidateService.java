// src/main/java/com/hrms/service/CandidateService.java
package com.hrms.service;

import com.hrms.dto.CandidateDTO;
import com.hrms.model.Candidate; // Assuming Candidate model might be used in some service methods
import java.util.List;
import java.util.Map;

/**
 * Service interface for managing Candidate-related operations.
 * Defines the contract for candidate data retrieval, updates, and HR actions.
 */
public interface CandidateService {

    /**
     * Retrieves a candidate's details by their ID.
     * @param id The ID of the candidate.
     * @return A CandidateDTO containing the candidate's details, or null if not found.
     */
    CandidateDTO getCandidateById(Long id);

    /**
     * Updates an existing candidate's details.
     * @param id The ID of the candidate to update.
     * @param candidateDTO A DTO containing the updated candidate information.
     * @return The updated CandidateDTO, or null if the candidate was not found.
     */
    CandidateDTO updateCandidate(Long id, CandidateDTO candidateDTO);

    /**
     * Retrieves a list of applicants (candidates) for a specific job ID.
     * @param jobId The ID of the job requisition.
     * @return A list of CandidateDTOs who applied for the job.
     */
    List<CandidateDTO> getApplicantsByJobId(Long jobId);

    /**
     * Schedules an interview for a specific candidate.
     * @param id The ID of the candidate.
     * @param scheduleData A map containing scheduling details (e.g., date, time, interviewer, notes).
     */
    void scheduleInterview(Long id, Map<String, String> scheduleData);

    /**
     * Sends an email to a specific candidate.
     * @param id The ID of the candidate.
     * @param subject The subject of the email.
     * @param body The body content of the email.
     */
    void sendEmail(Long id, String subject, String body);

    /**
     * Sends a notification to a specific candidate.
     * @param id The ID of the candidate.
     * @param message The notification message.
     */
    void notifyCandidate(Long id, String message);

    // Add any other methods that your CandidateServiceImpl might implement
    // or that are part of your Candidate management logic.
}
