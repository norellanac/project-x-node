import { Request, Response } from 'express';
import { UserReview, User } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';

// Helper function to update the average rating of a user
const updateUserAverageRating = async (userId: number) => {
  const reviews = await UserReview.findAll({ where: { userId } });
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0; // Set to null if no reviews exist

  await User.update({ averageRating }, { where: { id: userId } });
};

// Create a user review
export const createUserReview = async (req: Request, res: Response) => {
  try {
    const { merchantId, userId, rating, comment } = req.body;

    const review = await UserReview.create({
      merchantId,
      userId,
      rating,
      comment,
    });

    // Update average rating for the merchant
    await updateUserAverageRating(userId);

    sendApiResponse(res, true, 201, review, 'User review created successfully');
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get all reviews for a user
export const getUserReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await UserReview.findAll({
      where: { userId: req.params.userId },
      include: [{ association: 'user' }],
    });

    sendApiResponse(res, true, 200, reviews);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Update a user review
export const updateUserReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;

    const [updated] = await UserReview.update(
      { rating, comment },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedReview = await UserReview.findByPk(req.params.id);

      // Update average rating for the merchant
      if (updatedReview) {
        await updateUserAverageRating(updatedReview.userId);
      }

      sendApiResponse(res, true, 200, updatedReview, 'User review updated successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'User review not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Delete a user review
export const deleteUserReview = async (req: Request, res: Response) => {
  try {
    const review = await UserReview.findByPk(req.params.id);

    if (!review) {
      return sendApiResponse(res, false, 404, null, 'User review not found');
    }

    const deleted = await UserReview.destroy({ where: { id: req.params.id } });

    if (deleted) {
      // Update average rating for the merchant
      await updateUserAverageRating(review.userId);

      sendApiResponse(res, true, 200, null, 'User review deleted successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'User review not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};