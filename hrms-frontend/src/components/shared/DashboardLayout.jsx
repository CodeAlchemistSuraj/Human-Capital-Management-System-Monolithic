import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Header from './Header';
import './DashboardStyles.css'; // Corrected import path for your styles
import { FiHome, FiUsers, FiBriefcase, FiClipboard, FiFileText, FiDollarSign, FiClock, FiAward, FiSettings, FiCalendar } from 'react-icons/fi'; // Import icons

export default function DashboardLayout({ children, sidebarItems = [] }) {
  const { user } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with sidebar open on desktop

  // Adjust initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false); // Close sidebar on mobile by default
      } else {
        setIsSidebarOpen(true); // Open sidebar on desktop by default
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize); //
    return () => window.removeEventListener('resize', handleResize); //
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); //
  };

  // Define sidebar items with labels, hrefs, and icons
  const defaultSidebarItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <FiHome /> },
    { label: 'Recruitment', href: '/recruitment', icon: <FiUsers /> },
    { label: 'Employee Directory', href: '/employee-directory', icon: <FiBriefcase /> },
    { label: 'Onboarding', href: '/onboarding', icon: <FiClipboard /> },
    { label: 'Reports', href: '/reports', icon: <FiFileText /> },
    { label: 'Employee Requests', href: '/employee-requests', icon: <FiCalendar /> },
    { label: 'Training', href: '/training', icon: <FiAward /> },
    { label: 'Benefits', href: '/benefits', icon: <FiDollarSign /> },
    { label: 'Time & Attendance', href: '/time-attendance', icon: <FiClock /> },
    { label: 'Payroll', href: '/payroll', icon: <FiDollarSign /> },
  ];

  const pageTitle = `Welcome, ${user?.username} (${user?.role})`;

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="dashboard-layout">
        <Sidebar
          items={sidebarItems.length ? sidebarItems : defaultSidebarItems}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className={`dashboard-main ${!isSidebarOpen ? 'sidebar-closed' : ''}`}>
          {/* <Header title={pageTitle} /> */}
          <main className="dashboard-content">{children}</main>
        </div>
      </div>
    </>
  );
}