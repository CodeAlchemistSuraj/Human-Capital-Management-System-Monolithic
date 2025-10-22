package com.hrms.controller;

import com.hrms.model.PerformanceReview;
import com.hrms.service.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    @PostMapping
    public ResponseEntity<PerformanceReview> createPerformanceReview(@RequestBody PerformanceReview review) {
        return ResponseEntity.ok(performanceService.createPerformanceReview(review));
    }

    @GetMapping
    public ResponseEntity<List<PerformanceReview>> getAllPerformanceReviews() {
        return ResponseEntity.ok(performanceService.getAllPerformanceReviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceReview> getPerformanceReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(performanceService.getPerformanceReviewById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceReview> updatePerformanceReview(@PathVariable Long id, @RequestBody PerformanceReview review) {
        return ResponseEntity.ok(performanceService.updatePerformanceReview(id, review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerformanceReview(@PathVariable Long id) {
        performanceService.deletePerformanceReview(id);
        return ResponseEntity.noContent().build();
    }
}