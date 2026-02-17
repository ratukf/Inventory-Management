// Router
import express from 'express';
import {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from './product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.patch('/:id', updateProduct);

export { router };
