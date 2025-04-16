import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import Token from './token';
import Role from './role';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;
  declare averageRating: CreationOptional<number>;
  declare avatarUrl: CreationOptional<string>;
  
  // Association Methods
  declare setRoles: (roles: Role[]) => Promise<void>;
  declare getRoles: () => Promise<Role[]>;
  declare addRole: (role: Role) => Promise<void>;
  declare removeRole: (role: Role) => Promise<void>;
  declare hasRole: (role: Role) => Promise<boolean>;

  // Associations
  declare roles?: NonAttribute<Role[]>;

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
    User.belongsToMany(models.Conversation, {
      through: 'UserConversation',
      foreignKey: 'userId',
      as: 'conversations',
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
    averageRating: DataTypes.FLOAT,
    avatarUrl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ['password'] }, // Exclude password by default
    },
    scopes: {
      withPassword: {
        attributes: undefined, // Include all attributes, including password
      },
    },
  });

  return User;
}

export default User;