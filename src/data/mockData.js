export const mockUser = {
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  proficiency: "Intermediate (B1-B2)",
  targetGoal: "Tech Job Interviews & Professional Fluency",
  streakDays: 8,
  dailyGoalMinutes: 30,
  dailyCompletedMinutes: 20,
  wordsLearned: 142,
  totalSessions: 38,
  overallFluency: 78,
  grammarAccuracy: 82,
};

export const mockWeeklyProgress = [
  { day: "Mon", fluency: 68, accuracy: 72, minutes: 25 },
  { day: "Tue", fluency: 70, accuracy: 75, minutes: 30 },
  { day: "Wed", fluency: 72, accuracy: 74, minutes: 20 },
  { day: "Thu", fluency: 75, accuracy: 78, minutes: 35 },
  { day: "Fri", fluency: 74, accuracy: 80, minutes: 40 },
  { day: "Sat", fluency: 78, accuracy: 81, minutes: 15 },
  { day: "Sun", fluency: 79, accuracy: 84, minutes: 30 },
];

export const mockMonthlyProgress = [
  { week: "Week 1", fluency: 62, accuracy: 68, words: 24 },
  { week: "Week 2", fluency: 68, accuracy: 73, words: 35 },
  { week: "Week 3", fluency: 74, accuracy: 79, words: 42 },
  { week: "Week 4", fluency: 79, accuracy: 84, words: 41 },
];

export const mockMistakeCategories = [
  { category: "Verb Tenses", count: 18, percentage: 38, color: "#6366f1" },
  { category: "Prepositions", count: 12, percentage: 25, color: "#3b82f6" },
  { category: "Articles (a/an/the)", count: 9, percentage: 19, color: "#10b981" },
  { category: "Subject-Verb Agreement", count: 6, percentage: 12, color: "#f59e0b" },
  { category: "Word Order", count: 3, percentage: 6, color: "#ec4899" },
];

