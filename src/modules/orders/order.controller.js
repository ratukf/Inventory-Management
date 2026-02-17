import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
} from './order.service.js';
import { validateCreateOrder } from './order.validation.js';

// Post
const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    validateCreateOrder({ items });

    const order = await createOrderService(items);
    res.status(201).json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await getAllOrdersService();
    res.json({ status: 'success', data: orders });
  } catch (error) {
    next(error);
  }
};

// Fetch one order
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdService(id);
    res.json({ status: 'success', data: order });
  } catch (error) {
    next(error);
  }
};

export { createOrder, getAllOrders, getOrderById };
