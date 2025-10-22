// File: src/components/shared/Header.jsx
import React, { useState, useEffect } from 'react';

export default function Header({ title, userInfo, additionalInfo }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the interval on component unmount
    };
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric' // Shorter date format
  });
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit' // Shorter time format
  });

  // Dummy data for employee information
  const lastPunch = "5:00 PM"; // Example last punch time
  const availableLeaves = 10; // Example available leaves

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Side: Date/Time */}
        <div className="header-left">
          <span className="header-date-time">{formattedDate}, {formattedTime}</span>
        </div>
        {/* Center: Title */}
        <div className="header-center">
          <h1 className="header-title animate-fade-in">{title}</h1>
        </div>
        {/* Right Side: User/Additional Info */}
        <div className="header-right">
          {userInfo && userInfo.name && (
            <span className="header-welcome">Welcome, <strong>{userInfo.name}</strong>!</span>
          )}
          {additionalInfo && (
            <span className="header-additional"><strong>{additionalInfo}</strong></span>
          )}
        </div>
      </div>
    </header>
  );
}
