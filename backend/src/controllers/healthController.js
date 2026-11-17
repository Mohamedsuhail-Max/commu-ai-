import { getHealthStatus } from '../services/healthService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const checkHealth = (req, res, next) => {
  try {
    const health = getHealthStatus();
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Service is healthy and operating normally',
      data: health,
    });
  } catch (error) {
    next(error);
  }
};
