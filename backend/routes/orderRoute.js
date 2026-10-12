import express from 'express';
import { placeOrder, placeOrderCOD, verifyOrder, userOrders, listOrders, updateStatus, removeOrder, cancelOrder } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/cod', authMiddleware, placeOrderCOD);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);
orderRouter.post('/remove', removeOrder);
orderRouter.post('/cancel', authMiddleware, cancelOrder);

export default orderRouter;
