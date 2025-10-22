// src/main/java/com/hrms/model/CandidateSkillId.java
package com.hrms.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class CandidateSkillId implements Serializable {
    private Long candidateId;
    private String skill;

    // Getters and setters
    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    // Equals and hashCode for composite key
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CandidateSkillId that = (CandidateSkillId) o;
        return candidateId.equals(that.candidateId) && skill.equals(that.skill);
    }

    @Override
    public int hashCode() {
        return Objects.hash(candidateId, skill);
    }
}