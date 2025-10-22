package com.hrms.controller;

import com.hrms.model.Candidate;
import com.hrms.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruitment")
public class RecruitmentController {

    @Autowired
    private RecruitmentService recruitmentService;

    @PostMapping
    public ResponseEntity<Candidate> addCandidate(@RequestBody Candidate candidate) {
        return ResponseEntity.ok(recruitmentService.addCandidate(candidate));
    }

    @GetMapping
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return ResponseEntity.ok(recruitmentService.getAllCandidates());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        return ResponseEntity.ok(recruitmentService.getCandidateById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @RequestBody Candidate candidate) {
        return ResponseEntity.ok(recruitmentService.updateCandidate(id, candidate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        recruitmentService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }
}