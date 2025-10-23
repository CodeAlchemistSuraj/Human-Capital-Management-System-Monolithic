export default function StatsCard({ label, value, color = 'theme-gradient', icon: Icon, trend }) {
  return (
    <div className="glass-card professional-shadow rounded-xl p-6 smooth-transition hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-light mb-1">{label}</p>
          <p className="text-2xl font-bold text-text mb-2">{value}</p>
          {trend && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              trend.value > 0 
                ? 'bg-success/10 text-success' 
                : 'bg-error/10 text-error'
            }`}>
              {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={24} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
}