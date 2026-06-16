import type { Expense } from '../types/Expense';
import { initialExpenses } from '../data/expenses';

const mockExpenses: Expense[] = [...initialExpenses];

export function fetchExpenses(): Promise<Expense[]> {
  return Promise.resolve([...mockExpenses]);
}

export function createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const newExpense: Expense = {
    ...expense,
    id: Date.now(),
  };
  mockExpenses.push(newExpense);
  return Promise.resolve(newExpense);
}

export function deleteExpense(id: number): Promise<boolean> {
  const index = mockExpenses.findIndex((item) => item.id === id);
  if (index === -1) return Promise.resolve(false);
  mockExpenses.splice(index, 1);
  return Promise.resolve(true);
}

// Later: replace with axios.get('/api/expenses') / axios.post(...) / axios.delete(...)
