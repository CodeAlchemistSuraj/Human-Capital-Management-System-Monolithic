// src/main/java/com/hrms/controller/RecommendationController.java
package com.hrms.controller;

import com.hrms.model.Candidate;
import com.hrms.model.JobRequisition;
import com.hrms.model.JobSkill;
import com.hrms.model.CandidateSkill;
import com.hrms.repository.CandidateRepository;
import com.hrms.repository.JobRequisitionRepository;
import com.hrms.repository.JobSkillRepository;
import com.hrms.repository.CandidateSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRequisitionRepository jobRequisitionRepository;

    @Autowired
    private JobSkillRepository jobSkillRepository;

    @Autowired
    private CandidateSkillRepository candidateSkillRepository;

    @GetMapping("/candidates-for-job/{jobId}")
    public ResponseEntity<?> getRecommendedCandidates(@PathVariable Long jobId) {
        Optional<JobRequisition> jobOpt = jobRequisitionRepository.findById(jobId);
        if (jobOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Invalid Job ID",
                "message", "No job found with ID " + jobId
            ));
        }

        // Get required skills from job_skills
        List<JobSkill> jobSkills = jobSkillRepository.findByJobId(jobId);
        Set<String> requiredSkills = jobSkills.stream()
                .map(js -> js.getId().getSkill().toLowerCase())
                .collect(Collectors.toSet());
        System.out.println("Required skills for job " + jobId + ": " + requiredSkills);

        // Get all candidates
        List<Candidate> allCandidates = candidateRepository.findAll();
        System.out.println("Total candidates: " + allCandidates.size());

        // Filter candidates based on matching skills
        List<Candidate> matchedCandidates = allCandidates.stream()
                .filter(c -> {
                    List<CandidateSkill> candidateSkills = candidateSkillRepository.findByCandidateId(c.getId());
                    Set<String> candidateSkillSet = candidateSkills.stream()
                            .map(cs -> cs.getId().getSkill().toLowerCase())
                            .collect(Collectors.toSet());
                    System.out.println("Candidate " + c.getId() + " skills: " + candidateSkillSet);
                    return candidateSkillSet.stream().anyMatch(requiredSkills::contains);
                })
                .collect(Collectors.toList());

        System.out.println("Matched candidates: " + matchedCandidates.size());
        return ResponseEntity.ok(matchedCandidates);
    }
}