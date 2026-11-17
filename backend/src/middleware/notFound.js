import { sendError } from '../utils/apiResponse.js';

export const notFound = (req, res, next) => {
  return sendError(res, {
    statusCode: 404,
    message: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found`,
  });
};
