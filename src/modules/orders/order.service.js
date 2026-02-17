import prisma from '../../lib/prisma.js';

// POST
const createOrderService = async (items) => {
  return prisma.$transaction(async (tx) => {
    // Get all products ordered
    const productIds = items.map((i) => i.productId);
    const products = await tx.product.findMany({
      where: { id: { in: productIds } },
    });

    // Check stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (item.quantity > product.stock) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }
    }

    // Calculate total price
    const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

    // Create order
    const order = await tx.order.create({
      data: {
        totalPrice,
        orderItems: {
          create: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          })),
        },
      },
      include: { orderItems: true },
    });

    // Reduce stock for each products ordered
    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }
    return order;
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
