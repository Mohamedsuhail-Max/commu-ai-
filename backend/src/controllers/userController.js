import { getUserProfile, updateUserProfile } from '../services/userService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getProfile = async (req, res, next) => {
  try {
    const profile = await getUserProfile(req.user.id);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updated = await updateUserProfile(req.user.id, req.body);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'User profile updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
