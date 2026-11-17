import { getPracticeHistory, createPracticeSession } from '../services/practiceService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const listPracticeHistory = (req, res, next) => {
  try {
    const { type } = req.query;
    const history = getPracticeHistory(type);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Practice history retrieved successfully',
      data: history,
      meta: { total: history.length },
    });
  } catch (error) {
    next(error);
  }
};

export const startPracticeSession = (req, res, next) => {
  try {
    const session = createPracticeSession(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Practice session logged successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};
