import { initialExpenses } from '../data/expenses';
import { initialGoals } from '../data/goals';

export interface DashboardMetrics {
  totalExpenses: number;
  totalGoals: number;
  goalProgressPercentage: number;
  monthlyExpense: number;
}

export function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const totalExpenses = initialExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoals = initialGoals.length;
  const totalGoalTarget = initialGoals.reduce((sum, goal) => sum + goal.target, 0);
  const totalGoalCurrent = initialGoals.reduce((sum, goal) => sum + goal.current, 0);
  const goalProgressPercentage = totalGoalTarget ? Math.round((totalGoalCurrent / totalGoalTarget) * 100) : 0;
  const monthlyExpense = totalExpenses; // mock value

  return Promise.resolve({
    totalExpenses,
    totalGoals,
    goalProgressPercentage,
    monthlyExpense,
  });
}

// Later: replace with axios.get('/api/dashboard/metrics')
