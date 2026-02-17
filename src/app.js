import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { router as productRouter } from './modules/products/product.route.js';
import { router as orderRouter } from './modules/orders/order.route.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

// Error handler harus paling bawah
app.use(errorHandler);

export default app;
