import { useMemo } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import StatsCard from '../../components/shared/StatsCard';
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiBriefcase, FiBook, FiUser, FiCamera, FiClock } from 'react-icons/fi';
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
    lastLogin: "June 14, 2025, 08:45 AM",
  };

  const stats = {
    totalEmployees: 128,
    leaveRequests: 15,
    openPositions: 4,
    trainingSessions: 3,
  };

  const hiringTerminationData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Hires', data: [5, 8, 3, 7, 4, 6], borderColor: '#34D399', backgroundColor: 'rgba(52, 211, 153, 0.2)', fill: true },
      { label: 'Terminations', data: [2, 1, 4, 3, 2, 1], borderColor: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.2)', fill: true }
    ]
  }), []);

  const headcountData = useMemo(() => ({
    labels: ['IT', 'Marketing', 'Sales', 'HR'],
    datasets: [
      { label: 'Headcount', data: [45, 20, 30, 8], backgroundColor: ['#34D399', '#10B981', '#059669', '#047857'] }
    ]
  }), []);

  const leaveRequests = [
    { id: 1, employee: "John Doe", type: "Casual", days: 2, status: "Pending" },
    { id: 2, employee: "Jane Smith", type: "Medical", days: 1, status: "Approved" },
    { id: 3, employee: "Mike Johnson", type: "Earned", days: 3, status: "Pending" },
  ];

  const recruitmentPipeline = [
    { stage: "Sourced", count: 25 },
    { stage: "Interviewed", count: 10 },
    { stage: "Hired", count: 4 },
  ];

  const upcomingEvents = [
    { id: 1, event: "Team Meeting", date: "June 16, 2025", time: "10:00 AM", type: "Meeting" },
    { id: 2, event: "Interview", date: "June 18, 2025", time: "2:00 PM", type: "Recruitment" },
    { id: 3, event: "Annual Review", date: "June 20, 2025", time: "4:00 PM", type: "Review" },
  ];

  const onboardingTasks = [
    { id: 1, employee: "Alice Brown", task: "Complete Paperwork", dueDate: "June 17, 2025", status: "Pending" },
    { id: 2, employee: "Bob White", task: "Schedule Orientation", dueDate: "June 18, 2025", status: "In Progress" },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle={`Welcome, ${hrProfile.name} (HR)`}
      gradient="from-green-600 to-green-400"
    >
      <div className="hr-dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1 className="welcome-title">Hello, {hrProfile.name}</h1>
            <p className="welcome-subtitle">{hrProfile.role}</p>
          </div>
          <div className="welcome-actions">
            <Link to="/employees/add" className="dashboard-button primary"><FiUsers size={18} /> Add Employee</Link>
            <Link to="/recruitment" className="dashboard-button primary"><FiBriefcase size={18} /> Post Job</Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-grid">
          <StatsCard label="Total Employees" value={stats.totalEmployees} color="border-green-600" icon={FiUsers} />
          <StatsCard label="Leave Requests" value={stats.leaveRequests} color="border-blue-600" icon={FiCalendar} />
          <StatsCard label="Open Positions" value={stats.openPositions} color="border-orange-600" icon={FiBriefcase} />
          <StatsCard label="Training Sessions" value={stats.trainingSessions} color="border-purple-600" icon={FiBook} />
        </div>

        {/* Main Content */}
        <div className="main-grid">
          {/* Primary Column */}
          <div className="primary-column">
            <DashboardCard title="HR Profile" icon={FiUser} headerColorClass="header-green-gradient" className="uniform-card">
              <div className="card-body">
                <div className="profile-header">
                  <div className="profile-image">
                    <FiUser size={24} />
                  </div>
                  <div className="profile-info">
                    <p className="profile-name">{hrProfile.name}</p>
                    <span className="status-badge status-online">Online</span>
                  </div>
                </div>
                <div className="profile-details">
                  <p><span className="detail-label">Email:</span><span>{hrProfile.email}</span></p>
                  <p><span className="detail-label">Role:</span><span>{hrProfile.role}</span></p>
                  <p><span className="detail-label">Last Login:</span><span>{hrProfile.lastLogin}</span></p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/profile" className="dashboard-button secondary"><FiCamera size={16} /> Change Picture</Link>
                <Link to="/profile" className="dashboard-button primary"><FiUser size={18} /> Edit Profile</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="Hiring & Termination Trends" icon={FiUsers} headerColorClass="header-blue-gradient" className="uniform-card">
              <div className="card-body">
                <Line data={hiringTerminationData} options={{ maintainAspectRatio: false }} />
              </div>
            </DashboardCard>
          </div>

          {/* Secondary Column */}
          <div className="secondary-column">
            <DashboardCard title="Recent Leave Requests" icon={FiCalendar} headerColorClass="header-orange-gradient" className="uniform-card">
              <div className="card-body">
                <table className="leave-table">
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
                        <td>{request.employee}</td>
                        <td>{request.type}</td>
                        <td>{request.days}</td>
                        <td><span className={`status-badge status-${request.status.toLowerCase()}`}>{request.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/leaves" className="dashboard-button primary"><FiCalendar size={18} /> Manage Leaves</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="Recruitment Pipeline" icon={FiBriefcase} headerColorClass="header-purple-gradient" className="uniform-card">
              <div className="card-body">
                <ul className="pipeline-list">
                  {recruitmentPipeline.map((stage, idx) => (
                    <li key={idx} className="pipeline-item">
                      <span className="pipeline-stage">{stage.stage}</span>
                      <span className="pipeline-count">{stage.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/recruitment" className="dashboard-button primary"><FiBriefcase size={18} /> View Pipeline</Link>
              </div>
            </DashboardCard>
          </div>

          {/* Tertiary Column */}
          <div className="tertiary-column">
            <DashboardCard title="Upcoming Events" icon={FiClock} headerColorClass="header-yellow-gradient" className="uniform-card">
              <div className="card-body">
                <ul className="event-list">
                  {upcomingEvents.map(event => (
                    <li key={event.id} className="event-item">
                      <div className="event-details">
                        <p className="event-title">{event.event}</p>
                        <p className="event-date">{event.date} at {event.time} • {event.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/events" className="dashboard-button primary"><FiClock size={18} /> View All</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="Employee Onboarding" icon={FiUsers} headerColorClass="header-green-gradient" className="uniform-card">
              <div className="card-body">
                <ul className="onboarding-list">
                  {onboardingTasks.map(task => (
                    <li key={task.id} className="onboarding-item">
                      <div className="onboarding-details">
                        <p className="onboarding-employee">{task.employee}</p>
                        <p className="onboarding-task">{task.task}</p>
                        <p className="onboarding-due">Due: {task.dueDate}</p>
                        <span className={`status-badge status-${task.status.toLowerCase()}`}>{task.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/onboarding" className="dashboard-button primary"><FiUsers size={18} /> Manage Onboarding</Link>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <DashboardCard title="Department Headcount" icon={FiUsers} headerColorClass="header-blue-gradient" className="uniform-card">
            <div className="card-body">
              <Bar data={headcountData} options={{ indexAxis: 'y', maintainAspectRatio: false }} />
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
}