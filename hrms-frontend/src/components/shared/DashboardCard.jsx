// File: src/components/shared/DashboardCard.jsx
import React from 'react';
// Assuming useAuthContext is not strictly necessary for the card's core functionality
// If it is, ensure '../../context/AuthContext' path is correct and uncomment the line below.
import { useAuthContext } from '../../context/AuthContext';

export default function DashboardCard({ title, children, className, icon: Icon, headerColorClass = '' }) {
  // const { user } = useAuthContext(); // Uncomment if you need user data here

  return (
    <div className={`dashboard-card ${className}`}>
      <h3 className={`card-title ${headerColorClass}`}> {/* Changed h2 to h3 for semantic correctness */}
        {Icon && <Icon className="header-icon" />}
        {title}
      </h3>
      <div className="card-content">{children}</div>
    </div>
  );
}
