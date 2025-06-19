import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import ProductService from './productservice';

class OrderDetail extends Model<InferAttributes<OrderDetail>, InferCreationAttributes<OrderDetail>> {
  declare id: CreationOptional<number>;
  declare orderId: number;
  declare productServiceId: number;
  declare quantity: number;
  declare price: number;
  declare discount?: number;
  declare charge?: number;
  declare comment?: string;
  declare deletedAt?: Date;

    // Association properties
  declare productService?: NonAttribute<ProductService>; // ProductService


  static associate(models: any) {
    OrderDetail.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
    });
    OrderDetail.belongsTo(models.ProductService, {
      foreignKey: 'productServiceId',
      as: 'productService',
    });
  }
}

export function initializeOrderDetail(sequelize: Sequelize): typeof OrderDetail {
  OrderDetail.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    charge: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
    modelName: 'OrderDetail',
    paranoid: true,
  });

  return OrderDetail;
}

export default OrderDetail;