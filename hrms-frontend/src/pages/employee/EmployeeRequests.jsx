import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiHelpCircle, FiClock, FiCheckCircle, FiXCircle, FiList, 
  FiFilter, FiDownload, FiPlus, FiEye, FiEdit, FiMessageCircle,
  FiTrendingUp, FiAlertTriangle, FiUser, FiCalendar, FiMail,
  FiArrowUp, FiArrowDown, FiSearch, FiMoreVertical, FiShare2
} from 'react-icons/fi';

function EmployeeRequests({ sidebarItems }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const requests = [
    { 
      id: 1, 
      employee: 'Sarah Connor', 
      employeeId: 'EMP-001',
      position: 'Senior Developer',
      department: 'Engineering',
      type: 'IT Support', 
      subtype: 'Hardware Request',
      status: 'Pending', 
      date: '2025-06-12',
      priority: 'High',
      description: 'Need new development laptop with 32GB RAM for upcoming project work',
      attachments: 2,
      assignedTo: 'IT Support Team',
      estimatedResolution: '2025-06-15',
      lastUpdated: '2025-06-12 14:30',
      comments: 3,
      budget: 2500,
      impact: 'Project Delay'
    },
    { 
      id: 2, 
      employee: 'John Rambo', 
      employeeId: 'EMP-002',
      position: 'Sales Manager',
      department: 'Sales',
      type: 'Supplies Order', 
      subtype: 'Office Supplies',
      status: 'Approved', 
      date: '2025-06-10',
      priority: 'Medium',
      description: 'Monthly office supplies including notebooks, pens, and printer cartridges',
      attachments: 1,
      assignedTo: 'Procurement Team',
      estimatedResolution: '2025-06-12',
      lastUpdated: '2025-06-10 11:15',
      comments: 1,
      budget: 450,
      impact: 'Team Productivity'
    },
    { 
      id: 3, 
      employee: 'Ellen Ripley', 
      employeeId: 'EMP-003',
      position: 'Operations Lead',
      department: 'Operations',
      type: 'Travel Reimbursement', 
      subtype: 'Business Trip',
      status: 'Rejected', 
      date: '2025-06-08',
      priority: 'Medium',
      description: 'Client meeting travel expenses for Q2 business review in New York',
      attachments: 3,
      assignedTo: 'Finance Team',
      estimatedResolution: '2025-06-09',
      lastUpdated: '2025-06-08 16:45',
      comments: 5,
      budget: 1200,
      impact: 'Client Relations',
      rejectionReason: 'Expenses exceed policy limits'
    },
    { 
      id: 4, 
      employee: 'Marty McFly', 
      employeeId: 'EMP-004',
      position: 'Marketing Specialist',
      department: 'Marketing',
      type: 'Work from Home', 
      subtype: 'Remote Work Request',
      status: 'Pending', 
      date: '2025-06-13',
      priority: 'Low',
      description: 'Request for 2 days remote work per week for better work-life balance',
      attachments: 0,
      assignedTo: 'HR Manager',
      estimatedResolution: '2025-06-16',
      lastUpdated: '2025-06-13 09:20',
      comments: 2,
      budget: 0,
      impact: 'Team Coordination'
    },
    { 
      id: 5, 
      employee: 'Leia Organa', 
      employeeId: 'EMP-005',
      position: 'Team Lead',
      department: 'Product',
      type: 'Training Request', 
      subtype: 'Professional Development',
      status: 'Approved', 
      date: '2025-06-11',
      priority: 'High',
      description: 'Advanced Product Management certification course to enhance leadership skills',
      attachments: 2,
      assignedTo: 'Learning & Development',
      estimatedResolution: '2025-06-11',
      lastUpdated: '2025-06-11 15:40',
      comments: 4,
      budget: 1800,
      impact: 'Leadership Development'
    },
    { 
      id: 6, 
      employee: 'Tony Stark', 
      employeeId: 'EMP-006',
      position: 'Lead Engineer',
      department: 'R&D',
      type: 'Equipment Purchase', 
      subtype: 'Lab Equipment',
      status: 'Under Review', 
      date: '2025-06-14',
      priority: 'Critical',
      description: 'Specialized testing equipment for new product development phase',
      attachments: 4,
      assignedTo: 'Procurement Team',
      estimatedResolution: '2025-06-18',
      lastUpdated: '2025-06-14 10:15',
      comments: 6,
      budget: 8500,
      impact: 'R&D Timeline'
    },
  ];

  const requestTypes = ['All', 'IT Support', 'Supplies Order', 'Travel Reimbursement', 'Work from Home', 'Training Request', 'Equipment Purchase', 'Leave Request'];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected', 'Under Review', 'Completed'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const requestStats = {
    total: 24,
    pending: 8,
    approved: 12,
    rejected: 3,
    underReview: 1,
    avgResponseTime: '2.3 days',
    completionRate: 85,
    highPriority: 5
  };

  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
      const matchesType = selectedType === 'all' || request.type === selectedType;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'employee':
          aValue = a.employee.toLowerCase();
          bValue = b.employee.toLowerCase();
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Approved': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Under Review': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Employee Requests"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] shadow-lg">
              <FiHelpCircle className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Requests</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Manage and track employee requests and approvals</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{requests.length} active requests</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiFilter className="text-sm" />
            Filter
            <span className="bg-[var(--primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            New Request
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
              placeholder="Search requests by employee, type, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder-[var(--text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm"
            />
          </div>
        </div>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent shadow-sm"
        >
          <option value="all">All Types</option>
          {requestTypes.filter(type => type !== 'All').map(type => (
            <option key={type} value={type}>{type}</option>
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

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm text-sm">
            Quick Actions
          </button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Requests</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.total}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+5 this week</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiList className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Pending</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.pending}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Needs attention</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
              <FiClock className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Approved</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.approved}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">This month</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <FiCheckCircle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">High Priority</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.highPriority}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Urgent attention</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
              <FiAlertTriangle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Avg Response</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.avgResponseTime}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Response time</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiClock className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Completion Rate</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{requestStats.completionRate}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Efficiency score</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
              <FiTrendingUp className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions & Request Management */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-1">
          <DashboardCard title="Quick Actions" className="professional-card p-5">
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
                <div className="p-2 bg-blue-500 text-white rounded-lg">
                  <FiPlus className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">New Request</div>
                  <div className="text-xs text-[var(--text-light)]">Create request</div>
                </div>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
                <div className="p-2 bg-green-500 text-white rounded-lg">
                  <FiCheckCircle className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Bulk Approve</div>
                  <div className="text-xs text-[var(--text-light)]">Approve multiple</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
                <div className="p-2 bg-purple-500 text-white rounded-lg">
                  <FiDownload className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Export Report</div>
                  <div className="text-xs text-[var(--text-light)]">Download data</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
                <div className="p-2 bg-orange-500 text-white rounded-lg">
                  <FiFilter className="text-lg" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-[var(--text)]">Advanced Filter</div>
                  <div className="text-xs text-[var(--text-light)]">Custom filters</div>
                </div>
              </button>
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-3">
          {/* Enhanced Requests Table */}
          <DashboardCard className="professional-card p-0 overflow-hidden">
            <div className="p-6 border-b border-[var(--border)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text)]">
                    Employee Requests ({filteredRequests.length})
                  </h3>
                  <p className="text-sm text-[var(--text-light)] mt-1">
                    Manage and review all employee requests
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-[var(--text-light)]">Sort by:</div>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-3 py-2 text-sm bg-[var(--light)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  >
                    <option value="date">Date</option>
                    <option value="priority">Priority</option>
                    <option value="employee">Employee</option>
                    <option value="type">Type</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors"
                  >
                    {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--light)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee & Request</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Type & Details</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-[var(--light)] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(request.employee)} shadow-lg`}>
                            {request.employee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[var(--text)]">{request.employee}</div>
                            <div className="text-xs text-[var(--text-light)]">{request.department}</div>
                            <div className="text-xs text-[var(--text-light)]">{request.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[var(--text)]">{request.type}</div>
                        <div className="text-xs text-[var(--text-light)]">{request.subtype}</div>
                        <div className="text-xs text-[var(--text-light)] truncate max-w-xs">{request.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityBadgeClass(request.priority)}`}>
                          {request.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-[var(--text)]">{request.date}</div>
                        <div className="text-xs text-[var(--text-light)]">{request.lastUpdated.split(' ')[1]}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleViewRequest(request)}
                            className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                            title="View Details"
                          >
                            <FiEye className="text-lg" />
                          </button>
                          <button 
                            className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                            title="Approve"
                          >
                            <FiCheckCircle className="text-lg" />
                          </button>
                          <button 
                            className="p-2 text-[var(--text-light)] hover:text-[var(--error)] transition-colors bg-gray-50 rounded-lg"
                            title="Reject"
                          >
                            <FiXCircle className="text-lg" />
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
        </div>
      </div>

      {/* Enhanced Request Details Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-semibold text-xl ${getAvatarColor(selectedRequest.employee)} shadow-xl`}>
                    {selectedRequest.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedRequest.employee}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedRequest.position} • {selectedRequest.department}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityBadgeClass(selectedRequest.priority)}`}>
                        {selectedRequest.priority} Priority
                      </span>
                      <span className="text-sm text-[var(--text-light)]">ID: {selectedRequest.employeeId}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Request Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiHelpCircle className="text-[var(--primary)]" />
                      Request Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Request Type:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.type}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Subtype:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.subtype}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Budget Impact:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">${selectedRequest.budget}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Business Impact:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.impact}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiUser className="text-[var(--primary)]" />
                      Description
                    </h4>
                    <p className="text-sm text-[var(--text)] bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {selectedRequest.description}
                    </p>
                  </div>
                </div>

                {/* Processing Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiClock className="text-[var(--primary)]" />
                      Processing Info
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Submitted:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.date}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Assigned To:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.assignedTo}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Est. Resolution:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.estimatedResolution}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Last Updated:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.lastUpdated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Attachments:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.attachments} files</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Comments:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedRequest.comments}</span>
                      </div>
                    </div>
                  </div>

                  {selectedRequest.status === 'Rejected' && selectedRequest.rejectionReason && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                        <FiXCircle className="text-red-500" />
                        Rejection Reason
                      </h4>
                      <p className="text-sm text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                        {selectedRequest.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiMessageCircle />
                  Add Comment
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiDownload />
                  Export
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowRequestModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2">
                  <FiXCircle />
                  Reject
                </button>
                <button className="px-6 py-2 text-sm bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2">
                  <FiCheckCircle />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default EmployeeRequests;