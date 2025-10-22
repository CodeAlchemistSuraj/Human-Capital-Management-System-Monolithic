package com.hrms.service;

import com.hrms.model.Candidate;

import java.util.List;

public interface RecruitmentService {
    Candidate addCandidate(Candidate candidate);
    List<Candidate> getAllCandidates();
    Candidate getCandidateById(Long id);
    Candidate updateCandidate(Long id, Candidate candidate);
    void deleteCandidate(Long id);
    List<Candidate> getCandidatesByStatus(String status);
    List<Candidate> getCandidatesByJobTitle(String jobTitle);
}