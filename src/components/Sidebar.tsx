interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  const menuItems = ['Dashboard', 'Expenses', 'Goals', 'Profile'];

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo-icon">💰</span>
        <span className="sidebar-logo-text">Expense Tracker</span>
      </div>
      <ul className="sidebar-nav">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`sidebar-nav-item ${activeItem === item ? 'active' : ''}`}
            onClick={() => onItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
