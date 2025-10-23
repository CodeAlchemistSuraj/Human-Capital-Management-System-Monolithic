import { useMemo } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiCalendar, FiBriefcase, FiAward, FiUser, 
  FiTrendingUp, FiArrowUp, FiArrowDown, FiFileText,
  FiCheckCircle, FiClock, FiMail, FiCalendar as FiCal
} from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import '../../assets/styles/HRDashboard.css';

// Chart.js plugins registration
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function HRDashboard({ sidebarItems }) {
  const { user } = useAuthContext();

  const hrProfile = {
    name: user?.username || "HR Manager",
    email: "hr@example.com",
    role: "HR Specialist",
    department: "Human Resources",
    joinDate: "Jan 15, 2023",
    lastLogin: "2 hours ago"
  };

  const statsData = [
    { 
      label: "Total Employees", 
      value: "142", 
      trend: { value: 8, direction: "up" },
      icon: FiUsers,
      iconClass: "employees"
    },
    { 
      label: "Leave Requests", 
      value: "8", 
      trend: { value: 2, direction: "down" },
      icon: FiCalendar,
      iconClass: "leaves"
    },
    { 
      label: "Open Positions", 
      value: "5", 
      trend: { value: 1, direction: "up" },
      icon: FiBriefcase,
      iconClass: "positions"
    },
    { 
      label: "Training Sessions", 
      value: "3", 
      trend: { value: 0, direction: "neutral" },
      icon: FiAward,
      iconClass: "training"
    }
  ];

  const recruitmentPipeline = [
    { stage: "Applications", count: 47, trend: "+12%", icon: FiFileText },
    { stage: "Screening", count: 28, trend: "+8%", icon: FiCheckCircle },
    { stage: "Interviews", count: 15, trend: "+5%", icon: FiClock },
    { stage: "Offers", count: 6, trend: "+3%", icon: FiMail },
  ];

  const hiringTerminationData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { 
        label: 'New Hires', 
        data: [12, 18, 15, 22, 19, 25],
        borderColor: 'var(--success)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      { 
        label: 'Terminations', 
        data: [3, 5, 2, 4, 3, 2],
        borderColor: 'var(--error)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  }), []);

  const headcountData = useMemo(() => ({
    labels: ['Engineering', 'Marketing', 'Sales', 'HR', 'Operations', 'Support'],
    datasets: [
      { 
        label: 'Employees', 
        data: [65, 28, 42, 12, 35, 24],
        backgroundColor: [
          'var(--primary)',
          'var(--success)',
          'var(--accent)',
          'var(--secondary)',
          'var(--warning)',
          'var(--text-light)'
        ],
        borderWidth: 0,
        borderRadius: 4
      }
    ]
  }), []);

  const leaveRequests = [
    { id: 1, employee: "Sarah Johnson", type: "Vacation", days: 5, status: "Pending", date: "Jun 20-25" },
    { id: 2, employee: "Michael Chen", type: "Sick Leave", days: 2, status: "Approved", date: "Jun 18-19" },
    { id: 3, employee: "Emily Davis", type: "Personal", days: 1, status: "Pending", date: "Jun 22" },
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems}>
      <div className="hr-dashboard-container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1 className="welcome-title">Welcome back, {hrProfile.name}!</h1>
              <p className="welcome-subtitle">
                Here's what's happening in your HR department today.
              </p>
            </div>
            <div className="welcome-actions">
              <Link to="/employees/add" className="dashboard-button primary">
                <FiUsers size={14} /> Add Employee
              </Link>
              <Link to="/recruitment" className="dashboard-button secondary">
                <FiBriefcase size={14} /> Post Job
              </Link>
            </div>
          </div>
        </section>

        {/* Key Metrics - Compact */}
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="compact-stats-card">
              <div className="stats-content">
                <div className={`stats-icon ${stat.iconClass}`}>
                  <stat.icon size={16} />
                </div>
                <div className="stats-info">
                  <div className="stats-value">{stat.value}</div>
                  <div className="stats-label">{stat.label}</div>
                  {stat.trend.value > 0 && (
                    <div className="stats-trend">
                      {stat.trend.direction === "up" ? (
                        <FiArrowUp size={10} className="trend-up" />
                      ) : (
                        <FiArrowDown size={10} className="trend-down" />
                      )}
                      <span className={stat.trend.direction === "up" ? "trend-up" : "trend-down"}>
                        {stat.trend.value}% this month
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="dashboard-grid">
          {/* HR Profile - Compact */}
          <div className="professional-card profile-card">
            <div className="card-header">
              <h3>
                <FiUser className="card-header-icon" />
                HR Profile
              </h3>
            </div>
            <div className="card-body">
              <div className="profile-content">
                <div className="profile-avatar">
                  <FiUser size={16} />
                </div>
                <div className="profile-details">
                  <h3 className="profile-name">{hrProfile.name}</h3>
                  <div className="profile-info">
                    <div className="profile-info-item">
                      <span className="info-label">Role</span>
                      <span className="info-value">{hrProfile.role}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="info-label">Department</span>
                      <span className="info-value">{hrProfile.department}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="info-label">Join Date</span>
                      <span className="info-value">{hrProfile.joinDate}</span>
                    </div>
                    <div className="profile-info-item">
                      <span className="info-label">Last Active</span>
                      <span className="info-value">{hrProfile.lastLogin}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/profile" className="dashboard-button secondary">
                <FiUser size={12} /> Edit Profile
              </Link>
            </div>
          </div>

          {/* Recruitment Pipeline - Compact */}
          <div className="professional-card">
            <div className="card-header">
              <h3>
                <FiTrendingUp className="card-header-icon" />
                Recruitment Pipeline
              </h3>
            </div>
            <div className="card-body">
              <div className="compact-list">
                {recruitmentPipeline.map((stage, index) => (
                  <div key={index} className="compact-list-item">
                    <div className="list-item-content">
                      <div className="list-item-title">{stage.stage}</div>
                      <div className="list-item-subtitle">{stage.trend}</div>
                    </div>
                    <div className="list-item-meta">
                      <span className="metric-value">{stage.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <Link to="/recruitment" className="dashboard-button primary">
                View Pipeline
              </Link>
            </div>
          </div>

          {/* Hiring Trends */}
          <div className="professional-card grid-col-span-2">
            <div className="card-header">
              <h3>
                <FiTrendingUp className="card-header-icon" />
                Hiring & Termination Trends
              </h3>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Line 
                  data={hiringTerminationData} 
                  options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: 'var(--text)',
                          usePointStyle: true,
                          padding: 10,
                          font: { size: 11 }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'var(--border)',
                          drawBorder: false
                        },
                        ticks: {
                          color: 'var(--text-light)',
                          font: { size: 10 }
                        }
                      },
                      y: {
                        grid: {
                          color: 'var(--border)',
                          drawBorder: false
                        },
                        ticks: {
                          color: 'var(--text-light)',
                          font: { size: 10 }
                        },
                        beginAtZero: true
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Leave Requests */}
          <div className="professional-card">
            <div className="card-header">
              <h3>
                <FiCal className="card-header-icon" />
                Recent Leave Requests
              </h3>
            </div>
            <div className="card-body">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Type</th>
                    <th>Days</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map(request => (
                    <tr key={request.id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{request.employee}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                            {request.date}
                          </div>
                        </div>
                      </td>
                      <td>{request.type}</td>
                      <td>{request.days}</td>
                      <td>
                        <span className={`status-badge status-${request.status.toLowerCase()}`}>
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <Link to="/leaves" className="dashboard-button primary">
                Manage Leaves
              </Link>
            </div>
          </div>

          {/* Department Headcount */}
          <div className="professional-card">
            <div className="card-header">
              <h3>
                <FiUsers className="card-header-icon" />
                Department Headcount
              </h3>
            </div>
            <div className="card-body">
              <div className="chart-container">
                <Bar 
                  data={headcountData} 
                  options={{ 
                    indexAxis: 'y', 
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'var(--border)',
                          drawBorder: false
                        },
                        ticks: {
                          color: 'var(--text-light)',
                          font: { size: 10 }
                        },
                        beginAtZero: true
                      },
                      y: {
                        grid: {
                          color: 'var(--border)',
                          drawBorder: false
                        },
                        ticks: {
                          color: 'var(--text-light)',
                          font: { size: 10 }
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}