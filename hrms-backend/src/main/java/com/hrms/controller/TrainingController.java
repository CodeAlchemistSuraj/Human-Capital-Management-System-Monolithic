package com.hrms.controller;

import com.hrms.model.Training;
import com.hrms.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainings")
public class TrainingController {

    @Autowired
    private TrainingService trainingService;

    @PostMapping
    public ResponseEntity<Training> createTraining(@RequestBody Training training) {
        return ResponseEntity.ok(trainingService.createTraining(training));
    }

    @GetMapping
    public ResponseEntity<List<Training>> getAllTrainings() {
        return ResponseEntity.ok(trainingService.getAllTrainings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Training> getTrainingById(@PathVariable Long id) {
        return ResponseEntity.ok(trainingService.getTrainingById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Training> updateTraining(@PathVariable Long id, @RequestBody Training training) {
        return ResponseEntity.ok(trainingService.updateTraining(id, training));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTraining(@PathVariable Long id) {
        trainingService.deleteTraining(id);
        return ResponseEntity.noContent().build();
    }
}