import { DataTypes, Model, Sequelize } from 'sequelize';

class Reaction extends Model {
  public id!: number;
  public userId!: number;
  public reactableType!: string;
  public reactableId!: number;
  public type!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public static associate(models: any) {
    // Define associations here if needed
    Reaction.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'userId',
      as: 'user',
    });
  }
}

export function initializeReaction(sequelize: Sequelize): typeof Reaction {
  Reaction.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reactableType: { 
      type: DataTypes.STRING,
      allowNull: false,
    }, // message, comment, post
    reactableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, // message id, comment id, post id
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // like, love, haha, wow, sad, angry
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Reaction',
    timestamps: true,
    paranoid: true,
  });

  return Reaction;
}