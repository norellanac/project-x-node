import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;

  static associate(models: any) {
    Permission.belongsToMany(models.Role, {
      through: 'RolePermission',
      foreignKey: 'permissionId',
      as: 'roles',
    });
  }
}

export function initializePermission(sequelize: Sequelize): typeof Permission {
  Permission.init({
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
    modelName: 'Permission',
    paranoid: true,
  });

  return Permission;
}

export default Permission;