package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.ExitProcess;
import com.hrms.model.ExitProcess.ExitType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExitRepository extends JpaRepository<ExitProcess, Long> {
    List<ExitProcess> findByEmployee(Employee employee);
    List<ExitProcess> findByExitType(ExitType exitType);
}