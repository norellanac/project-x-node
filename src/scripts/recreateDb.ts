import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function recreateDatabase() {
  const dbName = process.env.DB_NAME || 'projectxdev';
  const dbUser = process.env.DB_USER || 'root';
  const dbPass = process.env.DB_PASS || 'my-secret-pw';
  const dbHost = process.env.DB_HOST || '127.0.0.1';

  // Connect to MariaDB without a database selected
  const sequelize = new Sequelize('', dbUser, dbPass, {
    host: dbHost,
    dialect: 'mariadb',
    logging: false,
  });

  try {
    console.log(`Dropping database "${dbName}"...`);
    await sequelize.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    
    console.log(`Creating database "${dbName}"...`);
    await sequelize.query(`CREATE DATABASE \`${dbName}\`;`);
    
    console.log('Database recreated successfully.');
  } catch (error) {
    console.error('Error recreating database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

recreateDatabase();
