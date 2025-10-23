import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ items, isOpen, toggleSidebar }) {
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isOpen ? 'open' : 'closed'} smooth-transition`}
    >
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 theme-accent rounded-full"></div>
          <h3 className="text-lg font-semibold text-sidebar-text">Navigation</h3>
        </div>
      </div>

      {/* Navigation Items with Scrollable Area */}
      <div className="sidebar-nav-container beautiful-scrollbar">
        <nav className="sidebar-nav">
          <ul>
            {items.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.href}
                  className={`sidebar-item ${location.pathname === item.href ? 'active' : ''}`}
                  onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                >
                  {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                  <span className="sidebar-label">{item.label}</span>
                  {location.pathname === item.href && (
                    <div className="active-indicator">
                      <div className="w-2 h-2 theme-accent rounded-full"></div>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="text-center text-sidebar-text/70 text-sm">
          <div className="font-medium text-sidebar-text mb-1">NextGen HRMS</div>
          <div>v3.0 Professional</div>
        </div>
      </div>
    </aside>
  );
}