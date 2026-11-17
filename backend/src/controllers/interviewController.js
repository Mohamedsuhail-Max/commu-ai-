import { evaluateInterviewAnswer } from '../services/interviewService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const handleInterviewSession = (req, res, next) => {
  try {
    const feedback = evaluateInterviewAnswer(req.body);
    return sendSuccess(res, {
      statusCode: 201,
      message: 'Interview response evaluated successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};
