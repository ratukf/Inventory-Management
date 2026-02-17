import {
  getAllOrderItemsService,
  getOrderItemReportService,
} from './orderItem.service.js';

// Fetch all order items
const getAllOrderItems = async (req, res, next) => {
  try {
    const items = await getAllOrderItemsService();
    res.json({ status: 'success', data: items });
  } catch (error) {
    next(error);
  }
};

// Fetch items' sales
const getOrderItemReport = async (req, res, next) => {
  try {
    const report = await getOrderItemReportService();
    res.json({ status: 'success', data: report });
  } catch (error) {
    next(error);
  }
};

export { getAllOrderItems, getOrderItemReport };
