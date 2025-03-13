import { Request, Response } from 'express';
import { Order, OrderDetail, ProductService, User } from '../models';
import { sendApiResponse } from '../../../utils/responseHandler';
import { sequelize } from '../../../config/db/db-connection';

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user' },
        { model: OrderDetail, as: 'details', include: [{ model: ProductService, as: 'productService' }] }
      ]
    });
    sendApiResponse(res, true, 200, orders);
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: OrderDetail, as: 'details', include: [{ model: ProductService, as: 'productService' }] }
      ]
    });
    if (order) {
      sendApiResponse(res, true, 200, order);
    } else {
      sendApiResponse(res, false, 404, null, 'Order not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Get orders by user ID
export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      include: [
        { model: User, as: 'user' },
        { model: OrderDetail, as: 'details', include: [{ model: ProductService, as: 'productService' }] }
      ]
    });
    if (orders.length > 0) {
      sendApiResponse(res, true, 200, orders);
    } else {
      sendApiResponse(res, false, 404, null, 'No orders found for this user');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, totalAmount, status, comment, startDate, endDate, details } = req.body;

    const order = await Order.create(
      {
        userId,
        totalAmount,
        status,
        comment,
        startDate,
        endDate,
      },
      { transaction }
    );

    if (details && details.length > 0) {
      const orderDetails = details.map((detail: any) => ({
        ...detail,
        orderId: order.id,
      }));
      await OrderDetail.bulkCreate(orderDetails, { transaction });
    }

    await transaction.commit();

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        { model: User, as: 'user' },
        { model: OrderDetail, as: 'details', include: [{ model: ProductService, as: 'productService' }] }
      ]
    });

    sendApiResponse(res, true, 201, createdOrder);
  } catch (error) {
    await transaction.rollback();
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Update an existing order
export const updateOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();
  try {
    const { userId, totalAmount, status, comment, startDate, endDate, details } = req.body;

    const existingOrder = await Order.findByPk(req.params.id);
    if (!existingOrder) {
      await transaction.rollback();
      return sendApiResponse(res, false, 404, null, 'Order not found');
    }

    const updatedOrderData = {
      userId: userId !== undefined ? userId : existingOrder.userId,
      totalAmount: totalAmount !== undefined ? totalAmount : existingOrder.totalAmount,
      status: status !== undefined ? status : existingOrder.status,
      comment: comment !== undefined ? comment : existingOrder.comment,
      startDate: startDate !== undefined ? startDate : existingOrder.startDate,
      endDate: endDate !== undefined ? endDate : existingOrder.endDate,
    };

    const [updated] = await Order.update(updatedOrderData, {
      where: { id: req.params.id },
      transaction,
    });

    if (!updated) {
      await transaction.rollback();
      return sendApiResponse(res, false, 404, null, 'Order not found');
    }

    if (details && details.length > 0) {
      await OrderDetail.destroy({
        where: { orderId: req.params.id },
        transaction,
      });
      const orderDetails = details.map((detail: any) => ({
        ...detail,
        orderId: req.params.id,
      }));
      await OrderDetail.bulkCreate(orderDetails, { transaction });
    }

    await transaction.commit();

    const updatedOrder = await Order.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: OrderDetail, as: 'details', include: [{ model: ProductService, as: 'productService' }] }
      ]
    });

    sendApiResponse(res, true, 200, updatedOrder);
  } catch (error) {
    await transaction.rollback();
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      sendApiResponse(res, true, 200, null, 'Order deleted successfully');
    } else {
      sendApiResponse(res, false, 404, null, 'Order not found');
    }
  } catch (error) {
    sendApiResponse(res, false, 500, null, (error as Error).message);
  }
};