package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.PerformanceReview;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.PerformanceRepository;
import com.hrms.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceServiceImpl implements PerformanceService {

    @Autowired
    private PerformanceRepository performanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public PerformanceReview createPerformanceReview(PerformanceReview review) {
        Employee employee = employeeRepository.findById(review.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + review.getEmployee().getId()));
        review.setEmployee(employee);
        return performanceRepository.save(review);
    }

    @Override
    public List<PerformanceReview> getAllPerformanceReviews() {
        return performanceRepository.findAll();
    }

    @Override
    public PerformanceReview getPerformanceReviewById(Long id) {
        return performanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PerformanceReview not found with id: " + id));
    }

    @Override
    public PerformanceReview updatePerformanceReview(Long id, PerformanceReview reviewDetails) {
        PerformanceReview review = getPerformanceReviewById(id);
        review.setReviewDate(reviewDetails.getReviewDate());
        review.setGoals(reviewDetails.getGoals());
        review.setKras(reviewDetails.getKras());
        review.setRating(reviewDetails.getRating());
        review.setFeedback(reviewDetails.getFeedback());
        review.setCycle(reviewDetails.getCycle());
        return performanceRepository.save(review);
    }

    @Override
    public void deletePerformanceReview(Long id) {
        PerformanceReview review = getPerformanceReviewById(id);
        performanceRepository.delete(review);
    }

    @Override
    public List<PerformanceReview> getPerformanceReviewsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return performanceRepository.findByEmployee(employee);
    }

    @Override
    public List<PerformanceReview> getPerformanceReviewsByCycle(PerformanceReview.ReviewCycle cycle) {
        return performanceRepository.findByCycle(cycle);
    }
}