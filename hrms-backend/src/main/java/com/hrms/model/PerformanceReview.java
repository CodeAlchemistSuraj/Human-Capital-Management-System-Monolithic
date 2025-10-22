package com.hrms.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance_reviews")
public class PerformanceReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(nullable = false)
    private LocalDate reviewDate;

    private String goals;

    private String kras;

    private Double rating;

    private String feedback;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReviewCycle cycle; // e.g., ANNUAL, BI_ANNUAL, QUARTERLY

    public enum ReviewCycle {
        ANNUAL, BI_ANNUAL, QUARTERLY
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getGoals() {
        return goals;
    }

    public void setGoals(String goals) {
        this.goals = goals;
    }

    public String getKras() {
        return kras;
    }

    public void setKras(String kras) {
        this.kras = kras;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public ReviewCycle getCycle() {
        return cycle;
    }

    public void setCycle(ReviewCycle cycle) {
        this.cycle = cycle;
    }
}