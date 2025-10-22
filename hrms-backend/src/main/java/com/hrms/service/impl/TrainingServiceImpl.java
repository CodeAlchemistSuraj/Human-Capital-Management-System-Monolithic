package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.Training;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.TrainingRepository;
import com.hrms.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainingServiceImpl implements TrainingService {

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Training createTraining(Training training) {
        if (training.getEmployee() != null) {
            Employee employee = employeeRepository.findById(training.getEmployee().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + training.getEmployee().getId()));
            training.setEmployee(employee);
        }
        training.setStatus("PLANNED"); // Default status
        return trainingRepository.save(training);
    }

    @Override
    public List<Training> getAllTrainings() {
        return trainingRepository.findAll();
    }

    @Override
    public Training getTrainingById(Long id) {
        return trainingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Training not found with id: " + id));
    }

    @Override
    public Training updateTraining(Long id, Training trainingDetails) {
        Training training = getTrainingById(id);
        training.setTrainingName(trainingDetails.getTrainingName());
        training.setTrainer(trainingDetails.getTrainer());
        training.setStartDate(trainingDetails.getStartDate());
        training.setEndDate(trainingDetails.getEndDate());
        training.setHours(trainingDetails.getHours());
        training.setStatus(trainingDetails.getStatus());
        training.setFeedback(trainingDetails.getFeedback());
        if (trainingDetails.getEmployee() != null) {
            Employee employee = employeeRepository.findById(trainingDetails.getEmployee().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + trainingDetails.getEmployee().getId()));
            training.setEmployee(employee);
        }
        return trainingRepository.save(training);
    }

    @Override
    public void deleteTraining(Long id) {
        Training training = getTrainingById(id);
        trainingRepository.delete(training);
    }

    @Override
    public List<Training> getTrainingsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return trainingRepository.findByEmployee(employee);
    }

    @Override
    public List<Training> getTrainingsByStatus(String status) {
        return trainingRepository.findByStatus(status);
    }
}