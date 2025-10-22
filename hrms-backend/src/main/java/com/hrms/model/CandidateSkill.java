// src/main/java/com/hrms/model/CandidateSkill.java
package com.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_skills")
public class CandidateSkill {
    @EmbeddedId
    private CandidateSkillId id;

    @ManyToOne
    @MapsId("candidateId")
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    // Constructors
    public CandidateSkill() {
        this.id = new CandidateSkillId();
    }

    public CandidateSkill(Candidate candidate, String skill) {
        this.id = new CandidateSkillId();
        this.id.setCandidateId(candidate.getId());
        this.id.setSkill(skill);
        this.candidate = candidate;
    }

    // Getters and setters
    public CandidateSkillId getId() {
        return id;
    }

    public void setId(CandidateSkillId id) {
        this.id = id;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
        if (candidate != null) {
            this.id.setCandidateId(candidate.getId());
        }
    }

    public String getSkill() {
        return id.getSkill();
    }

    public void setSkill(String skill) {
        this.id.setSkill(skill);
    }
}