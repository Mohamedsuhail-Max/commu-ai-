import { sendError } from '../utils/apiResponse.js';

/**
 * Higher-order middleware function to validate required fields in req.body
 * @param {Array<string>} requiredFields - List of field names that must be present and non-empty
 */
export const validateBody = (requiredFields = []) => {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      return sendError(res, {
        statusCode: 400,
        message: 'Invalid request payload: Request body is required',
      });
    }

    const missing = [];

    for (const field of requiredFields) {
      const val = req.body[field];
      if (val === undefined || val === null || (typeof val === 'string' && val.trim() === '')) {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      return sendError(res, {
        statusCode: 400,
        message: `Validation error: Missing or empty required field(s): ${missing.join(', ')}`,
        errors: missing.map((field) => ({
          field,
          message: `${field} is required and cannot be empty`,
        })),
      });
    }

    next();
  };
};
