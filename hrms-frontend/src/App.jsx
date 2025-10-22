import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/users/Users';
import Settings from './pages/settings/Settings';
import HRDashboard from './pages/hr/HRDashboard';
import Recruitment from './pages/recruitment/Recruitment';
import EmployeeDirectory from './pages/employee/EmployeeDirectory';
import Performance from './pages/performance/Performance';
import Onboarding from './pages/onboarding/Onboarding';
import Reports from './pages/reports/Reports';
import EmployeeRequests from './pages/employee/EmployeeRequests';
import Training from './pages/training/Training';
import Benefits from './pages/benefits/Benefits';
import TimeAttendance from './pages/timeattendance/TimeAttendance';
import Payroll from './pages/payroll/Payroll';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import Leaves from './pages/leaves/Leaves';
import Profile from './pages/profile/Profile';
import CandidateProfile from './pages/recruitment/CandidateProfile';
import ApplicantsList from './pages/recruitment/ApplicantsList';
import { getSidebarItemsForRole } from './config/sidebarConfig';

function ProtectedRoute({ children, allowedRoles, ...rest }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return React.cloneElement(children, { currentUser: user, ...rest });
}

function App() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const currentSidebarItems = user ? getSidebarItemsForRole(user.role) : [];

  const defaultRedirect = user
    ? user.role === 'ADMIN'
      ? '/admin-dashboard'
      : user.role === 'HR'
        ? '/hr-dashboard'
        : user.role === 'EMPLOYEE'
          ? '/employee-dashboard'
          : '/login'
    : '/login';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultRedirect} replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']} sidebarItems={currentSidebarItems}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']} sidebarItems={currentSidebarItems}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']} sidebarItems={currentSidebarItems}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hr-dashboard"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <HRDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruitment"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <Recruitment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/job/:id/applicants"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <ApplicantsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-directory"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <EmployeeDirectory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/performance"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <Performance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidates/:id"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <Onboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-requests"
        element={
          <ProtectedRoute allowedRoles={['HR']} sidebarItems={currentSidebarItems}>
            <EmployeeRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-dashboard"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <Leaves />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/training"
        element={
          <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <Training />
          </ProtectedRoute>
        }
      />
      <Route
        path="/benefits"
        element={
          <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <Benefits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/time-attendance"
        element={
          <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <TimeAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payroll"
        element={
          <ProtectedRoute allowedRoles={['HR', 'EMPLOYEE']} sidebarItems={currentSidebarItems}>
            <Payroll />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;