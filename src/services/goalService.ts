import type { Goal } from '../types/Goal';
import { initialGoals } from '../data/goals';

const mockGoals: Goal[] = [...initialGoals];

export function fetchGoals(): Promise<Goal[]> {
  return Promise.resolve([...mockGoals]);
}

export function createGoal(goal: Omit<Goal, 'id' | 'current'> & { current?: number }): Promise<Goal> {
  const newGoal: Goal = {
    id: Date.now(),
    title: goal.title,
    current: goal.current ?? 0,
    target: goal.target,
    targetDate: goal.targetDate,
  };
  mockGoals.push(newGoal);
  return Promise.resolve(newGoal);
}

export function updateGoal(goalId: number, values: Partial<Omit<Goal, 'id'>>): Promise<Goal | null> {
  const goal = mockGoals.find((item) => item.id === goalId);
  if (!goal) return Promise.resolve(null);

  Object.assign(goal, values);
  return Promise.resolve(goal);
}

export function deleteGoal(goalId: number): Promise<boolean> {
  const index = mockGoals.findIndex((item) => item.id === goalId);
  if (index === -1) return Promise.resolve(false);
  mockGoals.splice(index, 1);
  return Promise.resolve(true);
}

export function contributeToGoal(goalId: number, amount: number): Promise<Goal | null> {
  const goal = mockGoals.find((item) => item.id === goalId);
  if (!goal) return Promise.resolve(null);

  goal.current = Math.min(goal.target, goal.current + Math.max(0, amount));
  return Promise.resolve(goal);
}

// Later: replace with axios.get('/api/goals') / axios.post(...) / axios.put(...) / axios.delete(...)
