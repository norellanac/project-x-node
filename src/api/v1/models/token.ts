import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import User from './user';

class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare type: 'ACCESS' | 'REFRESH' | 'PASSWORD_RESET';
  declare expiryDate: Date;
  declare user?: User;

  static associate(models: any) {
    Token.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export function initializeToken(sequelize: Sequelize): typeof Token {
  Token.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('ACCESS', 'REFRESH', 'PASSWORD_RESET'),
      allowNull: false,
      defaultValue: 'ACCESS',
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Token',
    paranoid: true,
  });

  return Token;
}

export default Token;