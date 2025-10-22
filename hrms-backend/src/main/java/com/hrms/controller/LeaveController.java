package com.hrms.controller;

import com.hrms.model.Employee;
import com.hrms.model.LeaveRequest;
import com.hrms.repository.EmployeeRepository;
import com.hrms.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequest leaveRequest, Authentication authentication) {
        String username = authentication.getName();
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new RuntimeException("Employee not found with username: " + username);
        }
        leaveRequest.setEmployee(employee);
        return ResponseEntity.ok(leaveService.applyLeave(leaveRequest));
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests(Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        String username = authentication.getName();

        List<LeaveRequest> allLeaves = leaveService.getAllLeaveRequests();
        if ("EMPLOYEE".equals(role)) {
        	Employee employee = employeeRepository.findByUsername(username);
        	if (employee == null) {
        	    throw new RuntimeException("Employee not found with username: " + username);
        	}
            return ResponseEntity.ok(allLeaves.stream()
                .filter(leave -> employee.getId().equals(leave.getEmployee().getId()))
                .collect(Collectors.toList()));
        }
        // ADMIN and HR can see all leave requests
        return ResponseEntity.ok(allLeaves);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getLeaveRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(leaveService.getLeaveRequestById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<LeaveRequest> updateLeaveStatus(@PathVariable Long id, @RequestBody String status, Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        if (!"ADMIN".equals(role) && !"HR".equals(role)) {
            return ResponseEntity.status(403).build(); // Forbidden for non-ADMIN/HR users
        }
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, status));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(@PathVariable Long id, Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        if (!"ADMIN".equals(role) && !"HR".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, "APPROVED"));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<LeaveRequest> rejectLeave(@PathVariable Long id, Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        if (!"ADMIN".equals(role) && !"HR".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(leaveService.updateLeaveStatus(id, "REJECTED"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveRequest(@PathVariable Long id, Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        LeaveRequest leave = leaveService.getLeaveRequestById(id);
        if (leave == null) {
            return ResponseEntity.notFound().build();
        }
        String username = authentication.getName();
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new RuntimeException("Employee not found with username: " + username);
        }
        // Employees can only delete their own leave requests; ADMIN/HR can delete any
        if (!"ADMIN".equals(role) && !"HR".equals(role) && !employee.getId().equals(leave.getEmployee().getId())) {
            return ResponseEntity.status(403).build();
        }
        leaveService.deleteLeaveRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/on-behalf")
    public ResponseEntity<LeaveRequest> applyLeaveOnBehalf(@RequestBody LeaveRequest leaveRequest, Authentication authentication) {
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
            .orElse("");
        if (!"ADMIN".equals(role) && !"HR".equals(role)) {
            return ResponseEntity.status(403).build();
        }
        Employee employee = employeeRepository.findByUsername(leaveRequest.getEmployee().getUsername());
        if (employee == null) {
            throw new RuntimeException("Employee not found with username: " + leaveRequest.getEmployee().getUsername());
        }
        leaveRequest.setEmployee(employee);
        return ResponseEntity.ok(leaveService.applyLeave(leaveRequest));
    }
}