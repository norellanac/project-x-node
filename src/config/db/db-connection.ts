import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../../utils/logger';
import { log } from 'console';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    // logging: (...msg) => console.log("==DB Query: ", msg)
  }
);

export const connectAppToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger('info', 'Connection has been established successfully.', 'db-connection.ConnectAppToDatabase');
  } catch (error) {
    logger('error', `Unable to connect to the database: ${error}`, 'db-connection.ConnectAppToDatabase');
  }
};
