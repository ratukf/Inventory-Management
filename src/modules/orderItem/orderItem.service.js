import prisma from '../../lib/prisma.js';

// Fetch all order items
const getAllOrderItemsService = async () => {
  return prisma.orderItem.findMany({
    include: {
      order: true,
      product: true,
    },
    orderBy: { id: 'asc' },
  });
};

// Fetch items' report
const getOrderItemReportService = async () => {
  // Fetch all order item
  const items = await prisma.orderItem.findMany({
    include: { product: true },
  });

  // Calculate quantity total & revenue total per product
  const reportMap = {};
  items.forEach((item) => {
    const id = item.productId;
    if (!reportMap[id]) {
      reportMap[id] = {
        productId: id,
        productName: item.product.name,
        totalQuantity: 0,
        totalRevenue: 0,
      };
    }

    reportMap[id].totalQuantity += item.quantity;
    reportMap[id].totalRevenue += Number(item.price) * item.quantity;
  });

  return Object.values(reportMap);
};

export { getAllOrderItemsService, getOrderItemReportService };
