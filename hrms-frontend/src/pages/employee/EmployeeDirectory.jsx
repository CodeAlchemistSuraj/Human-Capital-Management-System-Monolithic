import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiUsers, FiSearch, FiMail, FiUser, FiPhone, FiMapPin, FiFilter, 
  FiDownload, FiPlus, FiEye, FiMessageCircle, FiCalendar, FiTrendingUp,
  FiAward, FiClock, FiStar, FiEdit, FiMoreVertical, FiShare2, FiBook,
  FiBriefcase, FiDollarSign, FiTarget, FiHeart, FiCoffee
} from 'react-icons/fi';

function EmployeeDirectory({ sidebarItems }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [activeTab, setActiveTab] = useState('all');

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
      employmentType: 'Full-time',
      avatar: 'DL',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      performance: 4.8,
      projects: 12,
      tenure: '1.8 years',
      manager: 'Sarah Johnson',
      salaryGrade: 'L4',
      birthday: '1990-08-15',
      workAnniversary: '2022-03-15',
      emergencyContact: 'Jennifer Lee (Spouse)',
      certifications: ['AWS Certified', 'React Professional'],
      languages: ['English', 'Mandarin'],
      workHours: '9:00 AM - 6:00 PM PST'
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
      employmentType: 'Full-time',
      avatar: 'EC',
      skills: ['Product Strategy', 'UX Research', 'Agile', 'Data Analysis', 'JIRA'],
      performance: 4.9,
      projects: 8,
      tenure: '2.3 years',
      manager: 'Michael Brown',
      salaryGrade: 'L5',
      birthday: '1988-12-10',
      workAnniversary: '2021-08-22',
      emergencyContact: 'Robert Chen (Father)',
      certifications: ['PMP', 'Scrum Master'],
      languages: ['English', 'Cantonese'],
      workHours: '8:00 AM - 5:00 PM EST'
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
      employmentType: 'Full-time',
      avatar: 'MD',
      skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Training', 'Benefits'],
      performance: 4.7,
      projects: 15,
      tenure: '3.0 years',
      manager: 'Lisa Wang',
      salaryGrade: 'L3',
      birthday: '1985-03-22',
      workAnniversary: '2020-11-30',
      emergencyContact: 'Amanda Davis (Spouse)',
      certifications: ['SHRM-CP', 'HRCI'],
      languages: ['English'],
      workHours: '8:30 AM - 5:30 PM CST'
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
      employmentType: 'Full-time',
      avatar: 'SR',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media', 'Google Analytics'],
      performance: 4.6,
      projects: 6,
      tenure: '0.9 years',
      manager: 'Thomas Clark',
      salaryGrade: 'L2',
      birthday: '1993-07-18',
      workAnniversary: '2023-01-10',
      emergencyContact: 'Carlos Rodriguez (Brother)',
      certifications: ['Google Ads Certified', 'HubSpot Certified'],
      languages: ['English', 'Spanish'],
      workHours: '9:00 AM - 6:00 PM CST'
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
      status: 'On Leave',
      employmentType: 'Full-time',
      avatar: 'CE',
      skills: ['B2B Sales', 'CRM', 'Negotiation', 'Client Relations', 'Salesforce'],
      performance: 4.4,
      projects: 10,
      tenure: '1.5 years',
      manager: 'Rachel Green',
      salaryGrade: 'L3',
      birthday: '1987-11-05',
      workAnniversary: '2022-06-18',
      emergencyContact: 'Michelle Evans (Spouse)',
      certifications: ['Salesforce Admin', 'Sales Excellence'],
      languages: ['English'],
      workHours: '8:00 AM - 5:00 PM EST',
      leaveReturn: '2024-02-01'
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
      employmentType: 'Full-time',
      avatar: 'OW',
      skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Machine Learning'],
      performance: 4.8,
      projects: 9,
      tenure: '2.0 years',
      manager: 'David Kim',
      salaryGrade: 'L3',
      birthday: '1991-04-30',
      workAnniversary: '2021-12-05',
      emergencyContact: 'James White (Father)',
      certifications: ['Tableau Certified', 'Google Analytics'],
      languages: ['English', 'French'],
      workHours: '9:00 AM - 6:00 PM PST'
    },
  ];

  const departments = ['All', 'Engineering', 'Product', 'Human Resources', 'Marketing', 'Sales', 'Analytics', 'Finance', 'Operations'];
  const statuses = ['All', 'Active', 'On Leave', 'Remote', 'Probation'];
  
  const employeeStats = {
    total: 150,
    departments: 10,
    newHires: 5,
    remote: 42,
    onLeave: 8,
    turnoverRate: 4.2,
    avgTenure: '2.3 years',
    diversityIndex: 76
  };

  // Filter employees based on search, department, and status
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'Remote' && employee.location.includes('Remote')) ||
                         employee.status.toLowerCase().includes(selectedStatus.toLowerCase());
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600', 
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-teal-500 to-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'On Leave': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Remote': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Probation': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-emerald-600';
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Directory"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-lg">
              <FiUsers className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Directory</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Comprehensive employee database and management</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{employees.length} employees shown</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiShare2 className="text-sm" />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filter Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" />
            <input
              type="text"
              placeholder="Search employees by name, position, department, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm"
            />
          </div>
        </div>
        
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm"
        >
          <option value="all">All Departments</option>
          {departments.filter(dept => dept !== 'All').map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm"
        >
          <option value="all">All Status</option>
          {statuses.filter(status => status !== 'All').map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode('table')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              viewMode === 'table' 
                ? 'bg-[var(--primary)] text-white shadow-sm' 
                : 'text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--border)]'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
              viewMode === 'grid' 
                ? 'bg-[var(--primary)] text-white shadow-sm' 
                : 'text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--border)]'
            }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Employees</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.total}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+12 this month</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiUsers className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Departments</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.departments}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Active teams</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiBriefcase className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">New Hires</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.newHires}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Last 30 days</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <FiUser className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Remote</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.remote}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">28% of workforce</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
              <FiMapPin className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Avg Tenure</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.avgTenure}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Stability index</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
              <FiClock className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Diversity</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{employeeStats.diversityIndex}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Inclusion score</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg">
              <FiHeart className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions & Org Chart Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <DashboardCard title="Quick Actions" className="professional-card p-5">
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <FiUser className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Add Employee</div>
                  <div className="text-xs text-[var(--text-light)]">New hire onboarding</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
                <div className="p-2 bg-green-500 text-white rounded-lg">
                  <FiAward className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Performance</div>
                  <div className="text-xs text-[var(--text-light)]">Reviews & feedback</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
                <div className="p-2 bg-purple-500 text-white rounded-lg">
                  <FiDollarSign className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Compensation</div>
                  <div className="text-xs text-[var(--text-light)]">Salary reviews</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
                <div className="p-2 bg-orange-500 text-white rounded-lg">
                  <FiBook className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Training</div>
                  <div className="text-xs text-[var(--text-light)]">Development programs</div>
                </div>
              </button>
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-3">
          {/* Enhanced Employee List - Table View */}
          {viewMode === 'table' ? (
            <DashboardCard className="professional-card p-0 overflow-hidden">
              <div className="p-6 border-b border-[var(--border)]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    Employees ({filteredEmployees.length})
                  </h3>
                  <div className="flex gap-1 bg-[var(--light)] rounded-lg p-1">
                    {['all', 'engineering', 'product', 'hr', 'marketing'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                          activeTab === tab 
                            ? 'bg-[var(--primary)] text-white shadow-sm' 
                            : 'text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--border)]'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--light)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Position & Department</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Performance</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-[var(--light)] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(employee.name)} shadow-lg`}>
                              {employee.avatar}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[var(--text)]">{employee.name}</div>
                              <div className="text-xs text-[var(--text-light)] flex items-center gap-1">
                                <FiCalendar className="text-xs" />
                                {employee.hireDate}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[var(--text)]">{employee.position}</div>
                          <div className="text-xs text-[var(--text-light)]">{employee.department}</div>
                          <div className="text-xs text-[var(--text-light)] mt-1">{employee.employmentType}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-semibold ${getPerformanceColor(employee.performance)}`}>
                              {employee.performance}
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <FiStar 
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(employee.performance) 
                                      ? 'text-amber-500 fill-amber-500' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-xs text-[var(--text-light)]">{employee.projects} projects</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[var(--text-light)]">{employee.email}</div>
                          <div className="text-xs text-[var(--text-light)]">{employee.phone}</div>
                          <div className="text-xs text-[var(--text-light)] mt-1">{employee.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(employee.status)}`}>
                              {employee.status}
                            </span>
                            <span className="text-xs text-[var(--text-light)]">{employee.tenure}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleViewProfile(employee)}
                              className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                              title="View Profile"
                            >
                              <FiEye className="text-lg" />
                            </button>
                            <button 
                              className="p-2 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors bg-gray-50 rounded-lg"
                              title="Send Message"
                            >
                              <FiMessageCircle className="text-lg" />
                            </button>
                            <button 
                              className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                              title="Edit"
                            >
                              <FiEdit className="text-lg" />
                            </button>
                            <button 
                              className="p-2 text-[var(--text-light)] hover:text-[var(--accent)] transition-colors bg-gray-50 rounded-lg"
                              title="More"
                            >
                              <FiMoreVertical className="text-lg" />
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
            /* Enhanced Grid View */
            <DashboardCard className="professional-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-[var(--text)]">
                  Employees ({filteredEmployees.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 hover:shadow-xl transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold text-lg ${getAvatarColor(employee.name)} shadow-lg`}>
                          {employee.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-[var(--text)]">{employee.name}</h4>
                          <p className="text-sm text-[var(--text-light)]">{employee.position}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(employee.status)}`}>
                              {employee.status}
                            </span>
                            <div className="flex items-center gap-1">
                              <FiStar className="text-amber-500 text-xs fill-amber-500" />
                              <span className="text-xs font-medium text-[var(--text)]">{employee.performance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[var(--text-light)] hover:text-[var(--primary)]">
                        <FiMoreVertical />
                      </button>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-light)]">Department:</span>
                        <span className="font-medium text-[var(--text)]">{employee.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-light)]">Tenure:</span>
                        <span className="font-medium text-[var(--text)]">{employee.tenure}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--text-light)]">Location:</span>
                        <span className="font-medium text-[var(--text)]">{employee.location}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-xs font-medium text-[var(--text-light)] mb-2 block">Key Skills</label>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg border border-blue-200">
                            {skill}
                          </span>
                        ))}
                        {employee.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg">
                            +{employee.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewProfile(employee)}
                        className="flex-1 py-2.5 text-sm bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        View Profile
                      </button>
                      <button className="p-2.5 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors bg-gray-50 rounded-xl hover:bg-gray-100">
                        <FiMessageCircle className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          )}
        </div>
      </div>

      {/* Enhanced Employee Profile Modal */}
      {showProfileModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white font-semibold text-2xl ${getAvatarColor(selectedEmployee.name)} shadow-xl`}>
                    {selectedEmployee.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedEmployee.name}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedEmployee.position}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedEmployee.status)}`}>
                        {selectedEmployee.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <FiStar className="text-amber-500 fill-amber-500" />
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedEmployee.performance}/5</span>
                      </div>
                      <span className="text-sm text-[var(--text-light)]">{selectedEmployee.tenure}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiUser className="text-[var(--primary)]" />
                      Basic Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Department</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.department}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Employment Type</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.employmentType}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Manager</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.manager}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Salary Grade</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.salaryGrade}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Work Hours</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.workHours}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiMapPin className="text-[var(--primary)]" />
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FiMail className="text-[var(--text-light)]" />
                        <span className="text-sm text-[var(--text)]">{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiPhone className="text-[var(--text-light)]" />
                        <span className="text-sm text-[var(--text)]">{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FiMapPin className="text-[var(--text-light)]" />
                        <span className="text-sm text-[var(--text)]">{selectedEmployee.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HR Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiBriefcase className="text-[var(--primary)]" />
                      HR Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Hire Date</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.hireDate}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Work Anniversary</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.workAnniversary}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Birthday</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.birthday}</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[var(--text-light)]">Projects</label>
                        <p className="text-sm text-[var(--text)] font-medium">{selectedEmployee.projects}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiAward className="text-[var(--primary)]" />
                      Skills & Certifications
                    </h4>
                    <div className="mb-4">
                      <label className="text-xs font-medium text-[var(--text-light)] mb-2 block">Skills</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 text-sm bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full border border-blue-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[var(--text-light)] mb-2 block">Certifications</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.certifications.map((cert, index) => (
                          <span key={index} className="px-3 py-1 text-sm bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full border border-green-200">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiCoffee className="text-[var(--primary)]" />
                      Additional Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Emergency Contact:</span>
                        <span className="font-medium text-[var(--text)]">{selectedEmployee.emergencyContact}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Languages:</span>
                        <span className="font-medium text-[var(--text)]">{selectedEmployee.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiEdit />
                  Edit Profile
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiDownload />
                  Export
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-[var(--primary)] text-white rounded-xl hover:bg-[var(--secondary)] transition-colors flex items-center gap-2">
                  <FiMessageCircle />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default EmployeeDirectory;