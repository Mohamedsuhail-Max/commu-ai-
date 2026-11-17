import { mockStore } from '../data/mockStore.js';

export const listVocabulary = ({ search, category, status } = {}) => {
  let list = [...mockStore.vocabulary];

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (item) =>
        item.word.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    list = list.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (status && status !== 'All') {
    list = list.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  }

  return list;
};

export const addVocabularyWord = ({
  word,
  phonetic = '',
  partOfSpeech = 'Adjective',
  definition,
  example,
  category = 'General',
  status = 'Learning',
  level = 'B2',
}) => {
  const existing = mockStore.vocabulary.find(
    (v) => v.word.toLowerCase() === word.trim().toLowerCase()
  );

  if (existing) {
    const error = new Error(`Word "${word.trim()}" already exists in your vocabulary bank`);
    error.statusCode = 409;
    throw error;
  }

  const newItem = {
    id: `voc_${Date.now()}`,
    word: word.trim(),
    phonetic: phonetic.trim() || undefined,
    partOfSpeech,
    definition: definition.trim(),
    example: example.trim(),
    status,
    level,
    category,
    createdAt: new Date().toISOString(),
  };

  mockStore.vocabulary.unshift(newItem);
  mockStore.user.wordsLearned += 1;

  return newItem;
};
