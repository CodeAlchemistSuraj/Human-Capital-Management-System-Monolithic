import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ items, isOpen, toggleSidebar }) {
  const location = useLocation();
  const sidebarRef = useRef(null); // Create a ref to attach to the sidebar DOM element

  useEffect(() => {
    // Function to handle clicks outside the sidebar
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        toggleSidebar(); // Close the sidebar if a click occurs outside of it and it's open
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]); // Re-run effect if isOpen or toggleSidebar changes

  return (
    <aside
      ref={sidebarRef} // Attach the ref to your sidebar's main element
      className={`sidebar ${isOpen ? 'open' : 'closed'} animate-shimmer`}
    >
      <nav className="sidebar-nav">
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.href}
                className={`sidebar-item ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => toggleSidebar()} // This still closes when a link is clicked
              >
                {item.icon && <span className="sidebar-icon">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}