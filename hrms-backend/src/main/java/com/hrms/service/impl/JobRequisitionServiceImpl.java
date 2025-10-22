// File: src/main/java/com/hrms/service/impl/JobRequisitionServiceImpl.java
package com.hrms.service.impl;

import com.hrms.dto.JobRequisitionDTO;
import com.hrms.model.JobRequisition;
import com.hrms.repository.JobRequisitionRepository;
import com.hrms.service.AuditLogService;
import com.hrms.service.JobRequisitionService;
import com.hrms.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the JobRequisitionService interface.
 * Handles business logic for managing job requisitions.
 */
@Service
public class JobRequisitionServiceImpl implements JobRequisitionService {

    private final JobRequisitionRepository jobRequisitionRepository;
    private final AuditLogService auditLogService;

    @Autowired
    public JobRequisitionServiceImpl(JobRequisitionRepository jobRequisitionRepository,
                                     AuditLogService auditLogService) {
        this.jobRequisitionRepository = jobRequisitionRepository;
        this.auditLogService = auditLogService;
    }

    /**
     * Creates a new job requisition.
     * Sets postedDate if not provided and status to "OPEN" by default.
     * Logs the action.
     * @param jobRequisitionDTO The DTO containing job requisition details.
     * @return The created JobRequisitionDTO.
     * @throws IllegalArgumentException if essential fields are missing.
     */
    @Override
    @Transactional
    public JobRequisitionDTO createJobRequisition(JobRequisitionDTO jobRequisitionDTO) {
        if (jobRequisitionDTO == null || jobRequisitionDTO.getJobTitle() == null ||
            jobRequisitionDTO.getDepartment() == null || jobRequisitionDTO.getRequisitionCode() == null) {
            throw new IllegalArgumentException("Job title, department, and requisition code are required to create a job requisition.");
        }

        JobRequisition jobRequisition = mapToEntity(jobRequisitionDTO);
        jobRequisition.setPostedDate(jobRequisitionDTO.getPostedDate() != null ? jobRequisitionDTO.getPostedDate() : LocalDate.now());
        jobRequisition.setStatus(jobRequisitionDTO.getStatus() != null ? jobRequisitionDTO.getStatus() : "OPEN"); // Default status

        JobRequisition savedRequisition = jobRequisitionRepository.save(jobRequisition);

        auditLogService.logAction(
            "Job Requisition Created",
            "JobRequisition",
            savedRequisition.getId()
        );

        return mapToDTO(savedRequisition);
    }

    /**
     * Retrieves a job requisition by its ID.
     * @param id The ID of the job requisition.
     * @return The JobRequisitionDTO.
     * @throws ResourceNotFoundException if the job requisition is not found.
     */
    @Override
    public JobRequisitionDTO getJobRequisitionById(Long id) {
        JobRequisition jobRequisition = jobRequisitionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job Requisition not found with ID: " + id));
        return mapToDTO(jobRequisition);
    }

