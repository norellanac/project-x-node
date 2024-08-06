import { Sequelize } from 'sequelize';
import { initializeUser } from './user';

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
});

// Initialize models
const User = initializeUser(sequelize);

// Setup associations
User.associate({ /* other models */ });

// Export models and sequelize instance
export { User };
export default sequelize;