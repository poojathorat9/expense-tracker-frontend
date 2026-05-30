import StatCard from './StatCard';
import '../styles/stat-card.css';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const stats = [
    { label: 'Income', icon: '💰', amount: '₹60,000', trend: '+12%', trendUp: true },
    { label: 'Expenses', icon: '💸', amount: '₹25,000', trend: '-5%', trendUp: false },
    { label: 'Savings', icon: '🏦', amount: '₹35,000', trend: '+8%', trendUp: true },
    { label: 'Goals', icon: '🎯', amount: '₹50,000', trend: '+15%', trendUp: true },
  ];

  return (
    <div className="stat-cards-container">
      {stats.map((stat) => (
        <div key={stat.label} onClick={() => onTabChange(stat.label)}>
          <StatCard
            label={stat.label}
            icon={stat.icon}
            amount={stat.amount}
            trend={stat.trend}
            trendUp={stat.trendUp}
          />
        </div>
      ))}
    </div>
  );
}
