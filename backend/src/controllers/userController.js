import { getUserProfile, updateUserProfile } from '../services/userService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getProfile = (req, res, next) => {
  try {
    const profile = getUserProfile();
    return sendSuccess(res, {
      statusCode: 200,
      message: 'User profile retrieved successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = (req, res, next) => {
  try {
    const updated = updateUserProfile(req.body);
    return sendSuccess(res, {
      statusCode: 200,
      message: 'User profile updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
