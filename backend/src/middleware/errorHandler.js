import { logger } from '../utils/logger.js';
import { sendError } from '../utils/apiResponse.js';
import { config } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, err.stack);

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || 'An unexpected server error occurred';

  const errors = config.nodeEnv === 'development' ? err.stack : undefined;

  return sendError(res, {
    statusCode,
    message,
    errors,
  });
};
