package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.Employee;
import com.hrms.model.LeaveRequest;
import com.hrms.repository.EmployeeRepository;
import com.hrms.repository.LeaveRepository;
import com.hrms.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveServiceImpl implements LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public LeaveRequest applyLeave(LeaveRequest leaveRequest) {
        Employee employee = employeeRepository.findById(leaveRequest.getEmployee().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + leaveRequest.getEmployee().getId()));
        leaveRequest.setEmployee(employee);
        leaveRequest.setStatus("PENDING"); // Default status
        return leaveRepository.save(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRepository.findAll();
    }

    @Override
    public LeaveRequest getLeaveRequestById(Long id) {
        return leaveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LeaveRequest not found with id: " + id));
    }

    @Override
    public LeaveRequest updateLeaveStatus(Long id, String status) {
        LeaveRequest leaveRequest = getLeaveRequestById(id);
        if (!List.of("PENDING", "APPROVED", "REJECTED").contains(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
        leaveRequest.setStatus(status);
        return leaveRepository.save(leaveRequest);
    }

    @Override
    public void deleteLeaveRequest(Long id) {
        LeaveRequest leaveRequest = getLeaveRequestById(id);
        leaveRepository.delete(leaveRequest);
    }

    @Override
    public List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        return leaveRepository.findByEmployee(employee);
    }
}