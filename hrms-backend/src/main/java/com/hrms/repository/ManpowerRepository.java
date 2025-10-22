package com.hrms.repository;

import com.hrms.model.Employee;
import com.hrms.model.ManpowerRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManpowerRepository extends JpaRepository<ManpowerRecord, Long> {
    List<ManpowerRecord> findByEmployee(Employee employee);
    List<ManpowerRecord> findByDepartment(String department);
    List<ManpowerRecord> findByIsOutsourced(Boolean isOutsourced);
}