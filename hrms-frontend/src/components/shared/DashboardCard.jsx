import React from 'react';

export default function DashboardCard({ title, children, className = '', icon: Icon, headerColorClass = 'theme-gradient' }) {
  return (
    <div className={`glass-card professional-shadow rounded-xl overflow-hidden smooth-transition hover:transform hover:-translate-y-1 ${className}`}>
      {/* Card Header */}
      <div className={`${headerColorClass} px-6 py-4 border-b border-white/10`}>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-white/10 rounded-lg">
              <Icon className="text-white text-lg" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="card-content p-6 bg-surface">
        {children}
      </div>
    </div>
  );
}