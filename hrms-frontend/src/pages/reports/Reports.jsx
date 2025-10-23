import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiBarChart2, FiDownload, FiEye, FiFileText, FiFilter, 
  FiPlus, FiTrendingUp, FiUsers, FiDollarSign, FiClock,
  FiAward, FiCalendar, FiPieChart, FiRefreshCw, FiShare2,
  FiMoreVertical, FiEdit, FiPrinter, FiMail
} from 'react-icons/fi';

function Reports({ sidebarItems }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('reports'); // 'reports', 'analytics', 'scheduled'

  const generatedReports = [
    { 
      id: 1, 
      name: 'Monthly Payroll Summary', 
      type: 'Financial', 
      date: '2025-06-01', 
      status: 'Completed',
      size: '2.4 MB',
      format: 'PDF',
      generatedBy: 'Sarah Johnson',
      description: 'Comprehensive payroll analysis including taxes, deductions, and net pay distribution',
      dataPoints: 1250,
      lastAccessed: '2025-06-15',
      downloadCount: 24,
      schedule: 'Monthly',
      accessLevel: 'Finance Team'
    },
    { 
      id: 2, 
      name: 'Employee Performance Metrics Q2', 
      type: 'Performance', 
      date: '2025-05-30', 
      status: 'Completed',
      size: '1.8 MB',
      format: 'Excel',
      generatedBy: 'Michael Chen',
      description: 'Quarterly performance review data with ratings, goals, and improvement areas',
      dataPoints: 890,
      lastAccessed: '2025-06-12',
      downloadCount: 18,
      schedule: 'Quarterly',
      accessLevel: 'Management'
    },
    { 
      id: 3, 
      name: 'Recruitment Funnel Analysis', 
      type: 'Recruitment', 
      date: '2025-06-10', 
      status: 'Pending',
      size: 'Processing',
      format: 'PDF',
      generatedBy: 'Lisa Wang',
      description: 'Recruitment pipeline analysis with conversion rates and time-to-hire metrics',
      dataPoints: 450,
      lastAccessed: 'Never',
      downloadCount: 0,
      schedule: 'On Demand',
      accessLevel: 'HR Team'
    },
    { 
      id: 4, 
      name: 'Leave Trends Last Year', 
      type: 'Attendance', 
      date: '2025-01-05', 
      status: 'Completed',
      size: '3.1 MB',
      format: 'PDF',
      generatedBy: 'David Kim',
      description: 'Annual leave pattern analysis with seasonal trends and department comparisons',
      dataPoints: 2100,
      lastAccessed: '2025-03-20',
      downloadCount: 32,
      schedule: 'Annual',
      accessLevel: 'All Managers'
    },
    { 
      id: 5, 
      name: 'Department Headcount Report', 
      type: 'General', 
      date: '2025-06-14', 
      status: 'Completed',
      size: '1.2 MB',
      format: 'Excel',
      generatedBy: 'Rachel Green',
      description: 'Current headcount by department with growth trends and vacancy analysis',
      dataPoints: 680,
      lastAccessed: '2025-06-14',
      downloadCount: 15,
      schedule: 'Monthly',
      accessLevel: 'Executive'
    },
    { 
      id: 6, 
      name: 'Training Completion Dashboard', 
      type: 'Training', 
      date: '2025-06-08', 
      status: 'Completed',
      size: '2.7 MB',
      format: 'PDF',
      generatedBy: 'Thomas Clark',
      description: 'Training program completion rates and skill development progress tracking',
      dataPoints: 1120,
      lastAccessed: '2025-06-10',
      downloadCount: 21,
      schedule: 'Monthly',
      accessLevel: 'Learning & Development'
    },
  ];

  const reportStats = {
    totalReports: 156,
    pendingReports: 3,
    totalDownloads: 2450,
    storageUsed: '4.2 GB',
    avgGenerationTime: '2.3 min',
    dataPoints: 125000,
    scheduledReports: 12,
    mostPopular: 'Payroll Summary'
  };

  const reportTypes = ['All', 'Financial', 'Performance', 'Recruitment', 'Attendance', 'General', 'Training', 'Compliance'];
  const statuses = ['All', 'Completed', 'Pending', 'Failed', 'Processing'];

  const filteredReports = generatedReports.filter(report => {
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Failed': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Financial': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Performance': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Recruitment': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Attendance': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Training': return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
      case 'Compliance': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getFormatBadgeClass = (format) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Excel': return 'bg-green-100 text-green-800 border border-green-200';
      case 'CSV': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Reports & Analytics"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-600 to-slate-600 shadow-lg">
              <FiBarChart2 className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Reports & Analytics</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Comprehensive HR analytics and reporting dashboard</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{generatedReports.length} reports available</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiFilter className="text-sm" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] hover:bg-[var(--light)] transition-all shadow-sm hover:shadow-md">
            <FiRefreshCw className="text-sm" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            New Report
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 mb-6 w-fit">
        {['reports', 'analytics', 'scheduled'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === tab 
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Reports</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.totalReports}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+12 this month</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-gray-600 to-slate-600 text-white shadow-lg">
              <FiFileText className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-600 to-slate-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Downloads</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.totalDownloads}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Last 30 days</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiDownload className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Pending Reports</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.pendingReports}</h2>
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Storage Used</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.storageUsed}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Report data</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiBarChart2 className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Data Points</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.dataPoints.toLocaleString()}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Total analyzed</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <FiPieChart className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Avg Generation</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{reportStats.avgGenerationTime}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Processing time</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg">
              <FiRefreshCw className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all group">
          <div className="p-3 bg-gray-600 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiPlus className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Create Report</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Custom analysis</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
          <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiCalendar className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Schedule</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Automated reports</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
          <div className="p-3 bg-green-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiShare2 className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Share</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Team collaboration</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
          <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiPieChart className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Analytics</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Data insights</span>
        </button>
      </div>

      {/* Reports Section */}
      <DashboardCard className="professional-card p-0 overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Generated Reports</h3>
              <p className="text-sm text-[var(--text-light)] mt-1">
                {filteredReports.length} reports • {reportStats.scheduledReports} scheduled
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                {reportTypes.map(type => (
                  <option key={type} value={type === 'All' ? 'all' : type}>{type}</option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status === 'All' ? 'all' : status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--light)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Report Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Metadata</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status & Schedule</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Usage</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-[var(--light)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-[var(--text)]">{report.name}</div>
                      <div className="text-xs text-[var(--text-light)] line-clamp-2">{report.description}</div>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadgeClass(report.type)}`}>
                          {report.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFormatBadgeClass(report.format)}`}>
                          {report.format}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-xs text-[var(--text-light)]">Size: {report.size}</div>
                      <div className="text-xs text-[var(--text-light)]">Data Points: {report.dataPoints}</div>
                      <div className="text-xs text-[var(--text-light)]">By: {report.generatedBy}</div>
                      <div className="text-xs text-[var(--text-light)]">Access: {report.accessLevel}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(report.status)}`}>
                        {report.status}
                      </span>
                      <div className="text-xs text-[var(--text-light)]">Schedule: {report.schedule}</div>
                      <div className="text-xs text-[var(--text-light)]">{report.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-xs text-[var(--text-light)]">Downloads: {report.downloadCount}</div>
                      <div className="text-xs text-[var(--text-light)]">Last Accessed: {report.lastAccessed}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleViewReport(report)}
                        className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                        title="View Report"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button 
                        className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                        title="Download"
                      >
                        <FiDownload className="text-lg" />
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

      {/* Enhanced Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-gray-50 to-slate-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-gray-600 to-slate-600 text-white rounded-2xl shadow-xl">
                    <FiFileText className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedReport.name}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedReport.type} Report</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedReport.status)}`}>
                        {selectedReport.status}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getFormatBadgeClass(selectedReport.format)}`}>
                        {selectedReport.format}
                      </span>
                      <span className="text-sm text-[var(--text-light)]">{selectedReport.schedule}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Report Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiFileText className="text-gray-600" />
                      Report Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Description:</span>
                        <span className="text-sm font-semibold text-[var(--text)] text-right max-w-xs">{selectedReport.description}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Generated By:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReport.generatedBy}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Access Level:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReport.accessLevel}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Schedule:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReport.schedule}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiBarChart2 className="text-gray-600" />
                      Technical Details
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">File Size:</span>
                        <span className="font-medium text-[var(--text)]">{selectedReport.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Data Points:</span>
                        <span className="font-medium text-[var(--text)]">{selectedReport.dataPoints}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Format:</span>
                        <span className="font-medium text-[var(--text)]">{selectedReport.format}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage & Analytics */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiTrendingUp className="text-gray-600" />
                      Usage Analytics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Total Downloads:</span>
                        <span className="text-lg font-bold text-[var(--text)]">{selectedReport.downloadCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Last Accessed:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReport.lastAccessed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Generation Date:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReport.date}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiShare2 className="text-gray-600" />
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                        <FiDownload className="text-lg mb-1" />
                        <span className="text-xs font-medium">Download</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                        <FiPrinter className="text-lg mb-1" />
                        <span className="text-xs font-medium">Print</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                        <FiShare2 className="text-lg mb-1" />
                        <span className="text-xs font-medium">Share</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors">
                        <FiMail className="text-lg mb-1" />
                        <span className="text-xs font-medium">Email</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiEdit />
                  Edit Report
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiCalendar />
                  Reschedule
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowReportModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2">
                  <FiDownload />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Reports;