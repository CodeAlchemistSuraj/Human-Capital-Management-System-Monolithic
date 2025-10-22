// File: src/main/java/com/hrms/repository/JobRequisitionRepository.java
package com.hrms.repository;

import com.hrms.model.JobRequisition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for JobRequisition entities.
 * Extends JpaRepository to provide standard CRUD operations.
 */
@Repository
public interface JobRequisitionRepository extends JpaRepository<JobRequisition, Long> {
    // JpaRepository provides methods like save(), findById(), findAll(), delete(), etc.
    // You can add custom query methods here if needed.
}
