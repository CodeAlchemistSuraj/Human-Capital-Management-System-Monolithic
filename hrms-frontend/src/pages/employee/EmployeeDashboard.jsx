import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import DashboardLayout from '../../components/shared/DashboardLayout';
import DashboardCard from '../../components/shared/DashboardCard';
import StatsCard from '../../components/shared/StatsCard';
import { Link } from 'react-router-dom';
import {
  FiCalendar, FiBook, FiDollarSign, FiClipboard, FiUser,
  FiBell, FiChevronDown, FiChevronUp, FiDownload, FiCamera, FiClock
} from 'react-icons/fi';
import '../../assets/styles/EmployeeDashboard.css';

export default function EmployeeDashboard({ sidebarItems = [] }) {
  const { user } = useAuthContext();
  const [isAnnouncementsOpen, setIsAnnouncementsOpen] = useState(false);

  const profile = {
    name: user?.username || "Priya Sharma",
    employeeId: "EMP007",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "priyasharma@example.com",
    phone: "+91 98765 43210",
    status: "Online",
    lastLogin: "June 14, 2025, 10:30 AM",
  };

  const leavesData = {
    available: 23,
    casual: 8,
    medical: 5,
    earned: 10,
  };

  const leaveHistory = [
    { type: "Casual Leave", days: 2, from: "2025-07-20", to: "2025-07-21", status: "Approved" },
    { type: "Medical Leave", days: 1, from: "2025-08-05", to: "2025-08-05", status: "Pending" },
  ];

  const upcomingHolidays = [
    { name: "Christmas", date: "Dec 25" },
    { name: "New Year's Day", date: "Jan 1" },
  ];

  const pendingTasks = [
    { id: 1, name: "Performance Review", dueDate: "2025-06-30" },
    { id: 2, name: "Project Report", dueDate: "2025-06-25" },
  ];

  const recentPayslips = [
    { id: 1, period: "May 2025", amount: "₹45,000.00", status: "Paid", link: "#" },
    { id: 2, period: "April 2025", amount: "₹45,000.00", status: "Paid", link: "#" },
  ];

  const trainings = [
    { name: "Project Management Basics", status: "Completed", progress: 100 },
    { name: "Advanced Excel Techniques", status: "In Progress", progress: 60 },
  ];

  const announcements = [
    { title: "Company Picnic on July 25th!", date: "2025-07-01", description: "Join us for a fun-filled day at City Park." },
    { title: "New HR Policy Updates", date: "2025-06-20", description: "Review the updated HR policies on the portal." },
  ];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      pageTitle="Employee Dashboard"
      gradient="from-gray-800 to-gray-900"
    >
      <div className="employee-dashboard-container">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1 className="welcome-title">Welcome, {profile.name}</h1>
            <p className="welcome-subtitle">{profile.position} | {profile.department}</p>
          </div>
          <div className="welcome-actions">
            <Link to="/leaves" className="dashboard-button primary"><FiCalendar size={18} /> Apply Leave</Link>
            <Link to="/trainings" className="dashboard-button primary"><FiBook size={18} /> View Trainings</Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="overview-grid">
          <StatsCard label="Available Leaves" value={`${leavesData.available} days`} color="border-blue-600" icon={FiCalendar} />
          <StatsCard label="Completed Trainings" value={trainings.filter(t => t.status === "Completed").length} color="border-purple-600" icon={FiBook} />
          <StatsCard label="Last Payslip" value={recentPayslips[0]?.period} color="border-green-600" icon={FiDollarSign} />
          <StatsCard label="Pending Tasks" value={pendingTasks.length} color="border-orange-600" icon={FiClipboard} />
        </div>

        {/* Main Content */}
        <div className="main-grid">
          {/* Primary Column */}
          <div className="primary-column">
            <DashboardCard title="My Profile" icon={FiUser} headerColorClass="header-blue-gradient" className="uniform-card">
              <div className="card-body">
                <div className="profile-header">
                  <div className="profile-image">
                    <FiUser size={24} />
                  </div>
                  <div className="profile-info">
                    <p className="profile-name">{profile.name}</p>
                    <span className={`status-badge status-${profile.status.toLowerCase()}`}>{profile.status}</span>
                  </div>
                </div>
                <div className="profile-details">
                  <p><span className="detail-label">Employee ID:</span><span>{profile.employeeId}</span></p>
                  <p><span className="detail-label">Email:</span><span>{profile.email}</span></p>
                  <p><span className="detail-label">Phone:</span><span>{profile.phone}</span></p>
                  <p><span className="detail-label">Last Login:</span><span>{profile.lastLogin}</span></p>
                </div>
              </div>
              <div className="card-footer">
                <Link to="/profile" className="dashboard-button secondary"><FiCamera size={16} /> Change Picture</Link>
                <Link to="/profile" className="dashboard-button primary"><FiUser size={18} /> Edit Profile</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="My Leave" icon={FiCalendar} headerColorClass="header-green-gradient" className="uniform-card">
              <div className="card-body">
                <p className="section-title">Leave Balance</p>
                <div className="leave-balance-grid">
                  <div className="leave-balance-item">
                    <p className="balance-value">{leavesData.casual}</p>
                    <p className="balance-label">Casual</p>
                  </div>
                  <div className="leave-balance-item">
                    <p className="balance-value">{leavesData.medical}</p>
                    <p className="balance-label">Medical</p>
                  </div>
                  <div className="leave-balance-item">
                    <p className="balance-value">{leavesData.earned}</p>
                    <p className="balance-label">Earned</p>
                  </div>
                </div>
                <p className="section-title">Recent Leave Requests</p>
                <ul className="leave-history">
                  {leaveHistory.map((leave, idx) => (
                    <li key={idx} className="leave-item">
                      <span className="leave-info">{leave.type} ({leave.days} days)</span>
                      <span className={`status-badge status-${leave.status.toLowerCase()}`}>{leave.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/leaves" className="dashboard-button primary"><FiCalendar size={18} /> Apply Leave</Link>
              </div>
            </DashboardCard>
          </div>

          {/* Secondary Column */}
          <div className="secondary-column">
            <DashboardCard title="My Payslips" icon={FiDollarSign} headerColorClass="header-purple-gradient" className="uniform-card">
              <div className="card-body">
                <table className="payslip-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayslips.map(payslip => (
                      <tr key={payslip.id}>
                        <td>{payslip.period}</td>
                        <td>{payslip.amount}</td>
                        <td><span className="status-badge status-paid">{payslip.status}</span></td>
                        <td><a href={payslip.link} className="download-link"><FiDownload size={16} /></a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/payroll" className="dashboard-button primary"><FiDollarSign size={18} /> View All</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="My Training" icon={FiBook} headerColorClass="header-orange-gradient" className="uniform-card">
              <div className="card-body">
                <ul className="training-list">
                  {trainings.map((training, idx) => (
                    <li key={idx} className="training-item">
                      <div className="training-details">
                        <p className="training-title">{training.name}</p>
                        <p className="training-status">Status: {training.status}</p>
                      </div>
                      {training.progress > 0 && (
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${training.progress}%` }}></div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <Link to="/trainings" className="dashboard-button primary"><FiBook size={18} /> View All</Link>
              </div>
            </DashboardCard>
          </div>

          {/* Tertiary Column */}
          <div className="tertiary-column">
            <DashboardCard title="Pending Tasks" icon={FiClipboard} headerColorClass="header-yellow-gradient" className="uniform-card">
              <div className="card-body">
                {pendingTasks.length > 0 ? (
                  <ul className="task-list">
                    {pendingTasks.map(task => (
                      <li key={task.id} className="task-item">
                      <p className="task-title">{task.name}</p>
                      <p className="task-due">Due: {task.dueDate}</p>
                    </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-data">No pending tasks.</p>
                )}
              </div>
              <div className="card-footer">
                <Link to="/tasks" className="dashboard-button primary"><FiClipboard size={18} /> Go to Tasks</Link>
              </div>
            </DashboardCard>

            <DashboardCard title="Upcoming Holidays" icon={FiCalendar} headerColorClass="header-green-gradient" className="uniform-card">
              <div className="card-body">
                {upcomingHolidays.length > 0 ? (
                  <ul className="holiday-list">
                    {upcomingHolidays.map((holiday, idx) => (
                      <li key={idx} className="holiday-item">
                        <p className="holiday-title">{holiday.name}</p>
                        <p className="holiday-date">{holiday.date}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-data">No upcoming holidays.</p>
                )}
              </div>
              <div className="card-footer">
                <Link to="/holidays" className="dashboard-button primary"><FiCalendar size={18} /> Full Calendar</Link>
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Announcements */}
        <div className="announcements-section">
          <DashboardCard title="Latest Announcements" icon={FiBell} headerColorClass="header-blue-gradient" className="uniform-card">
            <div className="card-body">
              <button
                className="toggle-button"
                onClick={() => setIsAnnouncementsOpen(!isAnnouncementsOpen)}
              >
                <span>View Announcements</span>
                {isAnnouncementsOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
              </button>
              {isAnnouncementsOpen && (
                <ul className="announcement-list">
                  {announcements.map((announcement, idx) => (
                    <li key={idx} className="announcement-item">
                      <p className="announcement-title"><FiBell className="inline mr-2" />{announcement.title}</p>
                      <p className="announcement-date">Date: {announcement.date}</p>
                      <p className="announcement-description">{announcement.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  );
}