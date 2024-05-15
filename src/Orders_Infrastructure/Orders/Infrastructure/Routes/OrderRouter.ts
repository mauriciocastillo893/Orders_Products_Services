import express from 'express';
import { getOrderByIDController } from '../dependencies';

export const orderRouter = express.Router();

orderRouter.get('/:id', getOrderByIDController.run.bind(getOrderByIDController));

