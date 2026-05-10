import { 
  Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute, HasManySetAssociationsMixin, BelongsToManySetAssociationsMixin
} from 'sequelize';
import Category from './category';
import ProductDetail from './productdetail';
import ProductLocation from './productlocation';
import ProductReview from './productreview';
import User from './user';

class ProductService extends Model<InferAttributes<ProductService>, InferCreationAttributes<ProductService>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare urlImage?: string;
  declare type: number;
  declare price: number;
  declare specialPrice?: number;
  declare location?: string;
  declare latitude?: number;
  declare longitude?: number;
  declare userId: number;
  declare averageRating: CreationOptional<number>;
  declare deletedAt?: Date;

  // Associations
  declare categories?: NonAttribute<Category[]>;
  declare details?: NonAttribute<ProductDetail[]>;
  declare locations?: NonAttribute<ProductLocation[]>;
  declare reviews?: NonAttribute<ProductReview[]>;
  declare user?: NonAttribute<User>;

  // Association Methods
  declare setCategories: BelongsToManySetAssociationsMixin<Category, number>;
  declare setDetails: HasManySetAssociationsMixin<ProductDetail, number>;
  declare setLocations: HasManySetAssociationsMixin<ProductLocation, number>;

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
    ProductService.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
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
    urlImage: {
      type: DataTypes.STRING,
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    averageRating: {
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
    defaultScope: {
      order: [['createdAt', 'DESC']],
    },
  });

  return ProductService;
}

export default ProductService;
