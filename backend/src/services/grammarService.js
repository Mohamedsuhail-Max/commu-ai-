/**
 * Grammar Analysis & Correction Service
 * (Will connect to Gemini API Function Calling in subsequent chapters)
 */

export const analyzeGrammar = (sentence) => {
  const text = sentence.trim();
  const lower = text.toLowerCase();

  const rulesCatalog = [
    {
      match: (s) => s.includes('have went') || s.includes('meeted') || s.includes('i go yesterday'),
      category: 'Past Simple & Irregular Verbs',
      corrected: text
        .replace(/\bhave went\b/gi, 'went')
        .replace(/\bmeeted\b/gi, 'met')
        .replace(/\bi go yesterday\b/gi, 'I went yesterday'),
      explanation:
        "When specifying completed past events, use the Simple Past ('went', 'met'). 'Meet' is irregular (past form: 'met', not 'meeted'). Avoid using Present Perfect ('have went') with specific past time indicators.",
      examples: [
        'Yesterday I went to the office and met my manager.',
        'We completed the milestone last Friday.',
        'She met the client during the morning conference.',
      ],
      changes: [
        { original: 'have went / meeted', corrected: 'went / met', rule: 'Past tense irregular verb conjugation' },
      ],
    },
    {
      match: (s) => s.includes("she don't") || s.includes("he don't") || s.includes("it don't"),
      category: 'Subject-Verb Agreement',
      corrected: text
        .replace(/\bshe don't\b/gi, "she doesn't")
        .replace(/\bhe don't\b/gi, "he doesn't")
        .replace(/\bit don't\b/gi, "it doesn't"),
      explanation:
        "Third-person singular subjects (he, she, it) require the auxiliary verb 'does not' ('doesn't'), followed by the base form of the main verb.",
      examples: [
        "She doesn't like cold coffee.",
        "He doesn't usually join the standup late.",
        "It doesn't make sense to postpone without notifying the client.",
      ],
      changes: [
        { original: "don't", corrected: "doesn't", rule: 'Third-person singular agreement' },
      ],
    },
    {
      match: (s) => s.includes('good in') || s.includes('interested to'),
      category: 'Preposition Selection',
      corrected: text
        .replace(/\bgood in speaking\b/gi, 'good at speaking')
        .replace(/\bgood in english\b/gi, 'good at English')
        .replace(/\bgood in\b/gi, 'good at'),
      explanation:
        "Use the preposition 'at' when describing proficiency in an activity or subject (e.g., 'good at speaking', 'skilled at negotiation').",
      examples: [
        'He is very good at speaking English in client meetings.',
        'Our team is skilled at resolving production outages.',
        'She is exceptionally good at active listening.',
      ],
      changes: [
        { original: 'good in', corrected: 'good at', rule: 'Adjective + Preposition collocation' },
      ],
    },
    {
      match: (s) => s.includes('since two years') || s.includes('since 3 years') || s.includes('since months'),
      category: 'Time Prepositions (For vs. Since)',
      corrected: text
        .replace(/\bsince two years\b/gi, 'for two years')
        .replace(/\bsince 3 years\b/gi, 'for 3 years')
        .replace(/\bsince months\b/gi, 'for months'),
      explanation:
        "Use 'for' when referring to a duration or period of elapsed time (e.g., for two years, for three days). Use 'since' only with a specific starting point in time (e.g., since 2024, since Monday).",
      examples: [
        'I have been working as a frontend engineer for two years.',
        'They have lived in London since 2021.',
        'We have been testing this release for two weeks.',
      ],
      changes: [
        { original: 'since [duration]', corrected: 'for [duration]', rule: 'Duration vs Starting Point' },
      ],
    },
  ];

  for (const rule of rulesCatalog) {
    if (rule.match(lower)) {
      return {
        originalText: text,
        correctedText: rule.corrected,
        category: rule.category,
        explanation: rule.explanation,
        examples: rule.examples,
        changes: rule.changes,
        hasErrors: true,
      };
    }
  }

  // Fallback for general sentences
  return {
    originalText: text,
    correctedText: text,
    category: 'Style & Fluency',
    explanation: 'Your sentence is grammatically sound! Keep practicing to maintain fluency.',
    examples: [
      'Consistent practice leads to effortless natural expression.',
      'Active vocabulary expands through daily situational use.',
    ],
    changes: [],
    hasErrors: false,
  };
};
