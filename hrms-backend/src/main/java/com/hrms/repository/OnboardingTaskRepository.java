// File: src/main/java/com/hrms/repository/OnboardingTaskRepository.java
package com.hrms.repository;

import com.hrms.model.OnboardingTask;
import com.hrms.model.OnboardingTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for OnboardingTask entities.
 * Provides methods for CRUD operations and custom queries related to onboarding tasks.
 */
@Repository
public interface OnboardingTaskRepository extends JpaRepository<OnboardingTask, Long> {

    /**
     * Finds all onboarding tasks associated with a specific candidate.
     * @param candidateId The ID of the candidate.
     * @return A list of OnboardingTask entities.
     */
    List<OnboardingTask> findByCandidateId(Long candidateId);

    /**
     * Finds all onboarding tasks for a specific candidate with a given status.
     * @param candidateId The ID of the candidate.
     * @param status The status of the tasks to find.
     * @return A list of OnboardingTask entities matching the criteria.
     */
    List<OnboardingTask> findByCandidateIdAndStatus(Long candidateId, OnboardingTaskStatus status);
}
