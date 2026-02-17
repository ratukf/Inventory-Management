// Controller
import { validateCreateProduct } from './product.validation.js';
import { createProductService } from './product.service.js';

const createProduct = async (req, res, next) => {
  try {
    validateCreateProduct(req.body);
    const product = await createProductService(req.body);
    res.status(201).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export { createProduct };
