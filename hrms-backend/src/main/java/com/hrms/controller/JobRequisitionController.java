// File: src/main/java/com/hrms/controller/JobRequisitionController.java
package com.hrms.controller;

import com.hrms.dto.JobRequisitionDTO;
import com.hrms.service.JobRequisitionService;
import com.hrms.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Job Requisitions.
 * Provides endpoints for HR users to create, view, update, delete, and post job requisitions.
 */
@RestController
@RequestMapping("/api/job-requisitions")
@PreAuthorize("hasRole('HR') or hasRole('ADMIN')") // Only HR and Admin can manage job requisitions
public class JobRequisitionController {

    private final JobRequisitionService jobRequisitionService;

    @Autowired
    public JobRequisitionController(JobRequisitionService jobRequisitionService) {
        this.jobRequisitionService = jobRequisitionService;
    }

    /**
     * Creates a new job requisition.
     * Accessible by HR and Admin roles.
     * @param jobRequisitionDTO The DTO containing the details of the job requisition to create.
     * @return ResponseEntity with the created JobRequisitionDTO and HTTP status 201 Created.
     */
    @PostMapping
    public ResponseEntity<JobRequisitionDTO> createJobRequisition(@RequestBody JobRequisitionDTO jobRequisitionDTO) {
        try {
            JobRequisitionDTO createdRequisition = jobRequisitionService.createJobRequisition(jobRequisitionDTO);
            return new ResponseEntity<>(createdRequisition, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Or a custom error response
        } catch (Exception e) {
            System.err.println("Error creating job requisition: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Retrieves a job requisition by its ID.
     * Accessible by HR and Admin roles.
     * @param id The ID of the job requisition to retrieve.
     * @return ResponseEntity with the JobRequisitionDTO and HTTP status 200 OK.
     */
    @GetMapping("/{id}")
    public ResponseEntity<JobRequisitionDTO> getJobRequisitionById(@PathVariable Long id) {
        try {
            JobRequisitionDTO jobRequisition = jobRequisitionService.getJobRequisitionById(id);
            return ResponseEntity.ok(jobRequisition);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error fetching job requisition " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Retrieves all job requisitions.
     * Accessible by HR and Admin roles.
     * @return ResponseEntity with a list of JobRequisitionDTOs and HTTP status 200 OK.
     */
    @GetMapping
    public ResponseEntity<List<JobRequisitionDTO>> getAllJobRequisitions() {
        try {
            List<JobRequisitionDTO> jobRequisitions = jobRequisitionService.getAllJobRequisitions();
            return ResponseEntity.ok(jobRequisitions);
        } catch (Exception e) {
            System.err.println("Error fetching all job requisitions: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Updates an existing job requisition.
     * Accessible by HR and Admin roles.
     * @param id The ID of the job requisition to update.
     * @param jobRequisitionDTO The DTO with updated job requisition details.
     * @return ResponseEntity with the updated JobRequisitionDTO and HTTP status 200 OK.
     */
    @PutMapping("/{id}")
    public ResponseEntity<JobRequisitionDTO> updateJobRequisition(@PathVariable Long id,
                                                                  @RequestBody JobRequisitionDTO jobRequisitionDTO) {
        try {
            JobRequisitionDTO updatedRequisition = jobRequisitionService.updateJobRequisition(id, jobRequisitionDTO);
            return ResponseEntity.ok(updatedRequisition);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            System.err.println("Error updating job requisition " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Deletes a job requisition by its ID.
     * Accessible by HR and Admin roles.
     * @param id The ID of the job requisition to delete.
     * @return ResponseEntity with HTTP status 204 No Content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobRequisition(@PathVariable Long id) {
        try {
            jobRequisitionService.deleteJobRequisition(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error deleting job requisition " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Simulates posting a job requisition to external platforms.
     * Accessible by HR and Admin roles.
     * @param id The ID of the job requisition to post.
     * @return ResponseEntity with a boolean indicating success and HTTP status 200 OK.
     */
    @PostMapping("/{id}/post-external")
    public ResponseEntity<Boolean> postJobToExternalPlatform(@PathVariable Long id) {
        try {
            boolean success = jobRequisitionService.postJobToExternalPlatform(id);
            return ResponseEntity.ok(success);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("Error posting job requisition " + id + " to external platform: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
