import { getWeeklyProgress, getMonthlyProgress } from '../services/progressService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getWeekly = (req, res, next) => {
  try {
    const data = getWeeklyProgress();
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Weekly progress metrics retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthly = (req, res, next) => {
  try {
    const data = getMonthlyProgress();
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Monthly progress trajectory retrieved successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
