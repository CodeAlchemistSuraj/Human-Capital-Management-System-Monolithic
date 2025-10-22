export default function StatsCard({ label, value, color = 'border-indigo-500', icon: Icon }) {
  return (
    <div className={`stats-card ${color}`}>
      <div className="flex items-center gap-3">
        {Icon && <Icon size={28} className="text-indigo-600" />}
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}