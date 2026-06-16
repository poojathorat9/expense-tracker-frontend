import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Goal } from '../types/Goal';
import {
  fetchGoals,
  createGoal as createGoalService,
  updateGoal as updateGoalService,
  deleteGoal as deleteGoalService,
  contributeToGoal as contributeToGoalService,
} from '../services/goalService';

interface GoalContextValue {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'current'> & { current?: number }) => void;
  updateGoal: (goalId: number, values: Partial<Omit<Goal, 'id'>>) => void;
  deleteGoal: (goalId: number) => void;
  contributeToGoal: (goalId: number, amount: number) => void;
}

const GoalContext = createContext<GoalContextValue | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    fetchGoals().then(setGoals);
  }, []);

  function addGoal(goal: Omit<Goal, 'id' | 'current'> & { current?: number }) {
    createGoalService(goal).then((newGoal) => {
      setGoals((prev) => [...prev, newGoal]);
    });
  }

  function updateGoal(goalId: number, values: Partial<Omit<Goal, 'id'>>) {
    updateGoalService(goalId, values).then((updated) => {
      if (!updated) return;
      setGoals((prev) => prev.map((goal) => (goal.id === goalId ? updated : goal)));
    });
  }

  function deleteGoal(goalId: number) {
    deleteGoalService(goalId).then((deleted) => {
      if (deleted) {
        setGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      }
    });
  }

  function contributeToGoal(goalId: number, amount: number) {
    contributeToGoalService(goalId, amount).then((updated) => {
      if (!updated) return;
      setGoals((prev) => prev.map((goal) => (goal.id === goalId ? updated : goal)));
    });
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
