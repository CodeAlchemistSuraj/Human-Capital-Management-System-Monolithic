package com.hrms.service;

import com.hrms.model.ExitProcess;

import java.util.List;

public interface ExitService {
    ExitProcess initiateExitProcess(ExitProcess exitProcess);
    List<ExitProcess> getAllExitProcesses();
    ExitProcess getExitProcessById(Long id);
    ExitProcess updateExitProcess(Long id, ExitProcess exitProcess);
    void deleteExitProcess(Long id);
    List<ExitProcess> getExitProcessesByEmployeeId(Long employeeId);
    List<ExitProcess> getExitProcessesByExitType(ExitProcess.ExitType exitType);
}