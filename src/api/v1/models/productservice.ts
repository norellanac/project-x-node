import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class ProductService extends Model<InferAttributes<ProductService>, InferCreationAttributes<ProductService>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare type: number;
  declare price: number;
  declare specialPrice?: number;
  declare location?: string;
  declare latitude?: number;
  declare longitude?: number;
  declare deletedAt?: Date;

  static associate(models: any) {
    ProductService.hasMany(models.ProductDetail, {
      foreignKey: 'productServiceId',
      as: 'details',
    });
    ProductService.hasMany(models.ProductLocation, {
      foreignKey: 'productServiceId',
      as: 'locations',
    });
    ProductService.hasMany(models.ProductReview, {
      foreignKey: 'productServiceId',
      as: 'reviews',
    });
    ProductService.belongsToMany(models.Category, {
      through: 'ProductCategory',
      foreignKey: 'productServiceId',
      as: 'categories',
    });
  }
}

export function initializeProductService(sequelize: Sequelize): typeof ProductService {
  ProductService.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    specialPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductService',
    paranoid: true,
  });

  return ProductService;
}

export default ProductService;