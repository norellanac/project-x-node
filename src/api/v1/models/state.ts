import { Model, DataTypes, Sequelize } from 'sequelize';

class State extends Model {
  public id!: number;
  public name!: string;
  public urlImage!: string;
  public countryId!: number;
  public deletedAt!: Date | null;

  static associate(models: any) {
    State.belongsTo(models.Country, {
      foreignKey: 'countryId',
      as: 'country',
    });
    State.hasMany(models.City, {
      foreignKey: 'stateId',
      as: 'cities',
    });
  }
}

export function initializeState(sequelize: Sequelize): typeof State {
  State.init({
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
    countryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'State',
    paranoid: true,
  });

  return State;
}

export default State;