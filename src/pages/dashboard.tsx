import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import TabNavigation from '../components/TabNavigation';
import ExpenseChart from '../components/ExpenseChart';
import MonthlyChart from '../components/MonthlyChart';
import RecentTransactions from '../components/RecentTransactions';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [activeTab, setActiveTab] = useState('Income');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  function handleSidebarClick(item: string) {
    setActiveMenuItem(item);
    if (item === 'Expenses') navigate('/expense');
    if (item === 'Dashboard') navigate('/dashboard');
    if (item === 'Goals') navigate('/goals');
    setMobileOpen(false);
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeMenuItem} onItemClick={handleSidebarClick} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="dashboard-main">
        <DashboardHeader userName="Pooja" onMenuClick={() => setMobileOpen(true)} />
        <div className="dashboard-content">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          <div className="dashboard-charts">
            <ExpenseChart />
            <MonthlyChart />
          </div>

          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}
