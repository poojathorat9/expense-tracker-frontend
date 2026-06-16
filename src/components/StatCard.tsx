interface StatCardProps {
  label: string;
  amount: string;
  trend: string;
  icon: string;
  trendUp?: boolean;
  active?: boolean;
}

export default function StatCard({ label, amount, trend, icon, trendUp = true, active = false }: StatCardProps) {
  return (
    <div className={`stat-card ${active ? 'stat-card-active' : ''}`}>
      <div className="stat-card-header">
        <span className="stat-icon">{icon}</span>
        <span className={`stat-trend ${trendUp ? 'positive' : 'negative'}`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <div className="stat-card-content">
        <div className="stat-label">{label}</div>
        <div className="stat-amount">{amount}</div>
      </div>
    </div>
  );
}
