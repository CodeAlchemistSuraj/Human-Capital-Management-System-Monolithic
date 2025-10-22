// File: src/main/java/com/hrms/repository/ApplicationRepository.java
package com.hrms.repository;

import com.hrms.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Application entities.
 * Extends JpaRepository to provide standard CRUD operations.
 */
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // JpaRepository provides:
    // save(S entity)
    // findById(ID id)
    // findAll()
    // delete(T entity)
    // etc.
    // You can add custom query methods here if needed, e.g.,
    // List<Application> findByCandidateId(Long candidateId);
    // List<Application> findByJobRequisitionId(Long jobRequisitionId);
    List<Application> findByJobRequisition_Id(Long jobRequisitionId);
}
