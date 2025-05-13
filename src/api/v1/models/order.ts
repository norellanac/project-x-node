import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare totalAmount: number;
  declare status: number;
  declare comment?: string;
  declare startDate?: Date;
  declare endDate?: Date;
  declare deletedAt?: Date;

  static associate(models: any) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'orderId',
      as: 'details',
    });
  }
}

export function initializeOrder(sequelize: Sequelize): typeof Order {
  Order.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, // 1: requested, 2: in progress, 3: completed, 4: cancelled, 5: refunded, 6: failed, 7: reviewed
      validate: {
        isIn: [[1, 2, 3, 4, 5, 6, 7]],
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true,
    defaultScope: {
      order: [['createdAt', 'DESC']],
    },
  });

  return Order;
}

export default Order;