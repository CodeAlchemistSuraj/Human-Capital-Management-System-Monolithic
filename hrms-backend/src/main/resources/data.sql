-- Initial data for HRMS H2 database
-- Seeds users, employees, and sample data for testing

-- Users for authentication
-- Passwords are BCrypt encoded. Here are the plain text versions for reference:
-- admin123
-- hr123
-- emp123
-- manager123
-- user123 (used for user1, user2)
-- finance123
-- Users for authentication

INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN'),
('hr', 'hr123', 'HR'),
('employee', 'emp123', 'EMPLOYEE'),
('manager', 'manager123', 'MANAGER'),
('user1', 'user123', 'EMPLOYEE'),
('user2', 'user123', 'EMPLOYEE'),
('finance_user', 'finance123', 'FINANCE');

-- Employees
INSERT INTO employees (employee_id, username, first_name, last_name, email, phone_number, department, designation, joining_date) VALUES
('EMP001', 'employee', 'John', 'Doe', 'john.doe@example.com', '1234567890', 'IT', 'Software Developer', '2024-01-01'),
('EMP002', 'hr', 'Jane', 'Smith', 'jane.smith@example.com', '0987654321', 'HR', 'HR Manager', '2023-06-15'),
('EMP003', 'manager', 'Alice', 'Johnson', 'alice.j@example.com', '1122334455', 'Sales', 'Sales Lead', '2022-03-20'),
('EMP004', 'user1', 'Bob', 'Williams', 'bob.w@example.com', '2233445566', 'Marketing', 'Marketing Specialist', '2024-02-10'),
('EMP005', 'user2', 'Charlie', 'Brown', 'charlie.b@example.com', '3344556677', 'IT', 'QA Engineer', '2023-09-01'),
('EMP006', NULL, 'Diana', 'Prince', 'diana.p@example.com', '4455667788', 'Finance', 'Accountant', '2024-05-01'),
('EMP007', NULL, 'Eva', 'Green', 'eva.g@example.com', '5566778899', 'HR', 'HR Assistant', '2024-03-01'),
('EMP008', NULL, 'Frank', 'White', 'frank.w@example.com', '6677889900', 'Operations', 'Operations Coordinator', '2023-11-01');


-- Leave Requests
INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason, status) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), 'SICK', '2025-06-15', '2025-06-17', 'Medical appointment', 'PENDING'),
((SELECT id FROM employees WHERE employee_id = 'EMP003'), 'CASUAL', '2025-07-01', '2025-07-05', 'Family vacation', 'APPROVED'),
((SELECT id FROM employees WHERE employee_id = 'EMP004'), 'PERSONAL', '2025-06-20', '2025-06-20', 'Personal errand', 'PENDING'),
((SELECT id FROM employees WHERE employee_id = 'EMP005'), 'SICK', '2025-05-10', '2025-05-12', 'Flu', 'APPROVED'),
((SELECT id FROM employees WHERE employee_id = 'EMP002'), 'ANNUAL', '2025-08-01', '2025-08-10', 'Annual leave', 'PENDING'),
((SELECT id FROM employees WHERE employee_id = 'EMP006'), 'BEREAVEMENT', '2025-06-10', '2025-06-12', 'Family loss', 'APPROVED');


-- Payrolls
INSERT INTO payrolls (employee_id, payroll_date, basic_salary, allowances, deductions, net_salary, pf_contribution, esi_contribution, tds, payslip_status) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), '2025-05-31', 50000.00, 5000.00, 2000.00, 53000.00, 3000.00, 1000.00, 1000.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP002'), '2025-05-31', 60000.00, 7000.00, 3000.00, 64000.00, 3600.00, 1200.00, 1500.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP003'), '2025-05-31', 75000.00, 8000.00, 4500.00, 78500.00, 4500.00, 1500.00, 2000.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP004'), '2025-05-31', 45000.00, 4000.00, 1500.00, 47500.00, 2700.00, 900.00, 800.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP005'), '2025-05-31', 52000.00, 5500.00, 2200.00, 55300.00, 3120.00, 1040.00, 1100.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP006'), '2025-05-31', 48000.00, 4800.00, 1800.00, 51000.00, 2880.00, 960.00, 950.00, 'GENERATED'),
((SELECT id FROM employees WHERE employee_id = 'EMP007'), '2025-05-31', 42000.00, 3500.00, 1200.00, 44300.00, 2520.00, 840.00, 700.00, 'GENERATED');


