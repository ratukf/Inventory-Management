// Services
import prisma from '../../lib/prisma';

// Post
const createProduct = async (data) => {
  return prisma.product.create({ data });
};

// Fetch all
const getAllProducts = async () => {
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
};

// Fetch one
const getProductById = async (id) => {
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
const updateProduct = async (id, data) => {
  await getProductById(id);

  return prisma.product.update({
    where: { id: Number(id) },
    data,
  });
};

// Delete
const deleteProduct = async (id) => {
  await getProductById(id);
  return prisma.product.delete({
    where: { id: Number(id) },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
