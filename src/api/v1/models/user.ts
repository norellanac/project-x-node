import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import Token from './token';
import Role from './role';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<string>;
  declare averageRating: CreationOptional<number>;
  declare avatarUrl: CreationOptional<string>;
  declare roles?: Role[];

  static associate(models: any) {
    User.hasMany(models.Token, {
      foreignKey: 'userId',
      as: 'tokens',
    });
    User.hasMany(models.ProductService, {
      foreignKey: 'userId',
      as: 'products',
    });
    User.belongsToMany(models.Role, {
      through: 'UserRole',
      foreignKey: 'userId',
      as: 'roles',
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
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.STRING,
    averageRating: DataTypes.FLOAT,
    avatarUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });

  return User;
}

export default User;