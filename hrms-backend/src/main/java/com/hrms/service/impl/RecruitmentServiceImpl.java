package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Candidate;
import com.hrms.repository.CandidateRepository;
import com.hrms.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruitmentServiceImpl implements RecruitmentService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Override
    public Candidate addCandidate(Candidate candidate) {
        candidate.setStatus("APPLIED"); // Default status
        return candidateRepository.save(candidate);
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    @Override
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found with id: " + id));
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate candidateDetails) {
        Candidate candidate = getCandidateById(id);
        candidate.setFirstName(candidateDetails.getFirstName());
        candidate.setLastName(candidateDetails.getLastName());
        candidate.setEmail(candidateDetails.getEmail()); // Fixed syntax error
        candidate.setResumePath(candidateDetails.getResumePath());
        candidate.setJobTitle(candidateDetails.getJobTitle());
        candidate.setApplicationDate(candidateDetails.getApplicationDate());
        candidate.setStatus(candidateDetails.getStatus());
        return candidateRepository.save(candidate);
    }

    @Override
    public void deleteCandidate(Long id) {
        Candidate candidate = getCandidateById(id);
        candidateRepository.delete(candidate);
    }

    @Override
    public List<Candidate> getCandidatesByStatus(String status) {
        return candidateRepository.findByStatus(status);
    }

    @Override
    public List<Candidate> getCandidatesByJobTitle(String jobTitle) {
        return candidateRepository.findByJobTitle(jobTitle);
    }
}