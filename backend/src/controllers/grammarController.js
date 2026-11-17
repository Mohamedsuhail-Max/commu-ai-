import { analyzeGrammar } from '../services/grammarService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const checkGrammar = (req, res, next) => {
  try {
    const { sentence } = req.body;
    const result = analyzeGrammar(sentence);

    return sendSuccess(res, {
      statusCode: 200,
      message: result.hasErrors
        ? 'Grammar analysis completed with improvement suggestions'
        : 'Sentence evaluated: No grammatical flaws detected',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
