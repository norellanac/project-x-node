import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class ProductLocation extends Model<InferAttributes<ProductLocation>, InferCreationAttributes<ProductLocation>> {
  declare id: CreationOptional<number>;
  declare productServiceId: number;
  declare name: string;
  declare description?: string;
  declare type: number;
  declare cityId: number;
  declare latitude: number;
  declare longitude: number;
  declare deletedAt?: Date;

  static associate(models: any) {
    ProductLocation.belongsTo(models.ProductService, {
      foreignKey: 'productServiceId',
      as: 'productService',
    });
  }
}

export function initializeProductLocation(sequelize: Sequelize): typeof ProductLocation {
  ProductLocation.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductLocation',
    paranoid: true,
  });

  return ProductLocation;
}

export default ProductLocation;