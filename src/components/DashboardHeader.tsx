import menuIcon from '../assets/menu.svg';

interface DashboardHeaderProps {
  userName?: string;
  onMenuClick?: () => void;
}

export default function DashboardHeader({ userName = 'Pooja', onMenuClick }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      {onMenuClick && (
        <button className="header-menu-button" onClick={onMenuClick} aria-label="Open navigation menu">
          <img src={menuIcon} alt="Menu" />
        </button>
      )}
      <h1>Welcome Back, {userName} 👋</h1>
    </div>
  );
}
