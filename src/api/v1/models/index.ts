import { Sequelize } from 'sequelize';
import { initializeUser } from './user';
import { initializeToken } from './token';
import { initializeCategory } from './category';
import { initializeCountry } from './country';
import { initializeState } from './state';
import { initializeCity } from './city';
import { initializeProductService } from './productservice';
import { initializeProductDetail } from './productdetail';
import { initializeProductLocation } from './productlocation';
import { initializeProductReview } from './productreview';
import { initializeOrderDetail } from './orderdetail';
import { initializeOrder } from './order';
import { initializeUserReview } from './userreview';

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST,
  dialect: 'mariadb',
});

// Initialize models
const User = initializeUser(sequelize);
const Token = initializeToken(sequelize);
const Category = initializeCategory(sequelize);
const Country = initializeCountry(sequelize);
const State = initializeState(sequelize);
const City = initializeCity(sequelize);
const ProductService = initializeProductService(sequelize);
const ProductDetail = initializeProductDetail(sequelize);
const ProductLocation = initializeProductLocation(sequelize);
const ProductReview = initializeProductReview(sequelize);
const OrderDetail = initializeOrderDetail(sequelize);
const Order = initializeOrder(sequelize);
const UserReview = initializeUserReview(sequelize);

// Define associations
User.associate({ Token, UserReview, Order });
Token.associate({ User });
Category.associate({ ProductService });
Country.associate({ State });
State.associate({ Country, City });
City.associate({ State });
ProductService.associate({ ProductDetail, ProductLocation, ProductReview, Category, OrderDetail });
ProductDetail.associate({ ProductService });
ProductLocation.associate({ ProductService });
ProductReview.associate({ ProductService, User });
Order.associate({ User, OrderDetail });
OrderDetail.associate({ Order, ProductService });
UserReview.associate({ User });

// Export models and sequelize instance
export {
  sequelize,
  User,
  Token,
  Category,
  Country,
  State,
  City,
  ProductService,
  ProductDetail,
  ProductLocation,
  ProductReview,
  OrderDetail,
  Order,
  UserReview
};