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
  // Group by productId and calculate the quantities and revenues
  const grouped = await prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
      price: true,
    },
  });

  // Fetch product data for each productId
  const report = await Promise.all(
    grouped.map(async (g) => {
      const product = await prisma.product.findUnique({
        where: { id: g.productId },
      });

      return {
        productId: g.productId,
        productName: product?.name || null,
        totalQuantity: g._sum.quantity,
        totalRevenue: g._sum.price,
      };
    }),
  );

  return report;
};

export { getAllOrderItemsService, getOrderItemReportService };
