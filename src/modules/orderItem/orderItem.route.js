// Router
import express from 'express';
import {
  getAllOrderItems,
  getOrderItemReport,
} from './orderItem.controller.js';

const router = express.Router();

router.get('/', getAllOrderItems);
router.get('/report', getOrderItemReport);

export { router };
