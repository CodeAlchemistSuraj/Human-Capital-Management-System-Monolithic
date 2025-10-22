package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.ExitProcess;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.ExitRepository;
import com.hrms.service.ExitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExitServiceImpl implements ExitService {

    @Autowired
    private ExitRepository exitRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public ExitProcess initiateExitProcess(ExitProcess exitProcess) {
        Employee employee = employeeRepository.findById(exitProcess.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + exitProcess.getEmployee().getId()));
        exitProcess.setEmployee(employee);
        exitProcess.setFinalSettlementStatus("PENDING"); // Default status
        return exitRepository.save(exitProcess);
    }

    @Override
    public List<ExitProcess> getAllExitProcesses() {
        return exitRepository.findAll();
    }

    @Override
    public ExitProcess getExitProcessById(Long id) {
        return exitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExitProcess not found with id: " + id));
    }

    @Override
    public ExitProcess updateExitProcess(Long id, ExitProcess exitProcessDetails) {
        ExitProcess exitProcess = getExitProcessById(id);
        exitProcess.setExitDate(exitProcessDetails.getExitDate());
        exitProcess.setExitType(exitProcessDetails.getExitType());
        exitProcess.setExitInterviewNotes(exitProcessDetails.getExitInterviewNotes());
        exitProcess.setKnowledgeTransferDetails(exitProcessDetails.getKnowledgeTransferDetails());
        exitProcess.setFinalSettlementStatus(exitProcessDetails.getFinalSettlementStatus());
        return exitRepository.save(exitProcess);
    }

    @Override
    public void deleteExitProcess(Long id) {
        ExitProcess exitProcess = getExitProcessById(id);
        exitRepository.delete(exitProcess);
    }

    @Override
    public List<ExitProcess> getExitProcessesByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return exitRepository.findByEmployee(employee);
    }

    @Override
    public List<ExitProcess> getExitProcessesByExitType(ExitProcess.ExitType exitType) {
        return exitRepository.findByExitType(exitType);
    }
}