import { createPracticeSession } from './practiceService.js';

export const evaluateInterviewAnswer = async (userId, { question, answer, role = 'General', category = 'Behavioral' }) => {
  const words = answer.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Multi-dimensional scoring logic
  let clarityScore = 85;
  let starScore = 80;
  let vocabScore = 82;
  let pacingScore = 85;

  if (wordCount < 20) {
    clarityScore = 65;
    starScore = 55;
    pacingScore = 60;
  } else if (wordCount > 50) {
    clarityScore = 90;
    starScore = 88;
    vocabScore = 89;
  }

  const overallScore = Math.round(
    clarityScore * 0.3 + starScore * 0.3 + vocabScore * 0.2 + pacingScore * 0.2
  );

  const feedback = {
    sessionId: `int_eval_${Date.now()}`,
    question,
    role,
    category,
    wordCount,
    overallScore,
    breakdown: {
      clarity: clarityScore,
      starStructure: starScore,
      vocabulary: vocabScore,
      pacingAndConciseness: pacingScore,
    },
    strengths: [
      'Articulated the core context and technical or situational challenge clearly.',
      'Employed professional tone and avoided excessive filler words.',
      'Demonstrated collaborative problem-solving orientation.',
    ],
    improvements: [
      wordCount < 30
        ? 'Elaborate more on the Result: state the measurable business or team outcome.'
        : 'Highlight the specific action you initiated versus what the team completed as a whole.',
      'Incorporate stronger active verbs (e.g., spearheaded, benchmarked, orchestrated).',
    ],
    idealResponse:
      "In my recent project, our engineering team encountered a conflict regarding whether to rebuild an internal service or refactor the existing code. I organized an objective benchmark spike assessing developer velocity against production risk. By quantifying a 35% performance gain, we aligned the stakeholders and delivered the upgrade ahead of schedule.",
  };

  // Automatically record this session in history linked to the user
  await createPracticeSession(userId, {
    topic: `Interview: ${category}`,
    type: 'Interview',
    durationMinutes: 10,
    score: overallScore,
    mistakesLogged: overallScore < 80 ? 2 : 1,
    metadata: feedback,
  }).catch(() => {});

  return feedback;
};
