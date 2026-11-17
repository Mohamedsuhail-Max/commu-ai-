import { mockStore } from '../data/mockStore.js';

export const getPracticeHistory = (filterType) => {
  if (!filterType || filterType === 'All') {
    return mockStore.practiceHistory;
  }
  return mockStore.practiceHistory.filter(
    (item) => item.type.toLowerCase() === filterType.toLowerCase()
  );
};

export const createPracticeSession = ({ topic, type = 'Conversation', durationMinutes = 15, score = 85, mistakesLogged = 0 }) => {
  const newSession = {
    id: `sess_${Date.now()}`,
    date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    topic,
    type,
    durationMinutes: Number(durationMinutes),
    score: Number(score),
    mistakesLogged: Number(mistakesLogged),
    status: 'Completed',
    createdAt: new Date().toISOString(),
  };

  mockStore.practiceHistory.unshift(newSession);
  mockStore.user.totalSessions += 1;
  mockStore.user.dailyCompletedMinutes = Math.min(
    mockStore.user.dailyGoalMinutes,
    mockStore.user.dailyCompletedMinutes + Number(durationMinutes)
  );

  return newSession;
};
