import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Goal } from '../types/Goal';
import { initialGoals } from '../data/goals';

interface GoalContextValue {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'current'> & { current?: number }) => void;
  updateGoal: (goalId: number, values: Partial<Omit<Goal, 'id'>>) => void;
  deleteGoal: (goalId: number) => void;
  contributeToGoal: (goalId: number, amount: number) => void;
}

const GoalContext = createContext<GoalContextValue | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  function addGoal(goal: Omit<Goal, 'id' | 'current'> & { current?: number }) {
    setGoals((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: goal.title,
        current: goal.current ?? 0,
        target: goal.target,
        targetDate: goal.targetDate,
      },
    ]);
  }

  function updateGoal(goalId: number, values: Partial<Omit<Goal, 'id'>>) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              ...values,
              current: values.current !== undefined ? Math.max(0, values.current) : goal.current,
              target: values.target !== undefined ? Math.max(1, values.target) : goal.target,
            }
          : goal
      )
    );
  }

  function deleteGoal(goalId: number) {
    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }

  function contributeToGoal(goalId: number, amount: number) {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              current: Math.min(goal.target, goal.current + Math.max(0, amount)),
            }
          : goal
      )
    );
  }

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal, contributeToGoal }}>
      {children}
    </GoalContext.Provider>
  );
}

export function useGoalContext() {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoalContext must be used within GoalProvider');
  }
  return context;
}
