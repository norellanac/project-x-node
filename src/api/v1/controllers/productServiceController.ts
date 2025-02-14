import { Request, Response } from 'express';
import { Category, ProductService, ProductDetail, ProductLocation, ProductReview, OrderDetail, User } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import fileStorage from '../middlewares/fileStorage';
import { sequelize } from '../../../config/db/db-connection';

export const getAllProductServices = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.pagination!;

    const totalItems = await ProductService.count();
    const productServices = await ProductService.findAll({
      include: [
        { model: Category, as: 'categories' },
        { model: ProductDetail, as: 'details' },
        { model: ProductLocation, as: 'locations' },
        { model: ProductReview, as: 'reviews' },
        { model: User, as: 'user' }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']] // Optional: Order by createdAt
    });

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalItems / limit);

    sendApiResponse(res, true, 200, {
      items: productServices,
      pagination: {
        currentPage,
        totalPages,
        pageSize: limit,
        totalItems,
      },
    });
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch product services');
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
        { model: User, as: 'user' }
      ]
    });
    if (productService) {
      sendApiResponse(res, true, 200, productService);
    } else {
      sendApiResponse(res, false, 404, null, 'ProductService not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to fetch product service');
  }
};

// Create a new ProductService
// export const createProductService = async (req: Request, res: Response) => {
//   const transaction = await ProductService.sequelize!.transaction();
//   try {
//     const { categories, details, locations, ...productServiceData } = req.body;

//     // Create the ProductService instance
//     const productService = await ProductService.create(productServiceData, { transaction });

//     // Add categories
//     if (categories && categories.length > 0) {
//       const categoryInstances = await Category.findAll({ where: { id: categories } });
//       await productService.setCategories('categories', categoryInstances, { transaction });
//     }

//     // Add details
//     if (details && details.length > 0) {
//       const detailInstances = await ProductDetail.bulkCreate(details, { transaction });
//       await productService.setDetails('details', detailInstances, { transaction });
//     }

//     // Add locations
//     if (locations && locations.length > 0) {
//       const locationInstances = await ProductLocation.bulkCreate(locations, { transaction });
//       await productService.setLocations('locations', locationInstances, { transaction });
//     }

//     // Commit the transaction
//     await transaction.commit();
//     sendApiResponse(res, true, 201, productService);
//   } catch (error) {
//     // Rollback the transaction in case of error
//     await transaction.rollback();
//     sendApiResponse(res, false, 500, null, 'Failed to create product service');
//   }
// };


export const createProductService = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      name,
      description,
      urlImage,
      type,
      price,
      specialPrice,
      location,
      latitude,
      longitude,
      userId,
      categories,
      details,
      locations,
    } = req.body;

    // Create the product service
    const productService = await ProductService.create(
      {
        name,
        description,
        urlImage,
        type,
        price,
        specialPrice,
        location,
        latitude,
        longitude,
        userId,
      },
      { transaction }
    );

    // Associate categories (if any)
    if (categories && categories.length > 0) {
      const categoryInstances = await Category.findAll({
        where: { id: categories },
        transaction,
      });
      await productService.setCategories(categoryInstances, { transaction });
    }

    // Associate details (if any)
    if (details && details.length > 0) {
      const detailInstances = details.map((detail: any) => ({
        ...detail,
        productServiceId: productService.id,
      }));
      await ProductDetail.bulkCreate(detailInstances, { transaction });
    }

    // Associate locations (if any)
    if (locations && locations.length > 0) {
      const locationInstances = locations.map((loc: any) => ({
        ...loc,
        productServiceId: productService.id,
      }));
      await ProductLocation.bulkCreate(locationInstances, { transaction });
    }

    await transaction.commit();
    return res.status(201).json({ success: true, productService });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating product service:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
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
      sendApiResponse(res, true, 200, updatedProductService);
    } else {
      sendApiResponse(res, false, 404, null, 'ProductService not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to update product service');
  }
};

// Delete a ProductService
export const deleteProductService = async (req: Request, res: Response) => {
  try {
    const deleted = await ProductService.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      sendApiResponse(res, true, 204);
    } else {
      sendApiResponse(res, false, 404, null, 'ProductService not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, 'Failed to delete product service');
  }
};

// Upload an image for a ProductService
export const uploadProductServiceImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if product service exists
    const productService = await ProductService.findByPk(id);
    if (!productService) {
      return sendApiResponse(res, false, 404, null, 'ProductService not found');
    }

    // Delete the old image if it exists
    if (productService.urlImage) {
      try {
        fileStorage.deleteFile(`.${productService.urlImage}`);
      } catch (error) {
        console.error('Failed to delete old image:', error);
      }
    }

    // Define a custom name for the uploaded file
    const customName = `service-${id}`;
    const imageUrl = await fileStorage.saveFile('services', customName, req, res);

    if (!imageUrl) {
      return sendApiResponse(res, false, 400, null, 'Failed to upload image');
    }

    // Update product service record with new image URL
    productService.urlImage = imageUrl;
    await productService.save();

    return sendApiResponse(res, true, 200, productService, 'Image uploaded successfully');
  } catch (error) {
    console.error('**Error in uploadProductServiceImage**:', error);
    return sendApiResponse(res, false, 500, null, 'An error occurred while uploading the image');
  }
};