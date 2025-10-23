import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiDollarSign, FiCalendar, FiUsers, FiDownload, FiPlus, 
  FiFilter, FiTrendingUp, FiAlertCircle, FiCheckCircle, 
  FiClock, FiEye, FiEdit, FiMoreVertical, FiBarChart,
  FiCreditCard, FiPercent, FiFileText, FiSend, FiRefreshCw
} from 'react-icons/fi';

function Payroll({ sidebarItems }) {
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'employees', 'reports'

  const payrollSummaries = [
    { 
      id: 1, 
      period: 'June 2025', 
      totalNetPay: 150000, 
      totalGrossPay: 185000,
      totalTaxes: 25000,
      totalDeductions: 10000,
      status: 'Processed', 
      date: '2025-06-10',
      employees: 120,
      bonuses: 15000,
      overtime: 8000,
      reimbursements: 2000,
      processingTime: '2.3 hours',
      approvedBy: 'Sarah Johnson',
      payrollType: 'Regular',
      paymentMethod: 'Direct Deposit',
      currency: 'USD'
    },
    { 
      id: 2, 
      period: 'May 2025', 
      totalNetPay: 148000, 
      totalGrossPay: 182000,
      totalTaxes: 24000,
      totalDeductions: 10000,
      status: 'Processed', 
      date: '2025-05-10',
      employees: 118,
      bonuses: 12000,
      overtime: 6500,
      reimbursements: 1500,
      processingTime: '2.1 hours',
      approvedBy: 'Sarah Johnson',
      payrollType: 'Regular',
      paymentMethod: 'Direct Deposit',
      currency: 'USD'
    },
    { 
      id: 3, 
      period: 'April 2025', 
      totalNetPay: 145000, 
      totalGrossPay: 178000,
      totalTaxes: 23000,
      totalDeductions: 10000,
      status: 'Processed', 
      date: '2025-04-10',
      employees: 115,
      bonuses: 10000,
      overtime: 5000,
      reimbursements: 1000,
      processingTime: '1.8 hours',
      approvedBy: 'Michael Chen',
      payrollType: 'Regular',
      paymentMethod: 'Direct Deposit',
      currency: 'USD'
    },
    { 
      id: 4, 
      period: 'July 2025', 
      totalNetPay: 155000, 
      totalGrossPay: 192000,
      totalTaxes: 27000,
      totalDeductions: 10000,
      status: 'Pending', 
      date: '2025-07-10',
      employees: 125,
      bonuses: 18000,
      overtime: 9000,
      reimbursements: 2500,
      processingTime: 'Pending',
      approvedBy: 'Pending',
      payrollType: 'Regular',
      paymentMethod: 'Direct Deposit',
      currency: 'USD'
    },
    { 
      id: 5, 
      period: 'Q2 2025 Bonus', 
      totalNetPay: 45000, 
      totalGrossPay: 45000,
      totalTaxes: 0,
      totalDeductions: 0,
      status: 'Processed', 
      date: '2025-06-25',
      employees: 120,
      bonuses: 45000,
      overtime: 0,
      reimbursements: 0,
      processingTime: '1.2 hours',
      approvedBy: 'Sarah Johnson',
      payrollType: 'Bonus',
      paymentMethod: 'Direct Deposit',
      currency: 'USD'
    },
  ];

  const employeePayroll = [
    {
      id: 1,
      employee: 'Sarah Connor',
      employeeId: 'EMP-001',
      department: 'Engineering',
      position: 'Senior Developer',
      grossPay: 8500,
      baseSalary: 7500,
      overtime: 800,
      bonuses: 200,
      deductions: 1200,
      taxes: 1850,
      netPay: 5450,
      paymentMethod: 'Direct Deposit',
      bankAccount: '****1234',
      status: 'Paid',
      payDate: '2025-06-10'
    },
    {
      id: 2,
      employee: 'John Rambo',
      employeeId: 'EMP-002',
      department: 'Sales',
      position: 'Sales Manager',
      grossPay: 7200,
      baseSalary: 6500,
      overtime: 400,
      bonuses: 300,
      deductions: 900,
      taxes: 1500,
      netPay: 4800,
      paymentMethod: 'Direct Deposit',
      bankAccount: '****5678',
      status: 'Paid',
      payDate: '2025-06-10'
    },
    {
      id: 3,
      employee: 'Ellen Ripley',
      employeeId: 'EMP-003',
      department: 'Operations',
      position: 'Operations Lead',
      grossPay: 6800,
      baseSalary: 6200,
      overtime: 300,
      bonuses: 300,
      deductions: 850,
      taxes: 1350,
      netPay: 4600,
      paymentMethod: 'Direct Deposit',
      bankAccount: '****9012',
      status: 'Paid',
      payDate: '2025-06-10'
    }
  ];

  const payrollStats = {
    totalProcessed: 493000,
    upcomingPayroll: 155000,
    avgProcessingTime: '2.1 hours',
    employeesThisMonth: 125,
    taxLiabilities: 99000,
    bonusPayments: 85000,
    complianceScore: 98,
    errorRate: 0.2
  };

  const periods = ['All', 'June 2025', 'May 2025', 'April 2025', 'July 2025', 'Q2 2025 Bonus'];

  const filteredPayrolls = selectedPeriod === 'all' 
    ? payrollSummaries 
    : payrollSummaries.filter(payroll => payroll.period === selectedPeriod);

  const handleViewPayroll = (payroll) => {
    setSelectedPayroll(payroll);
    setShowPayrollModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Processed': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Failed': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPayrollTypeBadge = (type) => {
    switch (type) {
      case 'Regular': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Bonus': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Adjustment': return 'bg-orange-100 text-orange-800 border border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Payroll Management"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg">
              <FiDollarSign className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Payroll Management</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Manage payroll cycles, compensation, and employee payments</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>Next payroll: Jul 10, 2025</span>
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
            Export Reports
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            Run Payroll
          </button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 mb-6 w-fit">
        {['overview', 'employees', 'reports'].map(tab => (
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Processed</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{formatCurrency(payrollStats.totalProcessed)}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+3.2% growth</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg">
              <FiDollarSign className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Upcoming Payroll</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{formatCurrency(payrollStats.upcomingPayroll)}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Jul 10, 2025</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiCalendar className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Employees</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{payrollStats.employeesThisMonth}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">This month</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiUsers className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Tax Liabilities</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{formatCurrency(payrollStats.taxLiabilities)}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">YTD</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
              <FiPercent className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Compliance Score</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{payrollStats.complianceScore}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Excellent</div>
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Error Rate</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{payrollStats.errorRate}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Very Low</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg">
              <FiAlertCircle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all group">
          <div className="p-3 bg-emerald-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiRefreshCw className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Run Payroll</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Process payments</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
          <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiFileText className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Tax Reports</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Generate forms</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
          <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiSend className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Direct Deposits</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Bank transfers</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
          <div className="p-3 bg-orange-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiBarChart className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Analytics</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Payroll insights</span>
        </button>
      </div>

      {/* Payroll History Section */}
      <DashboardCard className="professional-card p-0 overflow-hidden">
        <div className="p-6 border-b border-[var(--border)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)]">Payroll History</h3>
              <p className="text-sm text-[var(--text-light)] mt-1">
                {filteredPayrolls.length} payroll cycles processed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                {periods.map(period => (
                  <option key={period} value={period === 'All' ? 'all' : period}>{period}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--light)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Payroll Period</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Financial Summary</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employees</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredPayrolls.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-[var(--light)] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-lg">
                        <FiDollarSign className="text-lg" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[var(--text)]">{payroll.period}</div>
                        <div className="flex gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPayrollTypeBadge(payroll.payrollType)}`}>
                            {payroll.payrollType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-[var(--text)]">{formatCurrency(payroll.totalNetPay)}</div>
                      <div className="text-xs text-[var(--text-light)]">
                        Gross: {formatCurrency(payroll.totalGrossPay)} • Tax: {formatCurrency(payroll.totalTaxes)}
                      </div>
                      <div className="text-xs text-[var(--text-light)]">
                        Bonuses: {formatCurrency(payroll.bonuses)} • OT: {formatCurrency(payroll.overtime)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FiUsers className="text-[var(--text-light)]" />
                      <span className="text-sm text-[var(--text)]">{payroll.employees}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[var(--text)]">{payroll.date}</div>
                    <div className="text-xs text-[var(--text-light)]">{payroll.processingTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleViewPayroll(payroll)}
                        className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                        title="View Details"
                      >
                        <FiEye className="text-lg" />
                      </button>
                      <button 
                        className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                        title="Download Report"
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

      {/* Recent Employee Payments */}
      <div className="mt-6">
        <DashboardCard title="Recent Employee Payments" className="professional-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--light)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Compensation</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Deductions & Taxes</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Net Pay</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {employeePayroll.map((employee) => (
                  <tr key={employee.id} className="hover:bg-[var(--light)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {employee.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)]">{employee.employee}</div>
                          <div className="text-xs text-[var(--text-light)]">{employee.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-[var(--text)]">{formatCurrency(employee.grossPay)}</div>
                        <div className="text-xs text-[var(--text-light)]">
                          Base: {formatCurrency(employee.baseSalary)} • OT: {formatCurrency(employee.overtime)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--text)]">
                        Tax: {formatCurrency(employee.taxes)} • Ded: {formatCurrency(employee.deductions)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-lg font-bold text-emerald-600">{formatCurrency(employee.netPay)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                          View Payslip
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

      {/* Enhanced Payroll Details Modal */}
      {showPayrollModal && selectedPayroll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-emerald-50 to-green-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl shadow-xl">
                    <FiDollarSign className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedPayroll.period}</h3>
                    <p className="text-lg text-[var(--text-light)]">Payroll Cycle Details</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedPayroll.status)}`}>
                        {selectedPayroll.status}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPayrollTypeBadge(selectedPayroll.payrollType)}`}>
                        {selectedPayroll.payrollType}
                      </span>
                      <span className="text-sm text-[var(--text-light)]">{selectedPayroll.employees} employees</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPayrollModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Financial Summary */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiCreditCard className="text-emerald-500" />
                      Financial Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Total Gross Pay:</span>
                        <span className="text-lg font-bold text-[var(--text)]">{formatCurrency(selectedPayroll.totalGrossPay)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Total Taxes:</span>
                        <span className="text-lg font-bold text-red-600">{formatCurrency(selectedPayroll.totalTaxes)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Total Deductions:</span>
                        <span className="text-lg font-bold text-orange-600">{formatCurrency(selectedPayroll.totalDeductions)}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-[var(--border)] pt-3">
                        <span className="text-lg font-bold text-[var(--text-light)]">Net Pay:</span>
                        <span className="text-2xl font-bold text-emerald-600">{formatCurrency(selectedPayroll.totalNetPay)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiBarChart className="text-emerald-500" />
                      Additional Payments
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Bonuses:</span>
                        <span className="font-medium text-[var(--text)]">{formatCurrency(selectedPayroll.bonuses)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Overtime:</span>
                        <span className="font-medium text-[var(--text)]">{formatCurrency(selectedPayroll.overtime)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Reimbursements:</span>
                        <span className="font-medium text-[var(--text)]">{formatCurrency(selectedPayroll.reimbursements)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiClock className="text-emerald-500" />
                      Processing Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Processed Date:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPayroll.date}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Processing Time:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPayroll.processingTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Approved By:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPayroll.approvedBy}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Payment Method:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPayroll.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Currency:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPayroll.currency}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiUsers className="text-emerald-500" />
                      Employee Distribution
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Total Employees:</span>
                        <span className="font-medium text-[var(--text)]">{selectedPayroll.employees}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--text-light)]">Average Pay:</span>
                        <span className="font-medium text-[var(--text)]">
                          {formatCurrency(selectedPayroll.totalNetPay / selectedPayroll.employees)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiDownload />
                  Export Report
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiFileText />
                  Tax Forms
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPayrollModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors flex items-center gap-2">
                  <FiSend />
                  Process Payments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Payroll;