    /**
     * Retrieves all job requisitions.
     * @return A list of JobRequisitionDTOs.
     */
    @Override
    public List<JobRequisitionDTO> getAllJobRequisitions() {
        List<JobRequisition> jobRequisitions = jobRequisitionRepository.findAll();
        return jobRequisitions.stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    /**
     * Updates an existing job requisition.
     * Logs the action.
     * @param id The ID of the job requisition to update.
     * @param jobRequisitionDTO The DTO with updated job requisition details.
     * @return The updated JobRequisitionDTO.
     * @throws ResourceNotFoundException if the job requisition is not found.
     */
    @Override
    @Transactional
    public JobRequisitionDTO updateJobRequisition(Long id, JobRequisitionDTO jobRequisitionDTO) {
        JobRequisition existingRequisition = jobRequisitionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job Requisition not found with ID: " + id));

        // Update fields from DTO to existing entity
        existingRequisition.setRequisitionCode(jobRequisitionDTO.getRequisitionCode());
        existingRequisition.setJobTitle(jobRequisitionDTO.getJobTitle());
        existingRequisition.setDepartment(jobRequisitionDTO.getDepartment());
        existingRequisition.setDescription(jobRequisitionDTO.getDescription());
        existingRequisition.setStatus(jobRequisitionDTO.getStatus());
        existingRequisition.setNumberOfPositions(jobRequisitionDTO.getNumberOfPositions());
        existingRequisition.setPostedDate(jobRequisitionDTO.getPostedDate());
        existingRequisition.setClosingDate(jobRequisitionDTO.getClosingDate());
        existingRequisition.setHiringManager(jobRequisitionDTO.getHiringManager());
        existingRequisition.setLocation(jobRequisitionDTO.getLocation());

        JobRequisition updatedRequisition = jobRequisitionRepository.save(existingRequisition);

        auditLogService.logAction(
            "Job Requisition Updated",
            "JobRequisition",
            updatedRequisition.getId()
        );

        return mapToDTO(updatedRequisition);
    }

    /**
     * Deletes a job requisition by its ID.
     * Logs the action.
     * @param id The ID of the job requisition to delete.
     * @throws ResourceNotFoundException if the job requisition is not found.
     */
    @Override
    @Transactional
    public void deleteJobRequisition(Long id) {
        JobRequisition jobRequisition = jobRequisitionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job Requisition not found with ID: " + id));

        jobRequisitionRepository.delete(jobRequisition);

        auditLogService.logAction(
            "Job Requisition Deleted",
            "JobRequisition",
            id
        );
    }

    /**
     * Simulates posting a job requisition to external platforms like LinkedIn.
     * In a real application, this would involve API calls to external job boards.
     * @param id The ID of the job requisition to post.
     * @return true if successful, false otherwise.
     * @throws ResourceNotFoundException if the job requisition is not found.
     */
    @Override
    public boolean postJobToExternalPlatform(Long id) {
        JobRequisition jobRequisition = jobRequisitionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Job Requisition not found with ID: " + id));

        System.out.println("Simulating posting Job Requisition '" + jobRequisition.getJobTitle() +
                           "' (ID: " + id + ") to external platforms like LinkedIn.");
        // --- Placeholder for actual integration logic ---
        // Example: Call LinkedIn API, Indeed API, etc.
        // boolean success = externalJobBoardService.postJob(jobRequisition);
        // if (success) {
        //     jobRequisition.setStatus("POSTED"); // Update status if successful
        //     jobRequisitionRepository.save(jobRequisition);
        // }
        // -------------------------------------------------

        auditLogService.logAction(
            "Job Posted Externally",
            "JobRequisition",
            id
        );
        return true; // Assume success for simulation
    }

    /**
     * Helper method to convert a JobRequisition entity to a JobRequisitionDTO.
     * @param jobRequisition The JobRequisition entity.
     * @return The corresponding JobRequisitionDTO.
     */
    private JobRequisitionDTO mapToDTO(JobRequisition jobRequisition) {
        JobRequisitionDTO dto = new JobRequisitionDTO();
        dto.setId(jobRequisition.getId());
        dto.setRequisitionCode(jobRequisition.getRequisitionCode());
        dto.setJobTitle(jobRequisition.getJobTitle());
        dto.setDepartment(jobRequisition.getDepartment());
        dto.setDescription(jobRequisition.getDescription());
        dto.setStatus(jobRequisition.getStatus());
        dto.setNumberOfPositions(jobRequisition.getNumberOfPositions());
        dto.setPostedDate(jobRequisition.getPostedDate());
        dto.setClosingDate(jobRequisition.getClosingDate());
        dto.setHiringManager(jobRequisition.getHiringManager());
        dto.setLocation(jobRequisition.getLocation());
        return dto;
    }

    /**
     * Helper method to convert a JobRequisitionDTO to a JobRequisition entity.
     * @param jobRequisitionDTO The JobRequisitionDTO.
     * @return The corresponding JobRequisition entity.
     */
    private JobRequisition mapToEntity(JobRequisitionDTO jobRequisitionDTO) {
        JobRequisition entity = new JobRequisition();
        entity.setId(jobRequisitionDTO.getId()); // ID might be null for new entities
        entity.setRequisitionCode(jobRequisitionDTO.getRequisitionCode());
        entity.setJobTitle(jobRequisitionDTO.getJobTitle());
        entity.setDepartment(jobRequisitionDTO.getDepartment());
        entity.setDescription(jobRequisitionDTO.getDescription());
        entity.setStatus(jobRequisitionDTO.getStatus());
        entity.setNumberOfPositions(jobRequisitionDTO.getNumberOfPositions());
        entity.setPostedDate(jobRequisitionDTO.getPostedDate());
        entity.setClosingDate(jobRequisitionDTO.getClosingDate());
        entity.setHiringManager(jobRequisitionDTO.getHiringManager());
        entity.setLocation(jobRequisitionDTO.getLocation());
        return entity;
    }
}
