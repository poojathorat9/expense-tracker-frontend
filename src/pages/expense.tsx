import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import ExpenseTable from '../components/ExpenseTable';
import '../styles/expense.css';

export default function ExpensePage() {
  const [activeMenuItem, setActiveMenuItem] = useState('Expenses');
  const navigate = useNavigate();

  function handleSidebarClick(item: string) {
    setActiveMenuItem(item);
    if (item === 'Dashboard') navigate('/dashboard');
    if (item === 'Expenses') navigate('/expense');
    if (item === 'Goals') navigate('/goals');
  }

  return (
    <div className="dashboard-container">
      <Sidebar activeItem={activeMenuItem} onItemClick={handleSidebarClick} />
      <div className="dashboard-main">
        <DashboardHeader userName="Pooja" />
        <div className="dashboard-content">
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
}
