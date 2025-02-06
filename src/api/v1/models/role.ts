import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;

  static associate(models: any) {
    Role.belongsToMany(models.User, {
      through: 'UserRole',
      foreignKey: 'roleId',
      as: 'users',
    });
    Role.belongsToMany(models.Permission, {
      through: 'RolePermission',
      foreignKey: 'roleId',
      as: 'permissions',
    });
  }
}

export function initializeRole(sequelize: Sequelize): typeof Role {
  Role.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
  });

  return Role;
}

export default Role;