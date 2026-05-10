import { Model, DataTypes, Sequelize } from 'sequelize';

class City extends Model {
  public id!: number;
  public name!: string;
  public urlImage!: string;
  public stateId!: number;
  public deletedAt!: Date | null;

  static associate(models: any) {
    City.belongsTo(models.State, {
      foreignKey: 'stateId',
      as: 'state',
    });
    City.hasMany(models.ProductLocation, {
      foreignKey: 'cityId',
      as: 'productLocations',
    });
  }
}

export function initializeCity(sequelize: Sequelize): typeof City {
  City.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stateId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'City',
    paranoid: true,
  });

  return City;
}

export default City;