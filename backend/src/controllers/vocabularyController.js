import { listVocabulary, addVocabularyWord } from '../services/vocabularyService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getVocabulary = (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    const items = listVocabulary({ search, category, status });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Vocabulary items retrieved successfully',
      data: items,
      meta: {
        total: items.length,
        masteredCount: items.filter((i) => i.status === 'Mastered').length,
        learningCount: items.filter((i) => i.status === 'Learning').length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createVocabulary = (req, res, next) => {
  try {
    const item = addVocabularyWord(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: `Word "${item.word}" added to vocabulary vault`,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};
