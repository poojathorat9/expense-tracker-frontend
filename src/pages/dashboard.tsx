import { useState } from 'react';
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

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      <div className="dashboard-main">
        <DashboardHeader userName="Pooja" />
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
