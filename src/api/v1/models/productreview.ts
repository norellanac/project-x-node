import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import ProductService from './productservice';

class ProductReview extends Model<InferAttributes<ProductReview>, InferCreationAttributes<ProductReview>> {
  declare id: CreationOptional<number>;
  declare productServiceId: number;
  declare userId: number;
  declare rating: number;
  declare comment?: string;
  declare deletedAt?: Date;

  static associate(models: any) {
    ProductReview.belongsTo(models.ProductService, {
      foreignKey: 'productServiceId',
      as: 'productService',
    });
    ProductReview.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export function initializeProductReview(sequelize: Sequelize): typeof ProductReview {
  ProductReview.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductReview',
    paranoid: true,
  });

  // Add hooks to update averageRating in ProductService
  ProductReview.afterCreate(async (review, options) => {
    const reviews = await ProductReview.findAll({ where: { productServiceId: review.productServiceId } });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await ProductService.update({ averageRating }, { where: { id: review.productServiceId } });
  });

  ProductReview.afterUpdate(async (review, options) => {
    const reviews = await ProductReview.findAll({ where: { productServiceId: review.productServiceId } });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await ProductService.update({ averageRating }, { where: { id: review.productServiceId } });
  });

  ProductReview.afterDestroy(async (review, options) => {
    const reviews = await ProductReview.findAll({ where: { productServiceId: review.productServiceId } });
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await ProductService.update({ averageRating }, { where: { id: review.productServiceId } });
  });

  return ProductReview;
}

export default ProductReview;