import { analyzeGrammar } from './grammarService.js';
import { createPracticeSession } from './practiceService.js';

export const processChatMessage = ({ message, topic = 'General Practice', history = [] }) => {
  const userText = message.trim();
  const grammarAnalysis = analyzeGrammar(userText);

  let coachResponse = "That's a thoughtful point! Communicating complex ideas clearly is a great skill. What would be the next step you'd take in that situation?";

  const lower = userText.toLowerCase();

  if (lower.includes('interview') || topic.toLowerCase().includes('interview')) {
    coachResponse = "Impressive explanation! When speaking in an interview, keep your pacing steady and conclude with the tangible impact you made. Could you give me a specific example of when this helped your team?";
  } else if (lower.includes('challenge') || lower.includes('problem') || lower.includes('bug')) {
    coachResponse = "Tackling tough problems head-on demonstrates great resilience. How did you communicate the resolution timeline to other stakeholders?";
  } else if (lower.includes('coffee') || lower.includes('weekend') || lower.includes('hobby')) {
    coachResponse = "That sounds wonderfully relaxing! Engaging in creative hobbies outside of work is great for personal energy. How long have you been doing that?";
  } else if (lower.includes('meeting') || topic.toLowerCase().includes('meeting')) {
    coachResponse = "Presenting ideas with clarity in cross-functional meetings builds trust quickly. What would you do if a colleague politely disagreed with your proposal?";
  }

  // If grammar errors were detected, add an inline coach tip to the response
  if (grammarAnalysis.hasErrors) {
    coachResponse += `\n\n💡 Coaching tip: Consider saying: "${grammarAnalysis.correctedText}". (${grammarAnalysis.explanation.slice(0, 100)}...)`;
  }

  // Record practice interaction
  createPracticeSession({
    topic: `Chat: ${topic}`,
    type: 'Conversation',
    durationMinutes: 5,
    score: grammarAnalysis.hasErrors ? 82 : 95,
    mistakesLogged: grammarAnalysis.hasErrors ? 1 : 0,
  });

  return {
    reply: coachResponse,
    topic,
    corrections: grammarAnalysis.hasErrors ? grammarAnalysis.changes : [],
    grammarSummary: grammarAnalysis.hasErrors
      ? {
          category: grammarAnalysis.category,
          explanation: grammarAnalysis.explanation,
          correctedText: grammarAnalysis.correctedText,
        }
      : null,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};
