import React, { useState } from 'react';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import { 
  FiActivity, FiStar, FiFileText, FiCheckCircle, FiCalendar, 
  FiEye, FiTrendingUp, FiUsers, FiTarget, FiAward, FiEdit,
  FiFilter, FiDownload, FiPlus, FiMessageCircle, FiBarChart,
  FiThumbsUp, FiAlertCircle, FiClock, FiMoreVertical, FiUser
} from 'react-icons/fi';

function Performance({ sidebarItems }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedQuarter, setSelectedQuarter] = useState('all');
  const [activeTab, setActiveTab] = useState('reviews'); // 'reviews', 'goals', 'feedback'

  const performanceReviews = [
    { 
      id: 1, 
      employee: 'John Doe', 
      employeeId: 'EMP-001',
      position: 'Senior Developer',
      department: 'Engineering',
      reviewDate: '2025-05-15', 
      score: 4.5,
      status: 'Completed',
      reviewer: 'Sarah Johnson',
      reviewType: 'Quarterly',
      quarter: 'Q2 2025',
      strengths: ['Technical Expertise', 'Problem Solving', 'Team Collaboration'],
      areasForImprovement: ['Documentation', 'Mentoring Junior Developers'],
      goals: ['Lead new feature development', 'Improve code documentation'],
      feedback: 'Excellent technical contributions this quarter. Consistently delivers high-quality work.',
      overallRating: 'Exceeds Expectations',
      technicalSkills: 4.8,
      communication: 4.2,
      teamwork: 4.6,
      leadership: 4.0,
      lastUpdated: '2025-05-15 14:30'
    },
    { 
      id: 2, 
      employee: 'Jane Smith', 
      employeeId: 'EMP-002',
      position: 'Product Manager',
      department: 'Product',
      reviewDate: '2025-06-01', 
      score: null,
      status: 'Pending',
      reviewer: 'Michael Chen',
      reviewType: 'Quarterly',
      quarter: 'Q2 2025',
      strengths: ['Product Strategy', 'Stakeholder Management'],
      areasForImprovement: ['Technical Depth', 'Execution Speed'],
      goals: ['Launch new product features', 'Improve cross-team collaboration'],
      feedback: '',
      overallRating: 'Pending',
      technicalSkills: null,
      communication: null,
      teamwork: null,
      leadership: null,
      lastUpdated: '2025-05-28 09:15'
    },
    { 
      id: 3, 
      employee: 'Peter Jones', 
      employeeId: 'EMP-003',
      position: 'Sales Manager',
      department: 'Sales',
      reviewDate: '2025-04-20', 
      score: 3.8,
      status: 'Completed',
      reviewer: 'Lisa Wang',
      reviewType: 'Quarterly',
      quarter: 'Q1 2025',
      strengths: ['Client Relationships', 'Sales Strategy'],
      areasForImprovement: ['Team Management', 'Reporting Accuracy'],
      goals: ['Increase team sales by 15%', 'Improve sales reporting'],
      feedback: 'Good performance with strong client relationships. Needs improvement in team leadership.',
      overallRating: 'Meets Expectations',
      technicalSkills: 3.5,
      communication: 4.0,
      teamwork: 3.8,
      leadership: 3.2,
      lastUpdated: '2025-04-20 16:45'
    },
    { 
      id: 4, 
      employee: 'Sarah Lee', 
      employeeId: 'EMP-004',
      position: 'UX Designer',
      department: 'Design',
      reviewDate: '2025-06-20', 
      score: null,
      status: 'Pending',
      reviewer: 'David Kim',
      reviewType: 'Quarterly',
      quarter: 'Q2 2025',
      strengths: ['UI/UX Design', 'User Research'],
      areasForImprovement: ['Technical Constraints', 'Project Timelines'],
      goals: ['Design new user interface', 'Conduct user research studies'],
      feedback: '',
      overallRating: 'Pending',
      technicalSkills: null,
      communication: null,
      teamwork: null,
      leadership: null,
      lastUpdated: '2025-06-01 11:20'
    },
    { 
      id: 5, 
      employee: 'Mike Johnson', 
      employeeId: 'EMP-005',
      position: 'Data Analyst',
      department: 'Analytics',
      reviewDate: '2025-05-10', 
      score: 4.7,
      status: 'Completed',
      reviewer: 'Rachel Green',
      reviewType: 'Quarterly',
      quarter: 'Q2 2025',
      strengths: ['Data Analysis', 'Statistical Modeling', 'Reporting'],
      areasForImprovement: ['Presentation Skills', 'Business Context'],
      goals: ['Develop new analytics dashboard', 'Improve data visualization'],
      feedback: 'Outstanding analytical skills and attention to detail. Valuable insights provided to stakeholders.',
      overallRating: 'Exceeds Expectations',
      technicalSkills: 4.9,
      communication: 4.3,
      teamwork: 4.5,
      leadership: 4.1,
      lastUpdated: '2025-05-10 13:15'
    },
  ];

  const performanceGoals = [
    {
      id: 1,
      employee: 'John Doe',
      goal: 'Lead development of new payment integration',
      deadline: '2025-08-15',
      progress: 65,
      status: 'On Track',
      category: 'Technical Leadership'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      goal: 'Launch mobile app version 2.0',
      deadline: '2025-09-01',
      progress: 30,
      status: 'Needs Attention',
      category: 'Product Delivery'
    },
    {
      id: 3,
      employee: 'Peter Jones',
      goal: 'Achieve 15% sales growth in Q3',
      deadline: '2025-09-30',
      progress: 45,
      status: 'On Track',
      category: 'Revenue'
    }
  ];

  const feedbackRequests = [
    {
      id: 1,
      from: 'Team Members',
      for: 'John Doe',
      type: '360 Feedback',
      dueDate: '2025-06-25',
      status: 'Pending',
      responses: 3
    },
    {
      id: 2,
      from: 'Manager',
      for: 'Jane Smith',
      type: 'Manager Review',
      dueDate: '2025-06-20',
      status: 'Completed',
      responses: 1
    }
  ];

  const performanceStats = {
    totalReviews: 24,
    completedReviews: 18,
    averageScore: 4.2,
    employeesRated: 45,
    goalsAchieved: 67,
    feedbackPending: 8,
    highPerformers: 12,
    improvementNeeded: 3
  };

  const statuses = ['All', 'Completed', 'Pending', 'In Progress', 'Overdue'];
  const quarters = ['All', 'Q2 2025', 'Q1 2025', 'Q4 2024', 'Q3 2024'];

  const filteredReviews = performanceReviews.filter(review => {
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    const matchesQuarter = selectedQuarter === 'all' || review.quarter === selectedQuarter;
    return matchesStatus && matchesQuarter;
  });

  const handleViewReview = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border border-red-200';
      case 'On Track': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Needs Attention': return 'bg-orange-100 text-orange-800 border border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getRatingColor = (score) => {
    if (score >= 4.5) return 'text-emerald-600';
    if (score >= 4.0) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    if (score >= 3.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600', 
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-pink-500 to-pink-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderStars = (score) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i}
            className={`text-sm ${
              i < Math.floor(score) 
                ? 'text-amber-500 fill-amber-500' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm font-medium ml-1">{score}/5</span>
      </div>
    );
  };

  return (
    <DashboardLayout 
      sidebarItems={sidebarItems} 
      pageTitle="Performance Management"
    >
      {/* Enhanced Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
              <FiActivity className="text-2xl text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[var(--surface)]"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[var(--text)]">Performance Management</h2>
            <p className="text-sm text-[var(--text-light)] mt-1 flex items-center gap-2">
              <span>Track employee performance, conduct reviews, and set development goals</span>
              <span className="w-1 h-1 bg-[var(--text-light)] rounded-full"></span>
              <span>{performanceReviews.length} active reviews</span>
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
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all shadow-md">
            <FiPlus className="text-sm" />
            New Review
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 bg-[var(--light)] rounded-xl p-1 mb-6 w-fit">
        {['reviews', 'goals', 'feedback'].map(tab => (
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
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Total Reviews</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.totalReviews}</h2>
              <div className="flex items-center gap-1 mt-1">
                <FiTrendingUp className="text-emerald-500 text-xs" />
                <span className="text-xs text-emerald-600 font-medium">+5 this quarter</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
              <FiFileText className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Avg Score</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.averageScore}/5</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Q2 2025</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <FiStar className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">High Performers</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.highPerformers}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Top 25%</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
              <FiAward className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </DashboardCard>
        
        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Goals Achieved</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.goalsAchieved}%</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Success rate</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
              <FiTarget className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Pending Feedback</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.feedbackPending}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Needs action</div>
            </div>
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
              <FiMessageCircle className="text-lg" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </DashboardCard>

        <DashboardCard className="professional-card p-4 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[var(--text-light)] mb-1">Need Improvement</p>
              <h2 className="text-xl font-bold text-[var(--text)]">{performanceStats.improvementNeeded}</h2>
              <div className="text-xs text-[var(--text-light)] mt-1">Requires support</div>
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
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl hover:from-amber-100 hover:to-amber-200 transition-all group">
          <div className="p-3 bg-amber-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiPlus className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Schedule Review</span>
          <span className="text-xs text-[var(--text-light)] mt-1">New evaluation</span>
        </button>
        
        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
          <div className="p-3 bg-green-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiTarget className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Set Goals</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Performance goals</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
          <div className="p-3 bg-blue-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiMessageCircle className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Request Feedback</span>
          <span className="text-xs text-[var(--text-light)] mt-1">360 reviews</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
          <div className="p-3 bg-purple-500 text-white rounded-lg mb-3 group-hover:scale-110 transition-transform">
            <FiBarChart className="text-lg" />
          </div>
          <span className="text-sm font-semibold text-[var(--text)]">Analytics</span>
          <span className="text-xs text-[var(--text-light)] mt-1">Performance insights</span>
        </button>
      </div>

      {/* Performance Reviews Section */}
      {activeTab === 'reviews' && (
        <DashboardCard className="professional-card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)]">Performance Reviews</h3>
                <p className="text-sm text-[var(--text-light)] mt-1">
                  {filteredReviews.length} reviews • {performanceStats.completedReviews} completed
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  {quarters.map(quarter => (
                    <option key={quarter} value={quarter === 'All' ? 'all' : quarter}>{quarter}</option>
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Employee & Review</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Performance Metrics</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Review Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--text-light)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-[var(--light)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(review.employee)} shadow-lg`}>
                          {review.employee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[var(--text)]">{review.employee}</div>
                          <div className="text-xs text-[var(--text-light)]">{review.position}</div>
                          <div className="text-xs text-[var(--text-light)]">{review.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {review.score ? (
                        <div className="space-y-2">
                          {renderStars(review.score)}
                          <div className="text-xs text-[var(--text-light)]">
                            Overall: <span className={`font-semibold ${getRatingColor(review.score)}`}>{review.overallRating}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-[var(--text-light)]">Pending evaluation</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-[var(--text)]">{review.reviewType}</div>
                        <div className="text-xs text-[var(--text-light)]">{review.quarter}</div>
                        <div className="text-xs text-[var(--text-light)]">By {review.reviewer}</div>
                        <div className="text-xs text-[var(--text-light)]">{review.reviewDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(review.status)}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewReview(review)}
                          className="p-2 text-[var(--primary)] hover:text-[var(--secondary)] transition-colors bg-blue-50 rounded-lg"
                          title="View Details"
                        >
                          <FiEye className="text-lg" />
                        </button>
                        <button 
                          className="p-2 text-[var(--text-light)] hover:text-[var(--success)] transition-colors bg-gray-50 rounded-lg"
                          title="Edit Review"
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

      {/* Performance Goals Section */}
      {activeTab === 'goals' && (
        <DashboardCard title="Performance Goals" className="professional-card p-6">
          <div className="space-y-4">
            {performanceGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent border border-gray-200 rounded-xl hover:border-amber-200 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {goal.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text)]">{goal.employee}</h4>
                      <p className="text-xs text-[var(--text-light)]">{goal.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text)] mb-2">{goal.goal}</p>
                  <div className="flex items-center gap-4 text-xs text-[var(--text-light)]">
                    <span>Deadline: {goal.deadline}</span>
                    <span>Progress: {goal.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(goal.status)}`}>
                    {goal.status}
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Feedback Requests Section */}
      {activeTab === 'feedback' && (
        <DashboardCard title="Feedback Requests" className="professional-card p-6">
          <div className="space-y-4">
            {feedbackRequests.map((feedback) => (
              <div key={feedback.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-transparent border border-gray-200 rounded-xl hover:border-purple-200 transition-all">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                      <FiMessageCircle className="text-lg" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--text)]">{feedback.type}</h4>
                      <p className="text-xs text-[var(--text-light)]">For {feedback.for}</p>
                    </div>
                  </div>
                  <div className="text-xs text-[var(--text-light)]">
                    From: {feedback.from} • Due: {feedback.dueDate} • Responses: {feedback.responses}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(feedback.status)}`}>
                    {feedback.status}
                  </span>
                  <button className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors">
                    Provide Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      )}

      {/* Enhanced Review Details Modal */}
      {showReviewModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-6 border-b border-[var(--border)] bg-gradient-to-r from-amber-50 to-orange-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-semibold text-xl ${getAvatarColor(selectedReview.employee)} shadow-xl`}>
                    {selectedReview.employee.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text)]">{selectedReview.employee}</h3>
                    <p className="text-lg text-[var(--text-light)]">{selectedReview.position} • {selectedReview.department}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadgeClass(selectedReview.status)}`}>
                        {selectedReview.status}
                      </span>
                      {selectedReview.score && (
                        <div className="flex items-center gap-1">
                          {renderStars(selectedReview.score)}
                          <span className={`text-sm font-semibold ${getRatingColor(selectedReview.score)}`}>
                            {selectedReview.overallRating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="text-[var(--text-light)] hover:text-[var(--text)] p-2 bg-white rounded-lg shadow-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Review Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiFileText className="text-amber-500" />
                      Review Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Review Period:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.quarter}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Review Date:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.reviewDate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Reviewer:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.reviewer}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[var(--text-light)]">Review Type:</span>
                        <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.reviewType}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiThumbsUp className="text-green-500" />
                      Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedReview.strengths.map((strength, index) => (
                        <span key={index} className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full border border-green-200">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics & Goals */}
                <div className="space-y-6">
                  {selectedReview.score && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                        <FiBarChart className="text-blue-500" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Technical Skills:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.technicalSkills}/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Communication:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.communication}/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Teamwork:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.teamwork}/5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-[var(--text-light)]">Leadership:</span>
                          <span className="text-sm font-semibold text-[var(--text)]">{selectedReview.leadership}/5</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                      <FiTarget className="text-purple-500" />
                      Development Goals
                    </h4>
                    <div className="space-y-2">
                      {selectedReview.goals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-[var(--text)]">
                          <FiCheckCircle className="text-green-500 text-xs" />
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedReview.areasForImprovement.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                        <FiAlertCircle className="text-orange-500" />
                        Areas for Improvement
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedReview.areasForImprovement.map((area, index) => (
                          <span key={index} className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full border border-orange-200">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedReview.feedback && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                    <FiMessageCircle className="text-blue-500" />
                    Manager Feedback
                  </h4>
                  <p className="text-sm text-[var(--text)] bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {selectedReview.feedback}
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-[var(--border)] bg-gray-50 flex justify-between items-center">
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiDownload />
                  Export Review
                </button>
                <button className="px-4 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors flex items-center gap-2">
                  <FiEdit />
                  Edit Review
                </button>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="px-6 py-2 text-sm border border-[var(--border)] text-[var(--text)] rounded-xl hover:bg-[var(--light)] transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 text-sm bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2">
                  <FiCheckCircle />
                  Complete Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Performance;