// src/main/java/com/hrms/model/JobSkill.java
package com.hrms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "job_skills")
public class JobSkill {
    @EmbeddedId
    private JobSkillId id;

    @ManyToOne
    @MapsId("jobId")
    @JoinColumn(name = "job_id")
    private JobRequisition job;

    // Constructors
    public JobSkill() {
        this.id = new JobSkillId();
    }

    public JobSkill(JobRequisition job, String skill) {
        this.id = new JobSkillId();
        this.id.setJobId(job.getId());
        this.id.setSkill(skill);
        this.job = job;
    }

    // Getters and setters
    public JobSkillId getId() {
        return id;
    }

    public void setId(JobSkillId id) {
        this.id = id;
    }

    public JobRequisition getJob() {
        return job;
    }

    public void setJob(JobRequisition job) {
        this.job = job;
        if (job != null) {
            this.id.setJobId(job.getId());
        }
    }

    public String getSkill() {
        return id.getSkill();
    }

    public void setSkill(String skill) {
        this.id.setSkill(skill);
    }
}