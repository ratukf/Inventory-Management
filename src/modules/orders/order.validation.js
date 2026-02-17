// Create order validation
const validateCreateOrder = (data) => {
  const { items } = data;

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must have at least one item');
  }

  items.forEach((item, index) => {
    const { productId, quantity, price } = item;

    if (!productId || typeof productId !== 'string') {
      throw new Error(`Item[${index}]: productId is required`);
    }

    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
      throw new Error(`Item[${index}]: quantity must be a positive number`);
    }

    if (!price || typeof price !== 'number' || price < 0) {
      throw new Error(`Item[${index}]: price must be a positive number`);
    }
  });
};

export { validateCreateOrder };
