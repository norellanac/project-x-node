import { Request, Response } from 'express';
import { ProductReview, ProductService } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';

// Helper function to update the average rating of a product
const updateProductAverageRating = async (productServiceId: number) => {
  const reviews = await ProductReview.findAll({ where: { productServiceId } });
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  await ProductService.update({ averageRating }, { where: { id: productServiceId } });
};

// Create a product review
export const createProductReview = async (req: Request, res: Response) => {
  try {
    const { productServiceId, userId, rating, comment } = req.body;

    const review = await ProductReview.create({
      productServiceId,
      userId,
      rating,
      comment,
    });

    // Update average rating
    await updateProductAverageRating(productServiceId);

    sendApiResponse(res, true, 201, review, 'Product review created successfully');
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get all reviews for a product
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ProductReview.findAll({
      where: { productServiceId: req.params.productServiceId },
      include: [{ association: 'user' }],
    });

    sendApiResponse(res, true, 200, reviews);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Update a product review
export const updateProductReview = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;

    const [updated] = await ProductReview.update(
      { rating, comment },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedReview = await ProductReview.findByPk(req.params.id);

      // Update average rating
      if (updatedReview) {
        await updateProductAverageRating(updatedReview.productServiceId);
      }

      sendApiResponse(res, true, 200, updatedReview, 'Product review updated successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'Product review not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Delete a product review
export const deleteProductReview = async (req: Request, res: Response) => {
  try {
    const review = await ProductReview.findByPk(req.params.id);

    if (!review) {
      return sendApiResponse(res, false, 404, null, 'Product review not found');
    }

    const deleted = await ProductReview.destroy({ where: { id: req.params.id } });

    if (deleted) {
      // Update average rating
      await updateProductAverageRating(review.productServiceId);

      sendApiResponse(res, true, 200, null, 'Product review deleted successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'Product review not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};