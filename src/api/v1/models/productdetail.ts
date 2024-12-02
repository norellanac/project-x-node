import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class ProductDetail extends Model<InferAttributes<ProductDetail>, InferCreationAttributes<ProductDetail>> {
  declare id: CreationOptional<number>;
  declare productServiceId: number;
  declare label: string;
  declare value: string;
  declare description?: string;
  declare deletedAt?: Date;

  static associate(models: any) {
    ProductDetail.belongsTo(models.ProductService, {
      foreignKey: 'productServiceId',
      as: 'productService',
    });
  }
}

export function initializeProductDetail(sequelize: Sequelize): typeof ProductDetail {
  ProductDetail.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ProductDetail',
    paranoid: true,
  });

  return ProductDetail;
}

export default ProductDetail;