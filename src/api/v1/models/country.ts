import { Model, DataTypes, Sequelize } from 'sequelize';

class Country extends Model {
  public id!: number;
  public name!: string;
  public url_image!: string;
  public deletedAt!: Date | null;

  static associate(models: any) {
    Country.hasMany(models.State, {
      foreignKey: 'countryId',
      as: 'states',
    });
  }
}

export function initializeCountry(sequelize: Sequelize): typeof Country {
  Country.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Country',
    paranoid: true,
  });

  return Country;
}

export default Country;