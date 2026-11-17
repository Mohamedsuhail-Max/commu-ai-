import { prisma, isDatabaseConfigured } from '../config/prisma.js';
import { mockStore } from '../data/mockStore.js';
import { logger } from '../utils/logger.js';

export const getPracticeHistory = async (userId, filterType) => {
  if (isDatabaseConfigured) {
    try {
      const whereClause = {
        userId,
      };

      if (filterType && filterType !== 'All') {
        whereClause.type = {
          equals: filterType,
          mode: 'insensitive',
        };
      }

      const sessions = await prisma.practiceSession.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });

      return sessions.map((s) => ({
        id: s.id,
        date: new Date(s.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        topic: s.topic,
        type: s.type,
        durationMinutes: s.durationMinutes,
        score: s.score,
        mistakesLogged: s.mistakesLogged,
        status: s.status,
        createdAt: s.createdAt,
      }));
    } catch (err) {
      logger.error('Error in Prisma getPracticeHistory:', err.message);
    }
  }

  // Fallback to in-memory store
  if (!filterType || filterType === 'All') {
    return mockStore.practiceHistory;
  }
  return mockStore.practiceHistory.filter(
    (item) => item.type.toLowerCase() === filterType.toLowerCase()
  );
};

export const createPracticeSession = async (userId, {
  topic,
  type = 'Conversation',
  durationMinutes = 15,
  score = 85,
  mistakesLogged = 0,
  metadata = null,
}) => {
  const duration = Number(durationMinutes);
  const scoreNum = Number(score);
  const mistakes = Number(mistakesLogged);

  if (isDatabaseConfigured) {
    try {
      // 1. Create PracticeSession record
      const session = await prisma.practiceSession.create({
        data: {
          userId,
          topic,
          type,
          durationMinutes: duration,
          score: scoreNum,
          mistakesLogged: mistakes,
          status: 'Completed',
          metadata: metadata || undefined,
        },
      });

      // 2. Increment user practice metrics
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalSessions: { increment: 1 },
          dailyCompletedMinutes: { increment: duration },
        },
      }).catch(() => {});

      return {
        id: session.id,
        date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        topic: session.topic,
        type: session.type,
        durationMinutes: session.durationMinutes,
        score: session.score,
        mistakesLogged: session.mistakesLogged,
        status: session.status,
        createdAt: session.createdAt,
      };
    } catch (err) {
      logger.error('Error in Prisma createPracticeSession:', err.message);
    }
  }

  // Fallback to in-memory store
  const newSession = {
    id: `sess_${Date.now()}`,
    date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    topic,
    type,
    durationMinutes: duration,
    score: scoreNum,
    mistakesLogged: mistakes,
    status: 'Completed',
    createdAt: new Date().toISOString(),
  };

  mockStore.practiceHistory.unshift(newSession);
  mockStore.user.totalSessions += 1;
  mockStore.user.dailyCompletedMinutes = Math.min(
    mockStore.user.dailyGoalMinutes,
    mockStore.user.dailyCompletedMinutes + duration
  );

  return newSession;
};
