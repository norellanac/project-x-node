import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare roleId: number;

  static associate(models: any) {
    UserRole.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    UserRole.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
    });
  }
}

export function initializeUserRole(sequelize: Sequelize): typeof UserRole {
  UserRole.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserRole',
    paranoid: true,
  });

  return UserRole;
}

export default UserRole;