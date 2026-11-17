import { prisma, isDatabaseConfigured } from '../config/prisma.js';
import { mockStore } from '../data/mockStore.js';
import { logger } from '../utils/logger.js';

export const getUserProfile = async (userId) => {
  if (isDatabaseConfigured) {
    try {
      let user = await prisma.user.findUnique({
        where: { id: userId },
      });

      // If user does not exist in DB yet, seed demo user
      if (!user) {
        user = await prisma.user.create({
          data: {
            id: userId,
            email: mockStore.user.email,
            name: mockStore.user.name,
            avatar: mockStore.user.avatar,
            nativeLanguage: mockStore.user.nativeLanguage,
            targetDialect: mockStore.user.targetDialect,
            proficiencyLevel: mockStore.user.proficiencyLevel,
            targetGoal: mockStore.user.targetGoal,
            feedbackStrictness: mockStore.user.feedbackStrictness,
            streakDays: mockStore.user.streakDays,
            dailyGoalMinutes: mockStore.user.dailyGoalMinutes,
            dailyCompletedMinutes: mockStore.user.dailyCompletedMinutes,
            wordsLearned: mockStore.user.wordsLearned,
            totalSessions: mockStore.user.totalSessions,
            overallFluency: mockStore.user.overallFluency,
            grammarAccuracy: mockStore.user.grammarAccuracy,
          },
        });
      }

      return user;
    } catch (err) {
      logger.error('Error in Prisma getUserProfile:', err.message);
    }
  }

  // Fallback to in-memory store
  return mockStore.user;
};

export const updateUserProfile = async (userId, updates) => {
  if (isDatabaseConfigured) {
    try {
      const allowedFields = [
        'name',
        'email',
        'avatar',
        'nativeLanguage',
        'targetDialect',
        'proficiencyLevel',
        'targetGoal',
        'feedbackStrictness',
        'dailyGoalMinutes',
      ];

      const cleanUpdates = {};
      for (const field of allowedFields) {
        if (updates[field] !== undefined) {
          cleanUpdates[field] = updates[field];
        }
      }

      const updated = await prisma.user.update({
        where: { id: userId },
        data: cleanUpdates,
      });

      return updated;
    } catch (err) {
      logger.error('Error in Prisma updateUserProfile:', err.message);
    }
  }

  // Fallback to in-memory store
  mockStore.user = {
    ...mockStore.user,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return mockStore.user;
};
