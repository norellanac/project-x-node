import { Request, Response } from 'express';
import { Category } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import fileStorage from '../middlewares/fileStorage';
import { logger } from '../../../utils/logger';

// Get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    sendApiResponse(res, true, 200, categories);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      sendApiResponse(res, true, 200, category);
    } else {
      sendApiResponse(res, false, 404, null, 'Category not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, urlImage } = req.body;

    const category = await Category.create({
      name,
      description,
      icon: icon || 'https://picsum.photos/50/50?random=1',
      urlImage: urlImage || 'https://picsum.photos/300/200?random=1',
    });

    sendApiResponse(res, true, 201, category);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Update an existing category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      sendApiResponse(res, true, 200, updatedCategory);
    } else {
      sendApiResponse(res, false, 404, null, 'Category not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      sendApiResponse(res, true, 200, null, 'Category deleted successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'Category not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

export const uploadCategoryImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const category = await Category.findByPk(id);
    if (!category) {
      return sendApiResponse(res, false, 404, null, 'Category not found');
    }

    // Delete the old image if it exists
    if (category.urlImage) {
      try {
        fileStorage.deleteFile(`.${category.urlImage}`);
      } catch (error) {
        console.error('Failed to delete old image:', error);
        logger('error', error, 'uploadCategoryImage', req.headers['user-agent'], id);
      }
    }

    // Define a custom name for the uploaded file
    const customName = `category-${id}`;
    const imageUrl = await fileStorage.saveFile('categories', customName, req, res);

    if (!imageUrl) {
      return sendApiResponse(res, false, 400, null, 'Failed to upload image');
    }

    // Update category record with new image URL
    category.urlImage = imageUrl;
    await category.save();

    return sendApiResponse(res, true, 200, category, 'Image uploaded successfully');
  } catch (error) {
    logger('error', error, 'uploadCategoryImage', req.headers['user-agent'], req.params.id);
    return sendApiResponse(res, false, 500, null, 'An error occurred while uploading the image');
  }
};