package com.hrms.service;

import com.hrms.model.LeaveRequest;

import java.util.List;

public interface LeaveService {
    LeaveRequest applyLeave(LeaveRequest leaveRequest);
    List<LeaveRequest> getAllLeaveRequests();
    LeaveRequest getLeaveRequestById(Long id);
    LeaveRequest updateLeaveStatus(Long id, String status);
    void deleteLeaveRequest(Long id);
    List<LeaveRequest> getLeaveRequestsByEmployeeId(Long employeeId);
}