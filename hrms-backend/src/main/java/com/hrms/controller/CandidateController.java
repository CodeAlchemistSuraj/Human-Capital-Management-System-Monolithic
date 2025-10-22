// com.example.hrsystem.controller.CandidateController.java
package com.hrms.controller;

import com.hrms.service.CandidateService;
import com.hrms.dto.CandidateDTO;
import com.hrms.model.Candidate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ats/candidates")
public class CandidateController {

    @Autowired
    private CandidateService candidateService;

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<CandidateDTO> getCandidateById(@PathVariable Long id) {
        CandidateDTO candidate = candidateService.getCandidateById(id);
        if (candidate == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(candidate);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<CandidateDTO> updateCandidate(@PathVariable Long id, @RequestBody CandidateDTO candidateDTO) {
        CandidateDTO updatedCandidate = candidateService.updateCandidate(id, candidateDTO);
        if (updatedCandidate == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedCandidate);
    }

    @GetMapping("/job/{jobId}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<List<CandidateDTO>> getApplicantsByJobId(@PathVariable Long jobId) {
        List<CandidateDTO> applicants = candidateService.getApplicantsByJobId(jobId);
        return ResponseEntity.ok(applicants);
    }

    @PostMapping("/{id}/schedule")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> scheduleInterview(@PathVariable Long id, @RequestBody Map<String, String> scheduleData) {
        candidateService.scheduleInterview(id, scheduleData);
        return ResponseEntity.ok("Interview scheduled successfully");
    }

    @PostMapping("/{id}/email")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> sendEmail(@PathVariable Long id, @RequestBody Map<String, String> emailData) {
        candidateService.sendEmail(id, emailData.get("subject"), emailData.get("body"));
        return ResponseEntity.ok("Email sent successfully");
    }

    @PostMapping("/{id}/notify")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<String> notifyCandidate(@PathVariable Long id, @RequestBody Map<String, String> notificationData) {
        candidateService.notifyCandidate(id, notificationData.get("message"));
        return ResponseEntity.ok("Notification sent successfully");
    }
}