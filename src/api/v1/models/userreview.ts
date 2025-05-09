import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from './user';

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
    modelName: 'UserReview',
    paranoid: true,
  });

  // Hooks to update average rating
  UserReview.afterCreate(async (review, options) => {
    await updateMerchantAverageRating(review.merchantId);
  });

  UserReview.afterUpdate(async (review, options) => {
    await updateMerchantAverageRating(review.merchantId);
  });

  UserReview.afterDestroy(async (review, options) => {
    await updateMerchantAverageRating(review.merchantId);
  });

  return UserReview;
}

// Helper function to update the average rating of a merchant
async function updateMerchantAverageRating(merchantId: number) {
  const reviews = await UserReview.findAll({ where: { merchantId } });
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0; // Set to null if no reviews exist

  await User.update({ averageRating }, { where: { id: merchantId } });
}

export default UserReview;