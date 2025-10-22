// src/main/java/com/hrms/model/JobSkillId.java
package com.hrms.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class JobSkillId implements Serializable {
    private Long jobId;
    private String skill;

    // Getters and setters
    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
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
        JobSkillId that = (JobSkillId) o;
        return jobId.equals(that.jobId) && skill.equals(that.skill);
    }

    @Override
    public int hashCode() {
        return Objects.hash(jobId, skill);
    }
}