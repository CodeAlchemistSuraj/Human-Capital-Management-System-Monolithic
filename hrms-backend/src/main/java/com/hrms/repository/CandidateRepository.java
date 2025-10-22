package com.hrms.repository;

import com.hrms.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByStatus(String status);
    List<Candidate> findByJobTitle(String jobTitle);
	boolean existsByEmail(String email);
}