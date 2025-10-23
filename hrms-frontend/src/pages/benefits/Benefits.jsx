import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiHeart, FiUsers, FiCalendar, FiDollarSign, FiPlus, 
  FiTrendingUp, FiDownload, FiFilter, FiEye, FiEdit,
  FiFileText, FiAward, FiCreditCard, FiShield, FiHome,
  FiBriefcase, FiBook,  FiCoffee, FiMoreVertical,
  FiCheckCircle, FiClock, FiAlertCircle, FiBarChart
} from 'react-icons/fi';

function Benefits({ sidebarItems }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'claims', 'loans', 'bonuses'

  const benefitsPlans = [
    { 
      id: 1, 
      name: 'Medical & Dental Plan', 
      category: 'Health',
      coverage: 'Full', 
      status: 'Active', 
      enrolled: 95,
      provider: 'Blue Cross Blue Shield',
      premium: 450,
      employerContribution: 320,
      employeeContribution: 130,
      deductible: 1500,
      outOfPocketMax: 4000,
      renewalDate: '2025-12-31',
      planType: 'PPO',
      network: 'National',
      description: 'Comprehensive medical and dental coverage including preventive care, emergency services, and specialist visits.'
    },
    { 
      id: 2, 
      name: '401k Retirement Plan', 
      category: 'Retirement',
      coverage: 'Employer Match', 
      status: 'Active', 
      enrolled: 80,
      provider: 'Fidelity Investments',
      premium: 0,
      employerContribution: '4% Match',
      employeeContribution: 'Variable',
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      renewalDate: 'Ongoing',
      planType: 'Defined Contribution',
      network: 'N/A',
      description: 'Retirement savings plan with employer matching up to 4% of employee contributions.'
    },
    { 
      id: 3, 
      name: 'Paid Time Off (PTO)', 
      category: 'Time Off',
      coverage: 'Standard Policy', 
      status: 'Active', 
      enrolled: 100,
      provider: 'Company Policy',
      premium: 0,
      employerContribution: 'Full',
      employeeContribution: 0,
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      renewalDate: 'Annual',
      planType: 'Accrual Based',
      network: 'N/A',
      description: 'Accrued paid time off for vacation, sick leave, and personal days.'
    },
    { 
      id: 4, 
      name: 'Vision Care Plan', 
      category: 'Health',
      coverage: 'Basic', 
      status: 'Active', 
      enrolled: 65,
      provider: 'VSP Vision Care',
      premium: 25,
      employerContribution: 15,
      employeeContribution: 10,
      deductible: 0,
      outOfPocketMax: 500,
      renewalDate: '2025-12-31',
      planType: 'Vision',
      network: 'National',
      description: 'Vision care coverage including annual eye exams, glasses, and contact lenses.'
    },
    { 
      id: 5, 
      name: 'Life Insurance', 
      category: 'Insurance',
      coverage: '2x Salary', 
      status: 'Active', 
      enrolled: 85,
      provider: 'MetLife',
      premium: 0,
      employerContribution: 'Full',
      employeeContribution: 0,
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      renewalDate: '2025-12-31',
      planType: 'Group Term Life',
      network: 'N/A',
      description: 'Basic life insurance coverage at 2 times annual salary with optional additional coverage.'
    },
  ];

  const employeeLoans = [
    {
      id: 1,
      employee: 'Sarah Connor',
      type: 'Emergency Loan',
      amount: 5000,
      status: 'Active',
      issueDate: '2025-03-15',
      dueDate: '2025-09-15',
      remainingBalance: 3200,
      interestRate: 0,
      monthlyPayment: 300,
      purpose: 'Medical emergency expenses',
      approvedBy: 'HR Manager'
    },
    {
      id: 2,
      employee: 'John Rambo',
      type: 'Education Loan',
      amount: 8000,
      status: 'Active',
      issueDate: '2025-01-10',
      dueDate: '2025-12-10',
      remainingBalance: 4500,
      interestRate: 2.5,
      monthlyPayment: 500,
      purpose: 'Professional certification course',
      approvedBy: 'Learning & Development'
    }
  ];

  const medicalClaims = [
    {
      id: 1,
      employee: 'Emily Chen',
      provider: 'City General Hospital',
      amount: 1200,
      status: 'Approved',
      date: '2025-06-10',
      type: 'Medical',
      description: 'Emergency room visit',
      processedDate: '2025-06-12',
      approvedAmount: 1000
    },
    {
      id: 2,
      employee: 'Mike Johnson',
      provider: 'Dental Care Center',
      amount: 450,
      status: 'Pending',
      date: '2025-06-14',
      type: 'Dental',
      description: 'Root canal treatment',
      processedDate: 'Pending',
      approvedAmount: 0
    }
  ];

  const bonusPayments = [
    {
      id: 1,
      employee: 'David Kim',
      type: 'Performance Bonus',
      amount: 2500,
      status: 'Paid',
      date: '2025-06-05',
      quarter: 'Q2 2025',
      criteria: 'Exceeded sales targets by 25%',
      approvedBy: 'Sales Director'
    },
    {
      id: 2,
      employee: 'Lisa Wang',
      type: 'Retention Bonus',
      amount: 5000,
      status: 'Scheduled',
      date: '2025-07-01',
      quarter: 'Q3 2025',
      criteria: '3-year employment anniversary',
      approvedBy: 'HR Director'
    }
  ];

  const benefitsStats = {
    totalPlans: 12,
    employeesEnrolled: 110,
    upcomingEnrollment: 'Next Month',
    totalPremium: 125000,
    employerContribution: 89000,
    claimsThisMonth: 45,
    activeLoans: 8,
    pendingClaims: 12,
    bonusPool: 75000
  };

  const categories = ['All', 'Health', 'Retirement', 'Time Off', 'Insurance', 'Wellness', 'Education'];

  const filteredPlans = benefitsPlans.filter(plan => {
    const matchesCategory = selectedCategory === 'all' || plan.category === selectedCategory;
    return matchesCategory;
  });

  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'Expired': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Paid': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Health': return 'bg-red-100 text-red-800 border border-red-200';
      case 'Retirement': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Time Off': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Insurance': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Wellness': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'Education': return 'bg-cyan-100 text-cyan-800 border border-cyan-200';
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
      pageTitle="Employee Benefits"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 shadow-lg">
              <FiHeart className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Employee Benefits</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Comprehensive benefits management including health, loans, and bonuses</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{benefitsPlans.length} active plans</span>
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
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            Add Benefit
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 mb-6 w-fit">
        {['overview', 'claims', 'loans', 'bonuses'].map(tab => (
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Plans</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{benefitsStats.totalPlans}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+2 this year</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 text-white shadow-lg">
              <FiFileText className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Employees Enrolled</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{benefitsStats.employeesEnrolled}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">92% participation</div>
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Premium</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{formatCurrency(benefitsStats.totalPremium)}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Annual cost</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiDollarSign className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Active Loans</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{benefitsStats.activeLoans}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Employee assistance</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
              <FiCreditCard className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Pending Claims</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{benefitsStats.pendingClaims}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Needs review</div>
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Bonus Pool</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{formatCurrency(benefitsStats.bonusPool)}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Q3 allocation</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg">
              <FiAward className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
        </DashboardCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
          <div className="p-3 bg-green-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiPlus className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">New Plan</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Add benefit</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
          <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiFileText className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Process Claims</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Medical/dental</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
          <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiCreditCard className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Loan Management</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Employee loans</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
          <div className="p-3 bg-orange-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiAward className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Bonus Programs</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Incentives</span>
        </button>
      </div>

      {/* Benefits Plans Section */}
      {activeTab === 'overview' && (
        <DashboardCard className="professional-card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">Active Benefits Plans</h3>
                <p className="text-sm text-[var(--text-light)] mt-1">
                  {filteredPlans.length} plans • {benefitsStats.employeesEnrolled} employees enrolled
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? 'all' : category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--light)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Plan Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Financials</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Enrollment</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredPlans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-[var(--light)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-[var(--text)]">{plan.name}</div>
                        <div className="text-xs text-[var(--text-light)] line-clamp-2">{plan.description}</div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadgeClass(plan.category)}`}>
                            {plan.category}
                          </span>
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {plan.provider}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-[var(--text)]">
                          Premium: {formatCurrency(plan.premium)}
                        </div>
                        <div className="text-xs text-[var(--text-light)]">
                          Employer: {typeof plan.employerContribution === 'number' ? formatCurrency(plan.employerContribution) : plan.employerContribution}
                        </div>
                        <div className="text-xs text-[var(--text-light)]">
                          Employee: {typeof plan.employeeContribution === 'number' ? formatCurrency(plan.employeeContribution) : plan.employeeContribution}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-[var(--text)]">{plan.enrolled} employees</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${plan.enrolled}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-[var(--text-light)]">{plan.enrolled}% enrolled</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(plan.status)}`}>
                          {plan.status}
                        </span>
                        <div className="text-xs text-[var(--text-light)]">
                          Renewal: {plan.renewalDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewPlan(plan)}
                          className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <FiEye className="text-lg" />
                        </button>
                        <button 
                          className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                          title="Edit Plan"
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
      )}

      {/* Medical Claims Section */}
      {activeTab === 'claims' && (
        <DashboardCard title="Medical Claims" className="professional-card p-6">
          <div className="space-y-4">
            {medicalClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent border border-blue-200 rounded-xl hover:border-blue-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <FiFileText className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">{claim.employee}</h4>
                    <p className="text-xs text-[var(--text-light)]">{claim.provider} • {claim.type}</p>
                    <p className="text-xs text-[var(--text-light)] mt-1">{claim.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[var(--text)]">{formatCurrency(claim.amount)}</div>
                    <div className="text-xs text-[var(--text-light)]">{claim.date}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(claim.status)}`}>
                      {claim.status}
                    </span>
                    <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                      Process Claim
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Employee Loans Section */}
      {activeTab === 'loans' && (
        <DashboardCard title="Employee Loans" className="professional-card p-6">
          <div className="space-y-4">
            {employeeLoans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-transparent border border-purple-200 rounded-xl hover:border-purple-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <FiCreditCard className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">{loan.employee}</h4>
                    <p className="text-xs text-[var(--text-light)]">{loan.type} • {loan.purpose}</p>
                    <p className="text-xs text-[var(--text-light)] mt-1">
                      Issued: {loan.issueDate} • Due: {loan.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[var(--text)]">{formatCurrency(loan.remainingBalance)}</div>
                    <div className="text-xs text-[var(--text-light)]">of {formatCurrency(loan.amount)}</div>
                    <div className="text-xs text-[var(--text-light)]">{loan.monthlyPayment}/month</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(loan.status)}`}>
                      {loan.status}
                    </span>
                    <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Bonus Payments Section */}
      {activeTab === 'bonuses' && (
        <DashboardCard title="Bonus Payments" className="professional-card p-6">
          <div className="space-y-4">
            {bonusPayments.map((bonus) => (
              <div key={bonus.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-transparent border border-amber-200 rounded-xl hover:border-amber-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <FiAward className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text)]">{bonus.employee}</h4>
                    <p className="text-xs text-[var(--text-light)]">{bonus.type} • {bonus.quarter}</p>
                    <p className="text-xs text-[var(--text-light)] mt-1">{bonus.criteria}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[var(--text)]">{formatCurrency(bonus.amount)}</div>
                    <div className="text-xs text-[var(--text-light)]">{bonus.date}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(bonus.status)}`}>
                      {bonus.status}
                    </span>
                    <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                      Process Bonus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Enhanced Plan Details Modal */}
      {showPlanModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-green-50 to-blue-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl shadow-xl">
                    <FiHeart className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedPlan.name}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedPlan.category} Benefit Plan</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedPlan.status)}`}>
                        {selectedPlan.status}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryBadgeClass(selectedPlan.category)}`}>
                        {selectedPlan.category}
                      </span>
                      <span className="text-sm text-[var(--text-light)]">{selectedPlan.provider}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPlanModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Plan Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiFileText className="text-green-500" />
                      Plan Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Description:</span>
                        <span className="text-sm font-semibold text-[var(--text)] text-right max-w-xs">{selectedPlan.description}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Plan Type:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPlan.planType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Network:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPlan.network}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Renewal Date:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedPlan.renewalDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiUsers className="text-green-500" />
                      Enrollment
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Enrolled Employees:</span>
                        <span className="text-lg font-bold text-[var(--text)]">{selectedPlan.enrolled}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${selectedPlan.enrolled}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-[var(--text-light)]">
                        {selectedPlan.enrolled}% of employees enrolled
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiDollarSign className="text-green-500" />
                      Financial Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Monthly Premium:</span>
                        <span className="text-lg font-bold text-[var(--text)]">{formatCurrency(selectedPlan.premium)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Employer Contribution:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">
                          {typeof selectedPlan.employerContribution === 'number' 
                            ? formatCurrency(selectedPlan.employerContribution) 
                            : selectedPlan.employerContribution}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Employee Contribution:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">
                          {typeof selectedPlan.employeeContribution === 'number' 
                            ? formatCurrency(selectedPlan.employeeContribution) 
                            : selectedPlan.employeeContribution}
                        </span>
                      </div>
                      {selectedPlan.deductible !== 'N/A' && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Deductible:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{formatCurrency(selectedPlan.deductible)}</span>
                        </div>
                      )}
                      {selectedPlan.outOfPocketMax !== 'N/A' && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Out-of-Pocket Max:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{formatCurrency(selectedPlan.outOfPocketMax)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiBarChart className="text-green-500" />
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center p-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                        <FiEdit className="text-lg mb-1" />
                        <span className="text-xs font-medium">Edit Plan</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                        <FiUsers className="text-lg mb-1" />
                        <span className="text-xs font-medium">Manage Enrollment</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                        <FiDownload className="text-lg mb-1" />
                        <span className="text-xs font-medium">Export Data</span>
                      </button>
                      <button className="flex flex-col items-center p-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors">
                        <FiFileText className="text-lg mb-1" />
                        <span className="text-xs font-medium">Generate Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiDownload />
                  Export Plan
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiUsers />
                  Enrollment Report
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowPlanModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex items-center gap-2">
                  <FiEdit />
                  Edit Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Benefits;