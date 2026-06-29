interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeItem, onItemClick, mobileOpen = false, onClose }: SidebarProps) {
  const menuItems = ['Dashboard', 'Expenses', 'Goals', 'Profile'];

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`dashboard-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo-icon">💰</span>
          <span className="sidebar-logo-text">Expense Tracker</span>
        </div>
        <ul className="sidebar-nav">
          {menuItems.map((item) => (
            <li
              key={item}
              className={`sidebar-nav-item ${activeItem === item ? 'active' : ''}`}
              onClick={() => {
                onItemClick(item);
                onClose?.();
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
