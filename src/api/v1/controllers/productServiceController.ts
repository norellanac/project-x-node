import { Request, Response } from 'express';
import { Category, ProductService, ProductDetail, ProductLocation, ProductReview, OrderDetail } from '../models';

// Get all ProductServices with all associations
export const getAllProductServices = async (req: Request, res: Response) => {
  try {
    const productServices = await ProductService.findAll({
      include: [
        { model: Category, as: 'categories' },
        { model: ProductDetail, as: 'details' },
        { model: ProductLocation, as: 'locations' },
        { model: ProductReview, as: 'reviews' },
      ]
    });
    res.status(200).json(productServices);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Get a single ProductService by ID with all associations
export const getProductServiceById = async (req: Request, res: Response) => {
  try {
    const productService = await ProductService.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'categories' },
        { model: ProductDetail, as: 'details' },
        { model: ProductLocation, as: 'locations' },
        { model: ProductReview, as: 'reviews' },
      ]
    });
    if (productService) {
      res.status(200).json(productService);
    } else {
      res.status(404).json({ error: 'ProductService not found' });
    }
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Create a new ProductService
export const createProductService = async (req: Request, res: Response) => {
  try {
    const productService = await ProductService.create(req.body);
    res.status(201).json(productService);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Update an existing ProductService
export const updateProductService = async (req: Request, res: Response) => {
  try {
    const [updated] = await ProductService.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProductService = await ProductService.findByPk(req.params.id, {
        include: [
          { model: Category, as: 'categories' },
          { model: ProductDetail, as: 'details' },
          { model: ProductLocation, as: 'locations' },
          { model: ProductReview, as: 'reviews' },
          { model: OrderDetail, as: 'orderDetails' }
        ]
      });
      res.status(200).json(updatedProductService);
    } else {
      res.status(404).json({ error: 'ProductService not found' });
    }
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Delete a ProductService
export const deleteProductService = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'ProductService not found' });
    }
  } catch (error) {
    res.status(500).json({ error});
  }
};