package com.hrms.service;

import com.hrms.model.Training;

import java.util.List;

public interface TrainingService {
    Training createTraining(Training training);
    List<Training> getAllTrainings();
    Training getTrainingById(Long id);
    Training updateTraining(Long id, Training training);
    void deleteTraining(Long id);
    List<Training> getTrainingsByEmployeeId(Long employeeId);
    List<Training> getTrainingsByStatus(String status);
}