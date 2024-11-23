import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class UserReview extends Model<InferAttributes<UserReview>, InferCreationAttributes<UserReview>> {
  declare id: CreationOptional<number>;
  declare merchantId: number;
  declare userId: number;
  declare rating: number;
  declare comment?: string;
  declare deletedAt?: Date;

  static associate(models: any) {
    UserReview.belongsTo(models.User, {
      foreignKey: 'merchantId',
      as: 'merchant',
    });
    UserReview.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export function initializeUserReview(sequelize: Sequelize): typeof UserReview {
  UserReview.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    merchantId: {
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
    modelName: 'UserReview',
    paranoid: true,
  });

  return UserReview;
}

export default UserReview;'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserReview.init({
    merchantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserReview',
  });
  return UserReview;
};