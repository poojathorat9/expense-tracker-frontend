import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Expense } from '../types/Expense';
import { fetchExpenses, createExpense as createExpenseService, deleteExpense as deleteExpenseService } from '../services/expenseService';

interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: number) => void;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  function addExpense(expense: Omit<Expense, 'id'>) {
    createExpenseService(expense).then((newExpense) => {
      setExpenses((prev) => [...prev, newExpense]);
    });
  }

  function deleteExpense(id: number) {
    deleteExpenseService(id).then((deleted) => {
      if (deleted) {
        setExpenses((prev) => prev.filter((item) => item.id !== id));
      }
    });
  }

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider');
  }
  return context;
}
