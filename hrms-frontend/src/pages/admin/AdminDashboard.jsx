import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import StatsCard from '../../components/shared/StatsCard';
import { Link } from 'react-router-dom';
import { FiUsers, FiSettings, FiBell, FiFileText, FiUser, FiClock, FiCamera, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import '../../assets/styles/AdminDashboard.css';

export default function AdminDashboard({ sidebarItems }) {
  const { user } = useAuthContext();

  const adminProfile = {
    name: user?.username || "Admin User",
    email: "admin@example.com",
    role: "System Administrator",
    lastLogin: "June 14, 2025, 09:15 AM",
  };

  const stats = {
    totalUsers: 103,
    activeUsers: 95,
    pendingApprovals: 12,
    systemAlerts: 3,
  };

  const recentUsers = [
    { id: 1, name: "John Doe", role: "Employee", department: "HR", status: "Active", lastAction: "Updated Profile" },
    { id: 2, name: "Jane Smith", role: "Employee", department: "IT", status: "Pending", lastAction: "Newly Added" },
    { id: 3, name: "Mike Johnson", role: "Manager", department: "Finance", status: "Active", lastAction: "Role Updated" },
  ];

  const recentActivities = [
    { id: 1, activity: "User John Doe updated profile", timestamp: "2025-06-14 14:30", type: "Update" },
    { id: 2, activity: "New employee Jane Smith added", timestamp: "2025-06-14 10:15", type: "Create" },
    { id: 3, activity: "System backup completed", timestamp: "2025-06-13 23:00", type: "System" },
    { id: 4, activity: "Admin password reset", timestamp: "2025-06-13 09:45", type: "Security" },
  ];

  const [settings, setSettings] = useState({
    enableNotifications: true,
    allowSelfService: false,
  });

  const toggleSetting = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle={`Welcome, ${adminProfile.name} (Admin)`}
      gradient="from-blue-600 to-blue-400"
    >
      <div className="admin-dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1 className="welcome-title">Hello, {adminProfile.name}</h1>
            <p className="welcome-subtitle">{adminProfile.role}</p>
          </div>
          <div className="welcome-actions">
            <Link to="/users/add" className="dashboard-button primary"><FiUsers size={18} /> Add User</Link>
            <Link to="/reports" className="dashboard-button primary"><FiFileText size={18} /> Generate Report</Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-grid">
          <StatsCard label="Total Users" value={stats.totalUsers} color="border-blue-600" icon={FiUsers} />
          <StatsCard label="Active Users" value={stats.activeUsers} color="border-green-600" icon={FiUsers} />
          <StatsCard label="Pending Approvals" value={stats.pendingApprovals} color="border-orange-600" icon={FiBell} />
          <StatsCard label="System Alerts" value={stats.systemAlerts} color="border-red-600" icon={FiBell} />
        </div>

        {/* Main Content */}
        <div className="main-grid">
          {/* Primary Column */}
          <div className="primary-column">
            <DashboardCard title="Admin Profile" icon={FiUser} headerColorClass="header-blue-gradient" className="uniform-card">
              <div className="card-body">
                <div className="profile-header">
                  <div className="profile-image">
                    <FiUser size={24} />
                  </div>
                  <div className="profile-info">
                    <p className="profile-name">{adminProfile.name}</p>
                    <span className="status-badge status-online">Online</span>
                  </div>
                </div>
                <div className="profile-details">
                  <p><span className="detail-label">Email:</span><span>{adminProfile.email}</span></p>
                  <p><span className="detail-label">Role:</span><span>{adminProfile.role}</span></p>
                  <p><span className="detail-label">Last Login:</span><span>{adminProfile.lastLogin}</span></p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/profile" className="dashboard-button secondary"><FiCamera size={16} /> Change Picture</Link>
                <Link to="/profile" className="dashboard-button primary"><FiUser size={18} /> Edit Profile</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="User Management" icon={FiUsers} headerColorClass="header-green-gradient" className="uniform-card">
              <div className="card-body">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Last Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.department}</td>
                        <td><span className={`status-badge status-${user.status.toLowerCase()}`}>{user.status}</span></td>
                        <td>{user.lastAction}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/users" className="dashboard-button primary"><FiUsers size={18} /> Manage Users</Link>
              </div>
            </DashboardCard>
          </div>

          {/* Secondary Column */}
          <div className="secondary-column">
            <DashboardCard title="System Settings" icon={FiSettings} headerColorClass="header-purple-gradient" className="uniform-card">
              <div className="card-body">
                <div className="setting-item">
                  <span className="setting-label">Enable Notifications</span>
                  <button onClick={() => toggleSetting('enableNotifications')} className="toggle-button">
                    {settings.enableNotifications ? <FiToggleRight size={24} color="#059669" /> : <FiToggleLeft size={24} color="#6b7280" />}
                  </button>
                </div>
                <div className="setting-item">
                  <span className="setting-label">Allow Self-Service</span>
                  <button onClick={() => toggleSetting('allowSelfService')} className="toggle-button">
                    {settings.allowSelfService ? <FiToggleRight size={24} color="#059669" /> : <FiToggleLeft size={24} color="#6b7280" />}
                  </button>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/settings" className="dashboard-button primary"><FiSettings size={18} /> All Settings</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="Reports" icon={FiFileText} headerColorClass="header-orange-gradient" className="uniform-card">
              <div className="card-body">
                <p className="report-text">Generate reports for user activity, payroll, and more.</p>
                <ul className="report-list">
                  <li className="report-item">User Activity Report</li>
                  <li className="report-item">Payroll Summary</li>
                  <li className="report-item">Leave Statistics</li>
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/reports" className="dashboard-button primary"><FiFileText size={18} /> View Reports</Link>
              </div>
            </DashboardCard>
          </div>

          {/* Tertiary Column */}
          <div className="tertiary-column">
            <DashboardCard title="Recent Activity" icon={FiClock} headerColorClass="header-yellow-gradient" className="uniform-card">
              <div className="card-body">
                <ul className="activity-list">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="activity-item">
                      <div className="activity-details">
                        <p className="activity-text">{activity.activity}</p>
                        <p className="activity-timestamp">{activity.timestamp} • {activity.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/activity" className="dashboard-button primary"><FiClock size={18} /> View All</Link>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}