package com.hrms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
public class Application {

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public JobRequisition getJobRequisition() {
		return jobRequisition;
	}

	public void setJobRequisition(JobRequisition jobRequisition) {
		this.jobRequisition = jobRequisition;
	}

	public Candidate getCandidate() {
		return candidate;
	}

	public void setCandidate(Candidate candidate) {
		this.candidate = candidate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getAppliedAt() {
		return appliedAt;
	}

	public void setAppliedAt(LocalDateTime appliedAt) {
		this.appliedAt = appliedAt;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_requisition_id", nullable = false)
    private JobRequisition jobRequisition;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @Column(nullable = false)
    private String status; // NEW, INTERVIEW, HIRED, REJECTED

    @Column(nullable = false)
    private LocalDateTime appliedAt;
}