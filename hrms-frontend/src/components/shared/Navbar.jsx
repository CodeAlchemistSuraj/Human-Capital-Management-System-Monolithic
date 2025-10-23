import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiBell, FiDroplet } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';

// Theme configurations
const themes = {
  corporate: {
    primary: '#2563eb',
    secondary: '#6366f1',
    accent: '#ea580c',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    dark: '#1e293b',
    light: '#f8fafc',
    surface: '#ffffff',
    border: '#e2e8f0',
    text: '#1e293b',
    'text-light': '#64748b',
    sidebar: '#1e293b',
    'sidebar-text': '#f8fafc'
  },
  navy: {
    primary: '#1e40af',
    secondary: '#3730a3',
    accent: '#ea580c',
    success: '#047857',
    warning: '#b45309',
    error: '#b91c1c',
    dark: '#0f172a',
    light: '#f1f5f9',
    surface: '#ffffff',
    border: '#cbd5e1',
    text: '#0f172a',
    'text-light': '#475569',
    sidebar: '#0f172a',
    'sidebar-text': '#f1f5f9'
  },
  green: {
    primary: '#059669',
    secondary: '#0d9488',
    accent: '#ea580c',
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',
    dark: '#064e3b',
    light: '#f0fdf4',
    surface: '#ffffff',
    border: '#d1fae5',
    text: '#064e3b',
    'text-light': '#047857',
    sidebar: '#064e3b',
    'sidebar-text': '#f0fdf4'
  },
  purple: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#db2777',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    dark: '#1e1b4b',
    light: '#faf5ff',
    surface: '#ffffff',
    border: '#e9d5ff',
    text: '#1e1b4b',
    'text-light': '#6d28d9',
    sidebar: '#1e1b4b',
    'sidebar-text': '#faf5ff'
  },
  gray: {
    primary: '#475569',
    secondary: '#64748b',
    accent: '#ea580c',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    dark: '#1e293b',
    light: '#f8fafc',
    surface: '#ffffff',
    border: '#cbd5e1',
    text: '#1e293b',
    'text-light': '#475569',
    sidebar: '#1e293b',
    'sidebar-text': '#f8fafc'
  }
};

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { user, logout } = useAuthContext();
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef(null);

  // Apply theme function
  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    const root = document.documentElement;
    
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    localStorage.setItem('hrms-theme', themeName);
  };

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('hrms-theme') || 'corporate';
    applyTheme(savedTheme);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleThemeDropdown = (e) => {
    e.stopPropagation();
    setThemeDropdownOpen(!themeDropdownOpen);
  };

  const handleThemeChange = (themeName) => {
    applyTheme(themeName);
    setThemeDropdownOpen(false);
  };

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50 professional-shadow">
      <div className="px-6 h-16 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-light rounded-lg smooth-transition text-text"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 theme-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HR</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-dark to-accent bg-clip-text text-transparent">
              NextGen HRMS
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Theme Switcher */}
              <div className="theme-dropdown" ref={themeDropdownRef}>
                <button 
                  className="p-2 hover:bg-light rounded-lg smooth-transition text-text"
                  onClick={toggleThemeDropdown}
                >
                  <FiDroplet size={18} />
                </button>
                <div className={`theme-options ${themeDropdownOpen ? 'show' : ''}`}>
                  {Object.keys(themes).map(themeName => (
                    <div
                      key={themeName}
                      className="theme-option"
                      onClick={() => handleThemeChange(themeName)}
                    >
                      <div 
                        className="theme-preview" 
                        style={{ backgroundColor: themes[themeName].primary }}
                      />
                      <span className="capitalize">{themeName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-light rounded-lg smooth-transition text-text">
                <FiBell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 theme-accent border-2 border-surface rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 bg-light rounded-lg px-3 py-2">
                  <div className="w-8 h-8 theme-gradient text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {user.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-medium text-text">
                      {user.username}
                    </div>
                    <div className="text-xs text-text-light capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={logout} 
                  className="flex items-center gap-2 bg-surface border border-border text-text hover:bg-light px-4 py-2 rounded-lg smooth-transition font-medium"
                >
                  <FiLogOut size={16} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="theme-gradient hover:opacity-90 text-white px-6 py-2 rounded-lg smooth-transition font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}