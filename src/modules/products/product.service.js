// Services
import prisma from '../../lib/prisma.js';

// Post
const createProductService = async (data) => {
  return prisma.product.create({ data });
};

// Fetch all
const getAllProductsService = async () => {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
};

// Fetch one
const getProductByIdService = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return product;
};

// Patch
const updateProductService = async (id, data) => {
  await getProductByIdService(id);

  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
};

// Delete
const deleteProductService = async (id) => {
  await getProductByIdService(id);
  return prisma.product.delete({
    where: { id: Number(id) },
  });
};

export {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
