package com.hrms.service;

import com.hrms.dto.CandidateDTO; // Import CandidateDTO
import com.hrms.model.Application;
import com.hrms.model.Candidate;
import com.hrms.model.JobRequisition;
import com.hrms.repository.ApplicationRepository;
import com.hrms.repository.CandidateRepository;
import com.hrms.repository.JobRequisitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalDate; // Import LocalDate

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository repository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRequisitionRepository jobRequisitionRepository;

    @Autowired
    private OnboardingService onboardingService; // Changed back to OnboardingService

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Creates a new job application for a candidate to a specific job requisition.
     *
     * @param candidateId The ID of the candidate applying.
     * @param jobRequisitionId The ID of the job requisition the candidate is applying for.
     * @return The created Application entity.
     * @throws RuntimeException if candidate or job requisition is not found.
     */
    public Application createApplication(Long candidateId, Long jobRequisitionId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found with ID: " + candidateId));
        JobRequisition requisition = jobRequisitionRepository.findById(jobRequisitionId)
                .orElseThrow(() -> new RuntimeException("Job requisition not found with ID: " + jobRequisitionId));

        Application application = new Application();
        application.setCandidate(candidate);
        application.setJobRequisition(requisition);
        application.setStatus("NEW"); // Initial status for a new application
        application.setAppliedAt(LocalDateTime.now());
        Application saved = repository.save(application);
        auditLogService.logAction("CREATE", "Application", saved.getId());
        return saved;
    }

    /**
     * Updates the status of an existing job application.
     * If the status is "HIRED", it initiates the candidate onboarding process.
     * If the status is "REJECTED", it sends a rejection email.
     *
     * @param id The ID of the application to update.
     * @param status The new status for the application (e.g., "INTERVIEW", "HIRED", "REJECTED").
     * @return The updated Application entity.
     * @throws RuntimeException if the application is not found.
     */
    @Transactional
    public Application updateStatus(Long id, String status) {
        Application application = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
        application.setStatus(status);
        Application updated = repository.save(application);
        auditLogService.logAction("UPDATE_STATUS", "Application", updated.getId());

        if ("HIRED".equals(status)) {
            // Convert Candidate to CandidateDTO for onboarding service
            Candidate candidate = updated.getCandidate();
            CandidateDTO candidateDTO = mapCandidateToDTO(candidate);
            onboardingService.initiateOnboarding(candidateDTO); // Correctly call with CandidateDTO
            sendHiredEmail(candidate);
            // Update candidate status
            candidate.setStatus("HIRED");
            candidateRepository.save(candidate);
        } else if ("REJECTED".equals(status)) {
            sendRejectionEmail(updated.getCandidate());
            // Update candidate status
            Candidate candidate = updated.getCandidate();
            candidate.setStatus("REJECTED");
            candidateRepository.save(candidate);
        }

        return updated;
    }

    /**
     * Helper method to map a Candidate entity to a CandidateDTO.
     * This is necessary because OnboardingService expects a DTO.
     *
     * @param candidate The Candidate entity to map.
     * @return The corresponding CandidateDTO.
     */
    private CandidateDTO mapCandidateToDTO(Candidate candidate) {
        CandidateDTO dto = new CandidateDTO();
        dto.setId(candidate.getId());
        dto.setFirstName(candidate.getFirstName());
        dto.setLastName(candidate.getLastName());
        dto.setEmail(candidate.getEmail());
        dto.setResumePath(candidate.getResumePath());
        dto.setJobTitle(candidate.getJobTitle());
        dto.setApplicationDate(candidate.getApplicationDate());
        dto.setStatus(candidate.getStatus());
        // Map additional fields if they exist in Candidate and are needed by OnboardingService
        dto.setAddress(candidate.getAddress());
        dto.setDateOfBirth(candidate.getDateOfBirth());
        dto.setGender(candidate.getGender());
        dto.setMaritalStatus(candidate.getMaritalStatus());
        dto.setNationality(candidate.getNationality());
        dto.setPhoneNumber(candidate.getPhoneNumber());
        dto.setEmergencyContactName(candidate.getEmergencyContactName());
        dto.setEmergencyContactPhone(candidate.getEmergencyContactPhone());
        return dto;
    }

    /**
     * Sends a congratulatory email to a candidate who has been hired.
     *
     * @param candidate The hired candidate.
     */
    private void sendHiredEmail(Candidate candidate) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(candidate.getEmail());
        message.setSubject("Congratulations! You're Hired");
        message.setText("Dear " + candidate.getFirstName() + ",\n\nWe are pleased to offer you the position of " + candidate.getJobTitle() + ". Our HR team will contact you with onboarding details.\n\nBest regards,\nHR Team");
        mailSender.send(message);
    }

    /**
     * Sends a rejection email to a candidate whose application was not successful.
     *
     * @param candidate The rejected candidate.
     */
    private void sendRejectionEmail(Candidate candidate) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(candidate.getEmail());
        message.setSubject("Application Update");
        message.setText("Dear " + candidate.getFirstName() + ",\n\nThank you for applying for the position of " + candidate.getJobTitle() + ". Unfortunately, we have decided to move forward with other candidates at this time.\n\nBest regards,\nHR Team");
        mailSender.send(message);
    }
}
