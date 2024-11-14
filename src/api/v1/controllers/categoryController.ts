import { Request, Response } from 'express';
import { createResponse } from '../../../utils/responseUtils';
import { logger } from '../../../utils/logger';
import { Category } from '../models';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, image } = req.body;
    const category = await Category.create({ name, description, icon, image });
    createResponse(res, { success: true, data: category, statusCode: 201 });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'categoryController.createCategory', req.headers['user-agent']);
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    createResponse(res, { success: true, data: categories });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'categoryController.getCategories', req.headers['user-agent']);
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      createResponse(res, { success: false, message: 'Category not found', statusCode: 404 });
      return;
    }
    createResponse(res, { success: true, data: category });
  } catch (err: any) {
    console.error('**Error**: ', err);
    createResponse(res, { success: false, errors: err, statusCode: 500 });
    logger('error', err, 'categoryController.getCategoryById', req.headers['user-agent']);
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, icon, image } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      createResponse(res, { success: false, message: 'Category not found', statusCode: 404 });
      return;
    }
    await category.update({ name, description, icon, image });
    createResponse(res, { success: true, data: category });
  } catch (err: any) {
    console.error('**Error**: ', err);
    const statusCode = err.errors ? 400 : 500;
    return createResponse(res, { success: false, errors: err.errors ?? err, statusCode });
    logger('error', err, 'categoryController.updateCategory', req.headers['user-agent']);
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      createResponse(res, { success: false, message: 'Category not found', statusCode: 404 });
      return;
    }
    await category.destroy();
    createResponse(res, { success: true, message: 'Category deleted successfully' });
  } catch (err: any) {
    console.error('**Error**: ', err);
    const statusCode = err.errors ? 400 : 500;
    logger('error', err, 'categoryController.deleteCategory', req.headers['user-agent']);
    return createResponse(res, { success: false, errors: err.errors ?? err, statusCode });
  }
};