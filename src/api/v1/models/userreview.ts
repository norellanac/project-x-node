import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from './user';

class UserReview extends Model<InferAttributes<UserReview>, InferCreationAttributes<UserReview>> {
  declare id: CreationOptional<number>;
  declare userId: number; // The user being reviewed
  declare reviewerId: number; // The user writing the review
  declare rating: number;
  declare comment?: string;
  declare deletedAt?: Date;

  static associate(models: any) {
    UserReview.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user', // The user being reviewed
    });
    UserReview.belongsTo(models.User, {
      foreignKey: 'reviewerId',
      as: 'reviewer', // The user writing the review
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewerId: {
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
    await updateUserAverageRating(review.userId);
  });

  UserReview.afterUpdate(async (review, options) => {
    await updateUserAverageRating(review.userId);
  });

  UserReview.afterDestroy(async (review, options) => {
    await updateUserAverageRating(review.userId);
  });

  return UserReview;
}

// Helper function to update the average rating of a user
async function updateUserAverageRating(userId: number) {
  const reviews = await UserReview.findAll({ where: { userId } });
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0; // Set to null if no reviews exist

  await User.update({ averageRating }, { where: { id: userId } });
}

export default UserReview;