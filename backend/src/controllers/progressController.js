import { getWeeklyProgress, getMonthlyProgress } from '../services/progressService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getWeekly = async (req, res, next) => {
  try {
    const data = await getWeeklyProgress(req.user.id);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Weekly progress metrics retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthly = async (req, res, next) => {
  try {
    const data = await getMonthlyProgress(req.user.id);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Monthly progress trajectory retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
