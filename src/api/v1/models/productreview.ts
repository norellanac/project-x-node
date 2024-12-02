import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

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

  return ProductReview;
}

export default ProductReview;