import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiClock, FiUsers, FiCalendar, FiCheckCircle, FiAlertCircle, 
  FiTrendingUp, FiDownload, FiFilter, FiPlus, FiEye, FiEdit,
  FiMapPin, FiWatch, FiUserCheck, FiUserX, FiBarChart, FiRefreshCw
} from 'react-icons/fi';

function TimeAttendance({ sidebarItems }) {
  const [selectedPunch, setSelectedPunch] = useState(null);
  const [showPunchModal, setShowPunchModal] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'analytics', 'exceptions'

  const recentPunches = [
    { 
      id: 1, 
      employee: 'Jane Doe', 
      employeeId: 'EMP-001',
      position: 'Senior Developer',
      department: 'Engineering',
      type: 'Clock In', 
      time: '09:00 AM', 
      date: '2025-06-13',
      status: 'On Time',
      location: 'Main Office - Desk 12A',
      device: 'Biometric Scanner',
      duration: '8.5 hours',
      overtime: '0.5 hours',
      breakTime: '1 hour',
      notes: 'Regular shift',
      lateReason: null
    },
    { 
      id: 2, 
      employee: 'John Smith', 
      employeeId: 'EMP-002',
      position: 'Sales Manager',
      department: 'Sales',
      type: 'Clock Out', 
      time: '05:00 PM', 
      date: '2025-06-12',
      status: 'On Time',
      location: 'Remote - Home Office',
      device: 'Mobile App',
      duration: '8 hours',
      overtime: '0 hours',
      breakTime: '45 minutes',
      notes: 'Completed client calls',
      lateReason: null
    },
    { 
      id: 3, 
      employee: 'Alice Brown', 
      employeeId: 'EMP-003',
      position: 'UX Designer',
      department: 'Design',
      type: 'Clock In', 
      time: '08:45 AM', 
      date: '2025-06-13',
      status: 'Early',
      location: 'Main Office - Design Lab',
      device: 'Biometric Scanner',
      duration: '8.2 hours',
      overtime: '0.2 hours',
      breakTime: '1 hour',
      notes: 'Early for design review',
      lateReason: null
    },
    { 
      id: 4, 
      employee: 'Bob White', 
      employeeId: 'EMP-004',
      position: 'Data Analyst',
      department: 'Analytics',
      type: 'Clock Out', 
      time: '04:50 PM', 
      date: '2025-06-12',
      status: 'Early Departure',
      location: 'Remote - Home Office',
      device: 'Web Portal',
      duration: '7.8 hours',
      overtime: '0 hours',
      breakTime: '45 minutes',
      notes: 'Left early for appointment',
      lateReason: null
    },
    { 
      id: 5, 
      employee: 'Mike Johnson', 
      employeeId: 'EMP-005',
      position: 'HR Manager',
      department: 'Human Resources',
      type: 'Clock In', 
      time: '09:25 AM', 
      date: '2025-06-13',
      status: 'Late',
      location: 'Main Office - HR Wing',
      device: 'Biometric Scanner',
      duration: '8.3 hours',
      overtime: '0.3 hours',
      breakTime: '1 hour',
      notes: 'Traffic delay',
      lateReason: 'Heavy traffic on highway'
    },
  ];

  const attendanceStats = {
    clockedIn: 85,
    totalHours: 4500,
    absentToday: 5,
    lateArrivals: 12,
    earlyDepartures: 8,
    overtimeHours: 245,
    attendanceRate: 94.5,
    averageHours: 8.2
  };

  const attendanceExceptions = [
    {
      id: 1,
      employee: 'Sarah Chen',
      type: 'Late Arrival',
      date: '2025-06-13',
      duration: '25 minutes',
      reason: 'Public transport delay',
      status: 'Pending Review'
    },
    {
      id: 2,
      employee: 'David Kim',
      type: 'Early Departure',
      date: '2025-06-12',
      duration: '45 minutes',
      reason: 'Doctor appointment',
      status: 'Approved'
    }
  ];

  const types = ['All', 'Clock In', 'Clock Out', 'Break Start', 'Break End'];
  const dates = ['Today', 'Yesterday', 'This Week', 'Last Week', 'This Month'];

  const filteredPunches = recentPunches.filter(punch => {
    const matchesType = selectedType === 'all' || punch.type === selectedType;
    return matchesType;
  });

  const handleViewPunch = (punch) => {
    setSelectedPunch(punch);
    setShowPunchModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'On Time': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Early': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Late': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Early Departure': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Absent': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Clock In': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Clock Out': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Break Start': return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
      case 'Break End': return 'bg-teal-100 text-teal-800 border border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600', 
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-teal-500 to-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Time & Attendance"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
              <FiClock className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Time & Attendance</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Monitor employee attendance, working hours, and time tracking</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{recentPunches.length} recent punches</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiFilter className="text-sm" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiDownload className="text-sm" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            Manual Entry
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 mb-6 w-fit">
        {['overview', 'analytics', 'exceptions'].map(tab => (
          <button
            key={tab}
            onClick={() => setViewMode(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              viewMode === tab 
                ? 'bg-[var(--primary)] text-white shadow-sm' 
                : 'text-[var(--text-light)] hover:text-[var(--text)] hover:bg-[var(--border)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Clocked In</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.clockedIn}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">92% present</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg">
              <FiUserCheck className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Hours</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.totalHours}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">This week</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiClock className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Absent Today</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.absentToday}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">5% of workforce</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
              <FiUserX className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Late Arrivals</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.lateArrivals}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">This week</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg">
              <FiAlertCircle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Overtime Hours</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.overtimeHours}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">This month</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiWatch className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Attendance Rate</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{attendanceStats.attendanceRate}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Excellent</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <FiCheckCircle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl hover:from-teal-100 hover:to-teal-200 transition-all group">
          <div className="p-3 bg-teal-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiClock className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Quick Punch</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Manual entry</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
          <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiCalendar className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Schedule</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Shift planning</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
          <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiBarChart className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Reports</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Analytics</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
          <div className="p-3 bg-orange-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiRefreshCw className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Sync Data</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Update records</span>
        </button>
      </div>

      {/* Time Punches Section */}
      <DashboardCard className="professional-card p-0 overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Recent Time Punches</h3>
              <p className="text-sm text-[var(--text-light)] mt-1">
                {filteredPunches.length} punches • Real-time monitoring
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type === 'All' ? 'all' : type}>{type}</option>
                ))}
              </select>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                {dates.map(date => (
                  <option key={date} value={date.toLowerCase()}>{date}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--light)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Punch Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Time & Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredPunches.map((punch) => (
                <tr key={punch.id} className="hover:bg-[var(--light)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(punch.employee)} shadow-lg`}>
                        {punch.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)]">{punch.employee}</div>
                        <div className="text-xs text-[var(--text-light)]">{punch.position}</div>
                        <div className="text-xs text-[var(--text-light)]">{punch.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(punch.type)}`}>
                        {punch.type}
                      </span>
                      <div className="text-xs text-[var(--text-light)]">
                        Device: {punch.device}
                      </div>
                      <div className="text-xs text-[var(--text-light)]">
                        Duration: {punch.duration}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-[var(--text)]">{punch.time}</div>
                      <div className="text-xs text-[var(--text-light)]">{punch.date}</div>
                      <div className="text-xs text-[var(--text-light)] flex items-center gap-1">
                        <FiMapPin className="text-xs" />
                        {punch.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(punch.status)}`}>
                      {punch.status}
                    </span>
                    {punch.overtime !== '0 hours' && (
                      <div className="text-xs text-amber-600 mt-1">
                        OT: {punch.overtime}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleViewPunch(punch)}
                        className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button 
                        className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                        title="Edit Punch"
                      >
                        <FiEdit className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>

      {/* Attendance Exceptions */}
      <div className="mt-6">
        <DashboardCard title="Attendance Exceptions" className="professional-card p-6">
          <div className="space-y-4">
            {attendanceExceptions.map((exception) => (
              <div key={exception.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-transparent border border-amber-200 rounded-xl hover:border-amber-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <FiAlertCircle className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">{exception.employee}</h4>
                    <p className="text-xs text-[var(--text-light)]">{exception.type} • {exception.duration}</p>
                    <p className="text-xs text-[var(--text-light)] mt-1">Reason: {exception.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    exception.status === 'Approved' 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {exception.status}
                  </span>
                  <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      {/* Enhanced Punch Details Modal */}
      {showPunchModal && selectedPunch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-teal-50 to-cyan-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-semibold text-xl ${getAvatarColor(selectedPunch.employee)} shadow-xl`}>
                    {selectedPunch.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedPunch.employee}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedPunch.position} • {selectedPunch.department}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getTypeBadgeClass(selectedPunch.type)}`}>
                        {selectedPunch.type}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedPunch.status)}`}>
                        {selectedPunch.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPunchModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <FiClock className="text-teal-500" />
                    Time Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Time:</span>
                      <span className="text-lg font-bold text-[var(--text)]">{selectedPunch.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Date:</span>
                      <span className="text-sm font-semibold text-[var(--text)]">{selectedPunch.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Duration:</span>
                      <span className="text-sm font-semibold text-[var(--text)]">{selectedPunch.duration}</span>
                    </div>
                    {selectedPunch.overtime !== '0 hours' && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Overtime:</span>
                        <span className="text-sm font-semibold text-amber-600">{selectedPunch.overtime}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <FiMapPin className="text-teal-500" />
                    Location & Device
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Location:</span>
                      <span className="text-sm font-semibold text-[var(--text)]">{selectedPunch.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Device:</span>
                      <span className="text-sm font-semibold text-[var(--text)]">{selectedPunch.device}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-light)]">Break Time:</span>
                      <span className="text-sm font-semibold text-[var(--text)]">{selectedPunch.breakTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPunch.lateReason && (
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <FiAlertCircle className="text-amber-500" />
                    Late Arrival Reason
                  </h4>
                  <p className="text-sm text-[var(--text)] bg-amber-50 p-4 rounded-xl border border-amber-200">
                    {selectedPunch.lateReason}
                  </p>
                </div>
              )}

              {selectedPunch.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <FiFileText className="text-blue-500" />
                    Additional Notes
                  </h4>
                  <p className="text-sm text-[var(--text)] bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {selectedPunch.notes}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[var(--border)] flex justify-end gap-3">
              <button 
                onClick={() => setShowPunchModal(false)}
                className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors">
                Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default TimeAttendance;