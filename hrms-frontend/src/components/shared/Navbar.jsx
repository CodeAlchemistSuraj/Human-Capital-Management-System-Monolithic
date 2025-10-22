import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../../context/AuthContext';

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="navbar-menu-toggle" onClick={toggleSidebar}>
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <Link to="/" className="navbar-brand-text animate-logo">HRMS</Link>
      </div>
      <div className="navbar-user">
        {user ? (
          <>
            <div className="navbar-user-profile">
              <div className="navbar-user-image">
                <FiUser size={18} />
              </div>
              <span className="navbar-welcome">{user.username} ({user.role})</span>
            </div>
            <button onClick={logout} className="navbar-logout">
              <FiLogOut size={18} className="mr-2" /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-login">Login</Link>
        )}
      </div>
    </nav>
  );
}