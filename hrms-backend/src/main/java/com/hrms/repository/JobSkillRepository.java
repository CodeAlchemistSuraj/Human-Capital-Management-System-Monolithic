// src/main/java/com/hrms/repository/JobSkillRepository.java
package com.hrms.repository;

import com.hrms.model.JobSkill;
import com.hrms.model.JobSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSkillRepository extends JpaRepository<JobSkill, JobSkillId> {
    List<JobSkill> findByJobId(Long jobId);
}