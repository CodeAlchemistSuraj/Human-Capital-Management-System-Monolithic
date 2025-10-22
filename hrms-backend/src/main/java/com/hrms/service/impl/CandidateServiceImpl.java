package com.hrms.service.impl;

import com.hrms.dto.CandidateDTO;
import com.hrms.model.Candidate;
import com.hrms.repository.CandidateRepository;
import com.hrms.service.CandidateService;
import com.hrms.model.Application;
import com.hrms.repository.ApplicationRepository;
import com.hrms.repository.JobRequisitionRepository;
import com.hrms.model.JobRequisition;

import io.jsonwebtoken.lang.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional; // Import Optional
import java.util.stream.Collectors;

@Service
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRequisitionRepository jobRequisitionRepository;

    // You will need to implement this method to map Candidate entity to CandidateDTO
    // This is a placeholder; ensure it correctly maps all fields.
    private CandidateDTO convertToDTO(Candidate candidate) {
        if (candidate == null) {
            return null;
        }
        CandidateDTO dto = new CandidateDTO();
        dto.setId(candidate.getId());
        dto.setFirstName(candidate.getFirstName());
        dto.setLastName(candidate.getLastName());
        dto.setEmail(candidate.getEmail());
        dto.setJobTitle(candidate.getJobTitle());
        dto.setApplicationDate(candidate.getApplicationDate());
        dto.setStatus(candidate.getStatus());
        dto.setResumePath(candidate.getResumePath());
        dto.setSkills(candidate.getSkills()); // Assuming getSkills returns List<String>
        dto.setAddress(candidate.getAddress());
        dto.setDateOfBirth(candidate.getDateOfBirth());
        dto.setGender(candidate.getGender());
        dto.setMaritalStatus(candidate.getMaritalStatus());
        dto.setNationality(candidate.getNationality());
        dto.setPhoneNumber(candidate.getPhoneNumber());
        dto.setEmergencyContactName(candidate.getEmergencyContactName());
        dto.setEmergencyContactPhone(candidate.getEmergencyContactPhone());

        // Add mapping for any other fields you've added to CandidateDTO/Candidate
        // e.g., linkedinProfile, professionalSummary, education, workExperience, etc.
        // If these are not yet in your Candidate entity, they will be null.
        // Example for new fields (assuming they exist in Candidate entity):
        // dto.setLinkedinProfile(candidate.getLinkedinProfile());
        // dto.setProfessionalSummary(candidate.getProfessionalSummary());
        // dto.setEducation(candidate.getEducation()); // Assuming appropriate types
        // dto.setWorkExperience(candidate.getWorkExperience());
        // dto.setLanguageProficiencies(candidate.getLanguageProficiencies());
        // dto.setCertifications(candidate.getCertifications());
        // dto.setProjects(candidate.getProjects());
        // dto.setSalaryExpectations(candidate.getSalaryExpectations());
        // dto.setAvailability(candidate.getAvailability());
        // dto.setReferences(candidate.getReferences());
        // dto.setPortfolio(candidate.getPortfolio());
        // dto.setCandidatePreferences(candidate.getCandidatePreferences());
        // dto.setInterviewNotes(candidate.getInterviewNotes());

        return dto;
    }


    @Override
    public CandidateDTO getCandidateById(Long id) {
        System.out.println("DEBUG: CandidateService - getCandidateById called for ID: " + id);
        Optional<Candidate> candidateOptional = candidateRepository.findById(id);

        if (candidateOptional.isPresent()) {
            Candidate candidate = candidateOptional.get();
            System.out.println("DEBUG: CandidateService - Candidate found: " + candidate.getFirstName() + " " + candidate.getLastName() + " (ID: " + candidate.getId() + ")");
            // FIX: Ensure convertToDTO maps all fields correctly
            return convertToDTO(candidate);
        } else {
            System.out.println("DEBUG: CandidateService - Candidate with ID " + id + " NOT FOUND in repository.");
            return null; // This will trigger the 404 in the controller
        }
    }

    // Placeholder for other CandidateService methods (add your actual implementations)
    @Override
    public CandidateDTO updateCandidate(Long id, CandidateDTO candidateDTO) {
        // Implement update logic
        System.out.println("DEBUG: CandidateService - updateCandidate called for ID: " + id);
        return null;
    }

    @Override
    public List<CandidateDTO> getApplicantsByJobId(Long jobId) {
        System.out.println("DEBUG: CandidateService - getApplicantsByJobId called for Job ID: " + jobId);
        List<Application> applications = applicationRepository.findByJobRequisition_Id(jobId);
        return applications.stream()
                .map(Application::getCandidate)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void scheduleInterview(Long id, Map<String, String> scheduleData) {
        // Implement interview scheduling logic
        System.out.println("DEBUG: CandidateService - scheduleInterview called for ID: " + id);
    }

    @Override
    public void sendEmail(Long id, String subject, String body) {
        // Implement email sending logic
        System.out.println("DEBUG: CandidateService - sendEmail called for ID: " + id);
    }

    @Override
    public void notifyCandidate(Long id, String message) {
        // Implement notification logic
        System.out.println("DEBUG: CandidateService - notifyCandidate called for ID: " + id);
    }

    // Add any other methods from CandidateService interface
}
