package com.hrms.service;

import com.hrms.model.Employee;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee getEmployeeById(Long id);
    Employee updateEmployee(Long id, Employee employee);
    void deleteEmployee(Long id);
    Employee findByEmployeeId(String employeeId);
    Employee findByEmail(String email);
}