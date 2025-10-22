package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.ManpowerRecord;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.ManpowerRepository;
import com.hrms.service.ManpowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManpowerServiceImpl implements ManpowerService {

    @Autowired
    private ManpowerRepository manpowerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public ManpowerRecord addManpowerRecord(ManpowerRecord manpowerRecord) {
        if (manpowerRecord.getEmployee() != null) {
            Employee employee = employeeRepository.findById(manpowerRecord.getEmployee().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + manpowerRecord.getEmployee().getId()));
            manpowerRecord.setEmployee(employee);
        }
        return manpowerRepository.save(manpowerRecord);
    }

    @Override
    public List<ManpowerRecord> getAllManpowerRecords() {
        return manpowerRepository.findAll();
    }

    @Override
    public ManpowerRecord getManpowerRecordById(Long id) {
        return manpowerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ManpowerRecord not found with id: " + id));
    }

    @Override
    public ManpowerRecord updateManpowerRecord(Long id, ManpowerRecord manpowerRecordDetails) {
        ManpowerRecord manpowerRecord = getManpowerRecordById(id);
        manpowerRecord.setDepartment(manpowerRecordDetails.getDepartment());
        manpowerRecord.setRegion(manpowerRecordDetails.getRegion());
        manpowerRecord.setDesignation(manpowerRecordDetails.getDesignation());
        manpowerRecord.setEntryDate(manpowerRecordDetails.getEntryDate());
        manpowerRecord.setExitDate(manpowerRecordDetails.getExitDate());
        manpowerRecord.setIsOutsourced(manpowerRecordDetails.getIsOutsourced());
        manpowerRecord.setOvertimeHours(manpowerRecordDetails.getOvertimeHours());
        if (manpowerRecordDetails.getEmployee() != null) {
            Employee employee = employeeRepository.findById(manpowerRecordDetails.getEmployee().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + manpowerRecordDetails.getEmployee().getId()));
            manpowerRecord.setEmployee(employee);
        }
        return manpowerRepository.save(manpowerRecord);
    }

    @Override
    public void deleteManpowerRecord(Long id) {
        ManpowerRecord manpowerRecord = getManpowerRecordById(id);
        manpowerRepository.delete(manpowerRecord);
    }

    @Override
    public List<ManpowerRecord> getManpowerRecordsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return manpowerRepository.findByEmployee(employee);
    }

    @Override
    public List<ManpowerRecord> getManpowerRecordsByDepartment(String department) {
        return manpowerRepository.findByDepartment(department);
    }

    @Override
    public List<ManpowerRecord> getManpowerRecordsByIsOutsourced(Boolean isOutsourced) {
        return manpowerRepository.findByIsOutsourced(isOutsourced);
    }
}