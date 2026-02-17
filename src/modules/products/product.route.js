// Router
import express from 'express';
import { createProduct, getAllProducts } from './product.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);

export { router };
