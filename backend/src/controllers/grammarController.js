import { analyzeGrammar, recordGrammarMistake } from '../services/grammarService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const checkGrammar = async (req, res, next) => {
  try {
    const { sentence } = req.body;
    const result = analyzeGrammar(sentence);

    // Save mistake to user's database record if errors are detected
    if (result.hasErrors) {
      await recordGrammarMistake(req.user.id, result).catch(() => {});
    }

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
