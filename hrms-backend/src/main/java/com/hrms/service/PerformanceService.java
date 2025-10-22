package com.hrms.service;

import com.hrms.model.PerformanceReview;

import java.util.List;

public interface PerformanceService {
  
    List<PerformanceReview> getAllPerformanceReviews();
    PerformanceReview getPerformanceReviewById(Long id);
    PerformanceReview updatePerformanceReview(Long id, PerformanceReview review);
    void deletePerformanceReview(Long id);
    List<PerformanceReview> getPerformanceReviewsByEmployeeId(Long employeeId);
    List<PerformanceReview> getPerformanceReviewsByCycle(PerformanceReview.ReviewCycle cycle);
	PerformanceReview createPerformanceReview(PerformanceReview review);
}