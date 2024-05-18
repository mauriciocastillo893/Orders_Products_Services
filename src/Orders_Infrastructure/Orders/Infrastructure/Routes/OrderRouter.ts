import express from 'express';
import { createOrderController, deleteOrderController, getAllOrdersController, getOrderByIDController, updateOrderController } from '../dependencies';

export const orderRouter = express.Router();

orderRouter.get('/', getAllOrdersController.run.bind(getAllOrdersController));
orderRouter.get('/:id', getOrderByIDController.run.bind(getOrderByIDController));
orderRouter.post('/', createOrderController.run.bind(createOrderController));
orderRouter.put('/:id', updateOrderController.run.bind(updateOrderController));
orderRouter.delete('/:id', deleteOrderController.run.bind(deleteOrderController));

