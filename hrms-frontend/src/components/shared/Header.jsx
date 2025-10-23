import React, { useState, useEffect } from 'react';

export default function Header({ title, userInfo, additionalInfo }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
  
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <header className="glass-card professional-shadow rounded-xl mb-6">
      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side: Date/Time */}
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-accent">
                {formattedDate}, {formattedTime}
              </span>
            </div>
          </div>

          {/* Center: Title */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-dark to-accent bg-clip-text text-transparent animate-fade-in">
              {title}
            </h1>
          </div>

          {/* Right Side: User/Additional Info */}
          <div className="flex flex-col items-end gap-2">
            {userInfo && userInfo.name && (
              <span className="text-sm text-text-light">
                Welcome, <strong className="text-text">{userInfo.name}</strong>
              </span>
            )}
            {additionalInfo && (
              <span className="text-xs bg-light text-text px-3 py-1 rounded-full font-medium">
                {additionalInfo}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}