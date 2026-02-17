// Controller
import { validateCreateProduct } from './product.validation.js';
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
} from './product.service.js';

// FETCH
const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// FETCH BY ID
const getOneProduct = async (req, res, next) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST
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

export { getAllProducts, createProduct, getOneProduct };
