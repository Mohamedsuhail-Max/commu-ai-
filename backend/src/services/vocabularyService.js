import { prisma, isDatabaseConfigured } from '../config/prisma.js';
import { mockStore } from '../data/mockStore.js';
import { logger } from '../utils/logger.js';

export const listVocabulary = async (userId, { search, category, status } = {}) => {
  if (isDatabaseConfigured) {
    try {
      const whereClause = {
        userId,
      };

      if (category && category !== 'All') {
        whereClause.category = { equals: category, mode: 'insensitive' };
      }

      if (status && status !== 'All') {
        whereClause.status = { equals: status, mode: 'insensitive' };
      }

      if (search) {
        whereClause.OR = [
          { word: { contains: search, mode: 'insensitive' } },
          { definition: { contains: search, mode: 'insensitive' } },
          { example: { contains: search, mode: 'insensitive' } },
        ];
      }

      const items = await prisma.vocabulary.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });

      return items;
    } catch (err) {
      logger.error('Error in Prisma listVocabulary:', err.message);
    }
  }

  // Fallback to in-memory store
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

export const addVocabularyWord = async (userId, {
  word,
  phonetic = '',
  partOfSpeech = 'Adjective',
  definition,
  example,
  category = 'General',
  status = 'Learning',
  level = 'B2',
}) => {
  const cleanWord = word.trim();

  if (isDatabaseConfigured) {
    try {
      // 1. Check duplicate for this specific user
      const existing = await prisma.vocabulary.findUnique({
        where: {
          userId_word: {
            userId,
            word: cleanWord,
          },
        },
      });

      if (existing) {
        const error = new Error(`Word "${cleanWord}" already exists in your vocabulary bank`);
        error.statusCode = 409;
        throw error;
      }

      // 2. Create in Supabase PostgreSQL
      const newItem = await prisma.vocabulary.create({
        data: {
          userId,
          word: cleanWord,
          phonetic: phonetic.trim() || undefined,
          partOfSpeech,
          definition: definition.trim(),
          example: example.trim(),
          category,
          status,
          level,
        },
      });

      // 3. Increment wordsLearned counter
      await prisma.user.update({
        where: { id: userId },
        data: { wordsLearned: { increment: 1 } },
      }).catch(() => {});

      return newItem;
    } catch (err) {
      if (err.code === 'P2002' || err.statusCode === 409) {
        const error = new Error(`Word "${cleanWord}" already exists in your vocabulary bank`);
        error.statusCode = 409;
        throw error;
      }
      logger.error('Error in Prisma addVocabularyWord:', err.message);
    }
  }

  // Fallback to in-memory store
  const existing = mockStore.vocabulary.find(
    (v) => v.word.toLowerCase() === cleanWord.toLowerCase()
  );

  if (existing) {
    const error = new Error(`Word "${cleanWord}" already exists in your vocabulary bank`);
    error.statusCode = 409;
    throw error;
  }

  const newItem = {
    id: `voc_${Date.now()}`,
    word: cleanWord,
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
