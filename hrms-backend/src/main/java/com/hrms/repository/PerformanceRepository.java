package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.PerformanceReview;
import com.hrms.model.PerformanceReview.ReviewCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PerformanceRepository extends JpaRepository<PerformanceReview, Long> {
    List<PerformanceReview> findByEmployee(Employee employee);
    List<PerformanceReview> findByCycle(ReviewCycle cycle);
}