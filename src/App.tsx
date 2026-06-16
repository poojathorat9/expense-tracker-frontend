import AppRoutes from './routes/AppRoutes';
import { ExpenseProvider } from './context/ExpenseContext';
import { GoalProvider } from './context/GoalContext';

function App() {
  return (
    <ExpenseProvider>
      <GoalProvider>
        <AppRoutes />
      </GoalProvider>
    </ExpenseProvider>
  );
}

export default App;