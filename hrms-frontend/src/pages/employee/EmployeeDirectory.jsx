import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { FiUsers, FiSearch, FiMail, FiUser, FiPhone, FiMapPin, FiFilter, FiDownload, FiPlus, FiEye, FiMessageCircle } from 'react-icons/fi';

function EmployeeDirectory({ sidebarItems }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const employees = [
    { 
      id: 1, 
      name: 'David Lee', 
      position: 'Senior Software Engineer', 
      department: 'Engineering', 
      email: 'david.l@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      hireDate: '2022-03-15',
      status: 'Active',
      avatar: 'DL',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS']
    },
    { 
      id: 2, 
      name: 'Emily Chen', 
      position: 'Product Manager', 
      department: 'Product', 
      email: 'emily.c@example.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      hireDate: '2021-08-22',
      status: 'Active',
      avatar: 'EC',
      skills: ['Product Strategy', 'UX Research', 'Agile', 'Data Analysis']
    },
    { 
      id: 3, 
      name: 'Mark Davis', 
      position: 'HR Generalist', 
      department: 'Human Resources', 
      email: 'mark.d@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      hireDate: '2020-11-30',
      status: 'Active',
      avatar: 'MD',
      skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Training']
    },
    { 
      id: 4, 
      name: 'Sophia Rodriguez', 
      position: 'Marketing Specialist', 
      department: 'Marketing', 
      email: 'sophia.r@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      hireDate: '2023-01-10',
      status: 'Active',
      avatar: 'SR',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media']
    },
    { 
      id: 5, 
      name: 'Chris Evans', 
      position: 'Sales Representative', 
      department: 'Sales', 
      email: 'chris.e@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      hireDate: '2022-06-18',
      status: 'Active',
      avatar: 'CE',
      skills: ['B2B Sales', 'CRM', 'Negotiation', 'Client Relations']
    },
    { 
      id: 6, 
      name: 'Olivia White', 
      position: 'Data Analyst', 
      department: 'Analytics', 
      email: 'olivia.w@example.com',
      phone: '+1 (555) 678-9012',
      location: 'Seattle, WA',
      hireDate: '2021-12-05',
      status: 'Active',
      avatar: 'OW',
      skills: ['SQL', 'Python', 'Tableau', 'Statistics']
    },
  ];

  const departments = ['All', 'Engineering', 'Product', 'Human Resources', 'Marketing', 'Sales', 'Analytics', 'Finance', 'Operations'];
  const employeeStats = {
    total: 150,
    departments: 10,
    newHires: 5,
    remote: 42
  };

  // Filter employees based on search and department
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-[var(--primary)]', 'bg-[var(--secondary)]', 'bg-[var(--success)]', 
      'bg-[var(--warning)]', 'bg-[var(--accent)]', 'bg-[var(--error)]'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Directory"
    >
      {/* Header Section - Clean without gradient */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FiUsers className="text-3xl mr-3 text-[var(--primary)]" />
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Directory</h2>
            <p className="text-sm text-[var(--text-light)] mt-1">
              Search and connect with colleagues across the organization
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] hover:bg-[var(--light)] transition-colors">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors">
            <FiPlus className="text-sm" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" />
            <input
              type="text"
              placeholder="Search employees by name, position, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
        </div>
        
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        >
          <option value="all">All Departments</option>
          {departments.filter(dept => dept !== 'All').map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <div className="flex gap-2 bg-[var(--light)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'table' 
                ? 'bg-[var(--primary)] text-white' 
                : 'text-[var(--text-light)] hover:text-[var(--text)]'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-[var(--primary)] text-white' 
                : 'text-[var(--text-light)] hover:text-[var(--text)]'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Compact Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Employees</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.total}</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--primary)] bg-opacity-10">
              <FiUsers className="text-[var(--primary)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Departments</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.departments}</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--secondary)] bg-opacity-10">
              <FiSearch className="text-[var(--secondary)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">New Hires (30d)</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.newHires}</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--success)] bg-opacity-10">
              <FiUser className="text-[var(--success)] text-lg" />
            </div>
          </div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Remote Workers</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.remote}</h2>
            </div>
            <div className="p-2 rounded-lg bg-[var(--accent)] bg-opacity-10">
              <FiMapPin className="text-[var(--accent)] text-lg" />
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Employee List - Table View */}
      {viewMode === 'table' ? (
        <DashboardCard className="professional-card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Employees ({filteredEmployees.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--light)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-[var(--light)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(employee.name)}`}>
                          {employee.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)]">{employee.name}</div>
                          <div className="text-xs text-[var(--text-light)]">{employee.hireDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text)]">{employee.position}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-[var(--light)] text-[var(--text)] rounded-full">
                        {employee.department}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--text-light)]">{employee.email}</div>
                      <div className="text-xs text-[var(--text-light)]">{employee.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-[var(--success)] bg-opacity-10 text-[var(--success)] rounded-full">
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button 
                          onClick={() => handleViewProfile(employee)}
                          className="text-[var(--primary)] hover:text-[var(--secondary)] transition-colors"
                          title="View Profile"
                        >
                          <FiEye className="text-lg" />
                        </button>
                        <button 
                          className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors"
                          title="Send Message"
                        >
                          <FiMessageCircle className="text-lg" />
                        </button>
                        <button 
                          className="text-[var(--text-light)] hover:text-[var(--success)] transition-colors"
                          title="Contact"
                        >
                          <FiMail className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      ) : (
        /* Grid View */
        <DashboardCard className="professional-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-[var(--text)]">
              Employees ({filteredEmployees.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-lg p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${getAvatarColor(employee.name)}`}>
                    {employee.avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-[var(--text)]">{employee.name}</h4>
                    <p className="text-xs text-[var(--text-light)]">{employee.position}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                    <FiMapPin className="text-[var(--text-light)]" />
                    {employee.department}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                    <FiMail className="text-[var(--text-light)]" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-light)]">
                    <FiPhone className="text-[var(--text-light)]" />
                    {employee.phone}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-[var(--light)] text-[var(--text)] rounded">
                      {skill}
                    </span>
                  ))}
                  {employee.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-[var(--light)] text-[var(--text-light)] rounded">
                      +{employee.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewProfile(employee)}
                    className="flex-1 py-2 text-xs bg-[var(--primary)] text-white rounded hover:bg-[var(--secondary)] transition-colors"
                  >
                    View Profile
                  </button>
                  <button className="p-2 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors">
                    <FiMessageCircle className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Employee Profile Modal */}
      {showProfileModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xl ${getAvatarColor(selectedEmployee.name)}`}>
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text)]">{selectedEmployee.name}</h3>
                    <p className="text-sm text-[var(--text-light)]">{selectedEmployee.position}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Department</label>
                  <p className="text-sm text-[var(--text)]">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Status</label>
                  <p className="text-sm text-[var(--success)]">{selectedEmployee.status}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Email</label>
                  <p className="text-sm text-[var(--text)]">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Phone</label>
                  <p className="text-sm text-[var(--text)]">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Location</label>
                  <p className="text-sm text-[var(--text)]">{selectedEmployee.location}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-light)]">Hire Date</label>
                  <p className="text-sm text-[var(--text)]">{selectedEmployee.hireDate}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-[var(--text-light)] mb-2 block">Skills & Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-[var(--light)] text-[var(--text)] rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3">
              <button 
                onClick={() => setShowProfileModal(false)}
                className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-lg hover:bg-[var(--light)] transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--secondary)] transition-colors">
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default EmployeeDirectory;