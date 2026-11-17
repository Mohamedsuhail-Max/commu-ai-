import { processChatMessage } from '../services/chatService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const handleChatMessage = async (req, res, next) => {
  try {
    const result = await processChatMessage(req.user.id, req.body);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'AI coach response generated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
