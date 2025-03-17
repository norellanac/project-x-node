import { DataTypes, Model, Sequelize } from 'sequelize';

class Conversation extends Model {
  public id!: number;
  public user1Id!: number;
  public user2Id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public static associate(models: any) {
    // Define associations here if needed
    Conversation.hasMany(models.Message, {
      foreignKey: 'conversationId',
      as: 'messages',
    });
  }
}

export function initializeConversation(sequelize: Sequelize): typeof Conversation {
  Conversation.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    modelName: 'Conversation',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      order: [['createdAt', 'DESC']],
    },
  });

  return Conversation;
}