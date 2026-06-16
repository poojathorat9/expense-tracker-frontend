import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Expense } from '../types/Expense';
import { initialExpenses } from '../data/expenses';

interface ExpenseContextValue {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: number) => void;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  function addExpense(expense: Omit<Expense, 'id'>) {
    setExpenses((prev) => [
      ...prev,
      {
        ...expense,
        id: Date.now(),
      },
    ]);
  }

  function deleteExpense(id: number) {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
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
