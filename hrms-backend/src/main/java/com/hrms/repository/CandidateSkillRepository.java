// src/main/java/com/hrms/repository/CandidateSkillRepository.java
package com.hrms.repository;

import com.hrms.model.CandidateSkill;
import com.hrms.model.CandidateSkillId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateSkillRepository extends JpaRepository<CandidateSkill, CandidateSkillId> {
    List<CandidateSkill> findByCandidateId(Long candidateId);
}