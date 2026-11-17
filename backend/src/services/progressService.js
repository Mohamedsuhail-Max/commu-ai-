import { mockStore } from '../data/mockStore.js';

export const getWeeklyProgress = () => {
  return mockStore.weeklyProgress;
};

export const getMonthlyProgress = () => {
  return mockStore.monthlyProgress;
};
