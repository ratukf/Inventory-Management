// Router
import express from 'express';
import { createOrder, getAllOrders, getOrderById } from './order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);

export { router };