export const mockRecentActivities = [
  {
    id: "act-1",
    type: "AI Conversation",
    title: "Discussing Product Roadmaps",
    time: "2 hours ago",
    duration: "14 mins",
    score: 86,
    correctionsCount: 2,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "act-2",
    type: "Grammar Drill",
    title: "Past Perfect vs Simple Past",
    time: "Yesterday",
    duration: "10 mins",
    score: 92,
    correctionsCount: 1,
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "act-3",
    type: "Mock Interview",
    title: "Behavioral: Handling Conflict at Work",
    time: "2 days ago",
    duration: "22 mins",
    score: 79,
    correctionsCount: 4,
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "act-4",
    type: "Vocabulary",
    title: "Learned 5 C1 Business Phrasal Verbs",
    time: "3 days ago",
    duration: "8 mins",
    score: 100,
    correctionsCount: 0,
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

export const mockPracticeTopics = [
  {
    id: "tech-interview",
    title: "Tech Job Interview",
    category: "Professional",
    icon: "Briefcase",
    description: "Practice answering behavioral and architectural questions with confidence.",
    difficulty: "Advanced",
  },
  {
    id: "casual-coffee",
    title: "Coffee Shop & Casual Talk",
    category: "Daily Life",
    icon: "Coffee",
    description: "Relaxed small talk, weekend plans, and casual greetings.",
    difficulty: "Beginner",
  },
  {
    id: "meeting-debate",
    title: "Leading a Team Meeting",
    category: "Workplace",
    icon: "Users",
    description: "Expressing disagreements politely, agreeing on deadlines, and presenting ideas.",
    difficulty: "Intermediate",
  },
  {
    id: "travel-airport",
    title: "Airport & Hotel Check-in",
    category: "Travel",
    icon: "Plane",
    description: "Resolving travel hiccups, asking for directions, and making reservations.",
    difficulty: "Beginner",
  },
  {
    id: "storytelling",
    title: "Sharing Personal Experiences",
    category: "Fluency",
    icon: "Sparkles",
    description: "Learn how to tell engaging stories with smooth transition phrases.",
    difficulty: "Intermediate",
  },
];

export const mockChatConversations = [
  {
    id: "conv-1",
    topic: "Tech Job Interview",
    lastMessage: "Could you tell me about a time you solved a tough bug?",
    updatedAt: "10:30 AM",
    messagesCount: 8,
  },
  {
    id: "conv-2",
    topic: "Coffee Shop & Casual Talk",
    lastMessage: "I love exploring local roasters on Saturdays!",
    updatedAt: "Yesterday",
    messagesCount: 14,
  },
  {
    id: "conv-3",
    topic: "Leading a Team Meeting",
    lastMessage: "I suggest we postpone the deployment by two days.",
    updatedAt: "Nov 14",
    messagesCount: 19,
  },
];

export const mockInitialMessages = [
  {
    id: "m-1",
    sender: "ai",
    text: "Hello Alex! I am your AI Communication Coach. Today, let's practice your tech job interview responses. Whenever you're ready, tell me about your background and what you are passionate about.",
    timestamp: "10:30 AM",
    corrections: null,
  },
  {
    id: "m-2",
    sender: "user",
    text: "Hi! I am working as frontend engineer since three years and I really passionate about creating accessible interfaces.",
    timestamp: "10:31 AM",
    corrections: [
      {
        original: "am working ... since three years",
        corrected: "have been working ... for three years",
        rule: "Present Perfect Continuous with 'for' duration",
      },
      {
        original: "I really passionate",
        corrected: "I am really passionate",
        rule: "Missing auxiliary verb 'to be'",
      },
    ],
  },
  {
    id: "m-3",
    sender: "ai",
    text: "That's a fantastic focus! Accessible interfaces make technology truly inclusive for everyone.\n\nA quick coaching tip: when describing ongoing tenure, say: 'I have been working as a frontend engineer for three years, and I am really passionate about...'\n\nNow, could you share a specific challenge you faced while making a component accessible?",
    timestamp: "10:32 AM",
    corrections: null,
  },
];

export const mockGrammarExamples = [
  {
    id: "g-1",
    input: "Yesterday I have went to office and meeted my manager.",
    corrected: "Yesterday I went to the office and met my manager.",
    category: "Past Simple & Irregular Verbs",
    explanation:
      "When specifying a completed past time like 'yesterday', use the Simple Past ('went'), not Present Perfect ('have went'). Also, 'meet' is an irregular verb with past tense 'met', not 'meeted'. Don't forget the definite article 'the' before 'office'.",
    examples: [
      "I went to the store yesterday morning.",
      "She met her mentor at the networking event.",
      "We completed the quarterly report last Friday.",
    ],
  },
  {
    id: "g-2",
    input: "She don't likes the coffee because it is too much bitter.",
    corrected: "She doesn't like coffee because it is too bitter.",
    category: "Subject-Verb Agreement & Adverb Usage",
    explanation:
      "With third-person singular ('she/he/it'), the auxiliary verb is 'does not' (doesn't), followed by the base verb 'like' (not 'likes'). Use 'too bitter' instead of 'too much bitter' when modifying an adjective directly.",
    examples: [
      "He doesn't drink tea in the afternoon.",
      "The soup is too salty for my taste.",
      "She doesn't enjoy crowded conferences.",
    ],
  },
  {
    id: "g-3",
    input: "He is very good in speaking english when he is not nervous.",
    corrected: "He is very good at speaking English when he isn't nervous.",
    category: "Prepositions & Capitalization",
    explanation:
      "We say someone is 'good at' an activity or skill, not 'good in'. Additionally, languages and nationalities such as 'English' must always be capitalized.",
    examples: [
      "She is exceptionally good at public speaking.",
      "They are good at resolving customer escalations.",
      "Learning to speak fluent English takes consistent practice.",
    ],
  },
];

export const mockVocabularyList = [
  {
    id: "v-1",
    word: "Articulate",
    phonetic: "/ɑːrˈtɪk.jə.lət/",
    partOfSpeech: "Adjective",
    definition: "Able to express thoughts and feelings clearly and effectively in speech.",
    example: "She gave an articulate and persuasive presentation to the executive board.",
    status: "Mastered",
    level: "C1",
    category: "Communication",
  },
  {
    id: "v-2",
    word: "Pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    partOfSpeech: "Adjective",
    definition: "Dealing with things sensibly and realistically based on practical rather than theoretical considerations.",
    example: "We needed a pragmatic solution that could be shipped before the end of the sprint.",
    status: "Reviewing",
    level: "B2",
    category: "Business",
  },
  {
    id: "v-3",
    word: "Elaborate",
    phonetic: "/ɪˈlæb.ə.reɪt/",
    partOfSpeech: "Verb",
    definition: "To develop or present a theory, policy, or system in further detail.",
    example: "Could you elaborate on how your microservice handles intermittent network partitions?",
    status: "Learning",
    level: "B2",
    category: "Interview",
  },
  {
    id: "v-4",
    word: "Concise",
    phonetic: "/kənˈsaɪs/",
    partOfSpeech: "Adjective",
    definition: "Giving a lot of information clearly and in a few words; brief but comprehensive.",
    example: "His answer was concise yet thorough, which impressed the hiring manager.",
    status: "Mastered",
    level: "B2",
    category: "Professional",
  },
  {
    id: "v-5",
    word: "Discrepancy",
    phonetic: "/dɪˈskrep.ən.si/",
    partOfSpeech: "Noun",
    definition: "A lack of compatibility or similarity between two or more facts or numbers.",
    example: "There was a slight discrepancy between the test logs and production analytics.",
    status: "Reviewing",
    level: "C1",
    category: "Technical",
  },
  {
    id: "v-6",
    word: "Empathy",
    phonetic: "/ˈem.pə.θi/",
    partOfSpeech: "Noun",
    definition: "The ability to understand and share the feelings and viewpoints of another person.",
    example: "Strong communication requires active listening and genuine empathy.",
    status: "Mastered",
    level: "B1",
    category: "Interpersonal",
  },
];

export const mockInterviewQuestions = [
  {
    id: "int-1",
    category: "Behavioral & Leadership",
    role: "Senior Frontend Engineer",
    question: "Tell me about a time you had a strong disagreement with a team member or product manager. How did you handle it?",
    tips: [
      "Use the STAR method: Situation, Task, Action, Result.",
      "Focus on empathy, data-driven reasoning, and the company outcome.",
      "Avoid blaming others; demonstrate collaborative conflict resolution.",
    ],
    sampleGoodPoints: [
      "Clarified underlying user requirements first.",
      "Constructed a quick A/B benchmark prototype to test both hypotheses.",
      "Reached consensus respectfully without personal friction.",
    ],
  },
  {
    id: "int-2",
    category: "Technical Architecture",
    role: "Fullstack Developer",
    question: "How do you explain a complex technical concept, such as database indexing, to a non-technical stakeholder?",
    tips: [
      "Use real-world analogies (e.g. textbook index or library catalog).",
      "Explain the business impact (speed, cost savings, user retention).",
      "Pause and check for understanding frequently.",
    ],
    sampleGoodPoints: [
      "Avoid jargon unless immediately explained.",
      "Focus on user latency and reliability.",
      "Offer follow-up documentation in plain English.",
    ],
  },
  {
    id: "int-3",
    category: "Career & Motivation",
    role: "All Roles",
    question: "Why are you interested in this position, and where do you see your communication skills playing a key role?",
    tips: [
      "Tie your personal values to the team's mission.",
      "Highlight cross-functional collaboration and clear documentation.",
    ],
    sampleGoodPoints: [
      "Show genuine enthusiasm for the product's impact.",
      "Mention mentoring junior developers or cross-team alignment.",
    ],
  },
];

export const mockPracticeHistory = [
  {
    id: "h-1",
    date: "Today, Nov 17",
    topic: "Tech Job Interview Simulator",
    type: "Interview",
    duration: "24 mins",
    score: 88,
    mistakesLogged: 2,
    status: "Completed",
  },
  {
    id: "h-2",
    date: "Nov 16, 2026",
    topic: "Grammar Drill: Conditional Sentences",
    type: "Grammar",
    duration: "15 mins",
    score: 95,
    mistakesLogged: 1,
    status: "Completed",
  },
  {
    id: "h-3",
    date: "Nov 15, 2026",
    topic: "Casual Small Talk with AI Coach",
    type: "Conversation",
    duration: "30 mins",
    score: 84,
    mistakesLogged: 3,
    status: "Completed",
  },
  {
    id: "h-4",
    date: "Nov 14, 2026",
    topic: "Business Vocabulary Expansion (C1)",
    type: "Vocabulary",
    duration: "18 mins",
    score: 90,
    mistakesLogged: 0,
    status: "Completed",
  },
  {
    id: "h-5",
    date: "Nov 13, 2026",
    topic: "Behavioral Interview: Conflict Resolution",
    type: "Interview",
    duration: "20 mins",
    score: 81,
    mistakesLogged: 4,
    status: "Completed",
  },
];
