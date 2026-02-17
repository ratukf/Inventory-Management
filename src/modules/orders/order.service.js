import prisma from '../../lib/prisma.js';

// POST
const createOrderService = async (items) => {
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return prisma.order.create({
    data: {
      totalPrice,
      orderItems: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { orderItems: true },
  });
};

// Fetch
const getAllOrdersService = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { orderItems: true },
  });
};

// Fetch one order
const getOrderByIdService = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });

  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }

  return order;
};

export { createOrderService, getAllOrdersService, getOrderByIdService };
