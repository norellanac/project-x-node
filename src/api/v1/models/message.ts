import { DataTypes, Model, Sequelize } from 'sequelize';

class Message extends Model {
  public id!: number;
  public conversationId!: number;
  public senderId!: number;
  public content!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;

  public static associate(models: any) {
    Message.belongsTo(models.Conversation, {
      foreignKey: 'conversationId',
      as: 'conversation',
    });
    Message.hasMany(models.Reaction, {
      foreignKey: 'reactableId',
      constraints: false,
      scope: {
        reactableType: 'message',
      },
      as: 'Reactions' // Alias for the association
    });
    Message.hasOne(models.User, {
      foreignKey: 'id',
      sourceKey: 'senderId',
      as: 'sender',
    });
  }
}

export function initializeMessage(sequelize: Sequelize): typeof Message {
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
    modelName: 'Message',
    timestamps: true,
    paranoid: true,
  });

  return Message;
}