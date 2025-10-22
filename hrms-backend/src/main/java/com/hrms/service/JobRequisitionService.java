// File: src/main/java/com/hrms/service/JobRequisitionService.java
package com.hrms.service;

import com.hrms.dto.JobRequisitionDTO;
import com.hrms.model.JobRequisition;

import java.util.List;

/**
 * Service interface for managing Job Requisitions.
 */
public interface JobRequisitionService {

    /**
     * Creates a new job requisition and optionally posts it to external platforms.
     * @param jobRequisitionDTO The DTO containing job requisition details.
     * @return The created JobRequisitionDTO.
     */
    JobRequisitionDTO createJobRequisition(JobRequisitionDTO jobRequisitionDTO);

    /**
     * Retrieves a job requisition by its ID.
     * @param id The ID of the job requisition.
     * @return The JobRequisitionDTO.
     */
    JobRequisitionDTO getJobRequisitionById(Long id);

    /**
     * Retrieves all job requisitions.
     * @return A list of JobRequisitionDTOs.
     */
    List<JobRequisitionDTO> getAllJobRequisitions();

    /**
     * Updates an existing job requisition.
     * @param id The ID of the job requisition to update.
     * @param jobRequisitionDTO The DTO with updated job requisition details.
     * @return The updated JobRequisitionDTO.
     */
    JobRequisitionDTO updateJobRequisition(Long id, JobRequisitionDTO jobRequisitionDTO);

    /**
     * Deletes a job requisition by its ID.
     * @param id The ID of the job requisition to delete.
     */
    void deleteJobRequisition(Long id);

    /**
     * Posts a job requisition to external platforms (simulated).
     * @param id The ID of the job requisition to post.
     * @return true if successful, false otherwise.
     */
    boolean postJobToExternalPlatform(Long id);
}
