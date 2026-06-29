import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import Goals from '../components/Goals';
import '../styles/goals.css';

export default function GoalsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('Goals');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  function handleSidebarClick(item: string) {
    setActiveMenuItem(item);
    if (item === 'Dashboard') navigate('/dashboard');
    if (item === 'Expenses') navigate('/expense');
    if (item === 'Goals') navigate('/goals');
    setMobileOpen(false);
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeMenuItem} onItemClick={handleSidebarClick} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <DashboardHeader userName="Pooja" onMenuClick={() => setMobileOpen(true)} />
        <div className="dashboard-content">
          <Goals />
        </div>
      </div>
    </div>
  );
}
