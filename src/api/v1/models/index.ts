import { Sequelize } from 'sequelize';
import { initializeUser } from './user';
import { initializeToken } from './token';
import { initializeCategory } from './category';
import { initializeCountry } from './country';
import { initializeState } from './state';
import { initializeCity } from './city';
import ProductService from './productservice';
import ProductDetail from './productdetail';
import ProductLocation from './productlocation';
import ProductReview from './productreview';
import OrderDetail from './orderdetail';
import Order from './order';
import UserReview from './userreview';

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

const Country = initializeCountry(sequelize);
const State = initializeState(sequelize);
const City = initializeCity(sequelize);

// Define associations
Country.associate({ State });
State.associate({ Country, City });
City.associate({ State });

ProductService.associate({ ProductDetail, ProductLocation, ProductReview });
Order.associate({ User, OrderDetail });
OrderDetail.associate({ Order, ProductService });
ProductDetail.associate({ ProductService });
ProductLocation.associate({ ProductService });
ProductReview.associate({ ProductService, User });
UserReview.associate({ User });

// Export models and sequelize instance
export { User, Token, Category };
export default sequelize;