import { getPracticeHistory, createPracticeSession } from '../services/practiceService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const listPracticeHistory = async (req, res, next) => {
  try {
    const { type } = req.query;
    const history = await getPracticeHistory(req.user.id, type);
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

export const startPracticeSession = async (req, res, next) => {
  try {
    const session = await createPracticeSession(req.user.id, req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Practice session logged successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};
