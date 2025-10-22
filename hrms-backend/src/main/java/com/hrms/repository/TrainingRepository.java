package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
    List<Training> findByEmployee(Employee employee);
    List<Training> findByStatus(String status);
}