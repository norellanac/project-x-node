import { Sequelize } from 'sequelize';
import { initializeUser } from './user';
import { initializeToken } from './token';
import { initializeCategory } from './category';

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
});

// Initialize models
const User = initializeUser(sequelize);
const Token = initializeToken(sequelize);
const Category = initializeCategory(sequelize);

// Define associations
User.associate({ Token });
Token.associate({ User });

// Export models and sequelize instance
export { User, Token, Category };
export default sequelize;