-- Trainings
INSERT INTO trainings (employee_id, training_name, start_date, end_date, hours, trainer, feedback, status) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), 'Spring Boot Microservices', '2025-03-01', '2025-03-05', 40, 'Tech Solutions Inc.', 'Very informative, highly practical.', 'COMPLETED'),
((SELECT id FROM employees WHERE employee_id = 'EMP004'), 'Advanced Marketing Strategies', '2025-04-10', '2025-04-12', 24, 'Marketing Gurus Ltd.', 'Good overview of digital trends.', 'COMPLETED'),
((SELECT id FROM employees WHERE employee_id = 'EMP007'), 'New Employee Onboarding', '2024-03-05', '2024-03-05', 8, 'HR Department', 'Comprehensive introduction to company policies.', 'COMPLETED'),
((SELECT id FROM employees WHERE employee_id = 'EMP003'), 'Leadership Skills for Managers', '2025-07-10', '2025-07-12', 16, 'LeadForward Consultants', NULL, 'SCHEDULED');


-- Candidates
INSERT INTO candidates (first_name, last_name, email, job_title, application_date, resume_path, status) VALUES
('Michael', 'Scott', 'michael.s@example.com', 'Regional Manager', '2025-05-01', '/resumes/michael_scott_resume.pdf', 'HIRED'),
('Pam', 'Beesly', 'pam.b@example.com', 'Office Administrator', '2025-05-10', '/resumes/pam_beesly_resume.pdf', 'INTERVIEW'),
('Dwight', 'Schrute', 'dwight.s@example.com', 'Assistant to the Regional Manager', '2025-04-25', '/resumes/dwight_schrute_resume.pdf', 'REJECTED'),
('Angela', 'Martin', 'angela.m@example.com', 'Senior Accountant', '2025-05-15', '/resumes/angela_martin_resume.pdf', 'NEW');


-- Exit Processes
INSERT INTO exit_processes (employee_id, exit_type, exit_date, exit_interview_notes, knowledge_transfer_details, final_settlement_status) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP008'), 'RESIGNATION', '2025-06-30', 'Employee found a new opportunity.', 'Handed over all ongoing tasks and documentation.', 'PENDING'),
((SELECT id FROM employees WHERE employee_id = 'EMP004'), 'TERMINATION', '2025-05-01', 'Performance issues.', 'All marketing campaigns transferred to Alice Johnson.', 'COMPLETED');


-- Loan Applications
INSERT INTO loan_applications (employee_id, loan_type, loan_amount, application_date, documents, status) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), 'HOUSING', 500000.00, '2025-04-01', '/loans/john_doe_housing.pdf', 'APPROVED'),
((SELECT id FROM employees WHERE employee_id = 'EMP005'), 'PERSONAL', 50000.00, '2025-05-10', '/loans/charlie_b_personal.pdf', 'PENDING'),
((SELECT id FROM employees WHERE employee_id = 'EMP006'), 'EDUCATION', 150000.00, '2025-03-15', '/loans/diana_p_education.pdf', 'REJECTED');


-- Manpower Records
INSERT INTO manpower_records (employee_id, department, designation, region, entry_date, exit_date, is_outsourced, overtime_hours) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), 'IT', 'Software Developer', 'North', '2024-01-01', NULL, FALSE, 15),
((SELECT id FROM employees WHERE employee_id = 'EMP003'), 'Sales', 'Sales Lead', 'South', '2022-03-20', NULL, FALSE, 20),
((SELECT id FROM employees WHERE employee_id = 'EMP008'), 'Operations', 'Operations Coordinator', 'East', '2023-11-01', '2025-06-30', FALSE, 10),
((SELECT id FROM employees WHERE employee_id = 'EMP007'), 'HR', 'HR Assistant', 'West', '2024-03-01', NULL, FALSE, 5);


-- Performance Reviews
INSERT INTO performance_reviews (employee_id, cycle, review_date, rating, feedback, goals, kras) VALUES
((SELECT id FROM employees WHERE employee_id = 'EMP001'), 'Q1 2025', '2025-04-10', 4.5, 'Excellent performance in project delivery, strong technical skills.', 'Complete certification, mentor junior devs.', 'Deliver 2 major features, reduce bug count by 10%'),
((SELECT id FROM employees WHERE employee_id = 'EMP004'), 'Q1 2025', '2025-04-05', 3.0, 'Meets expectations, needs to improve proactive problem-solving.', 'Take lead on new campaign, attend public speaking course.', 'Increase lead generation by 5%, improve social media engagement.'),
((SELECT id FROM employees WHERE employee_id = 'EMP005'), 'Annual 2024', '2025-03-20', 5.0, 'Exceptional QA, consistently identifies critical issues and provides valuable insights.', 'Automate 3 new test suites, cross-train on security testing.', 'Zero critical bugs in production, 90% test automation coverage.');


-- System Settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('max_annual_leave_days', '20'),
('payroll_tax_rate', '0.1'),
('holiday_calendar_url', 'https://example.com/holidays.ics'),
('email_notification_enabled', 'true'),
('performance_review_frequency', 'Quarterly');