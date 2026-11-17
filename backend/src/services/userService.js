import { mockStore } from '../data/mockStore.js';

export const getUserProfile = () => {
  return mockStore.user;
};

export const updateUserProfile = (updates) => {
  mockStore.user = {
    ...mockStore.user,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return mockStore.user;
};
