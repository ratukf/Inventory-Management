// Create product validation
const validateCreateProduct = (data) => {
  const { name, price, stock } = data;

  if (!name || typeof name !== string) {
    throw new Error('Product name is required');
  }

  if (price == null || typeof price !== 'number' || price < 0) {
    throw new Error('Price must be a positive number');
  }

  if (stock == null || typeof stock !== 'number' || stock < 0) {
    throw new Error('Stock must be a positive number');
  }
};

// Update product validation
const validateUpdateProduct = (data) => {
  const { name, price, stock } = data;

  if (price !== undefined && (typeof price !== 'number' || data.price < 0)) {
    throw new Error('Price must be a positive number');
  }

  if (stock !== undefined && (typeof data.stock !== 'number' || stock < 0)) {
    throw new Error('Stock must be a positive number');
  }
};

module.exports = { validateCreateProduct, validateUpdateProduct };
