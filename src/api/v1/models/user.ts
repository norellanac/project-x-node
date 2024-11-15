import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import Token from './token';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<string>;
  declare averageRating: CreationOptional<number>;

  static associate(models: any) {
    User.hasMany(models.Token, {
      foreignKey: 'userId',
      as: 'tokens',
    });
  }
}

export function initializeUser(sequelize: Sequelize): typeof User {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    averageRating: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });

  return User;
}

export default User;