import { CreateOrderUseCase } from "../../../Application/UseCases/Order/CreateOrderUseCase";
import { Request, Response } from 'express';
import { Order } from "../../../Domain/Entities/Order";

export class CreateOrderController{
    constructor(private readonly createOrderUseCase: CreateOrderUseCase){}

    async run(req: Request, res: Response) {
        try{
            if (!req.body.created_at || !req.body.total_amount || !req.body.status) {
                return res.status(400).json({message: `Missing fields, please provide: id, created_at, total_amount and status`});
            }
            if (req.body.status !== "Paid" && req.body.status !== "Created" && req.body.status !== "Delivered") {
                return res.status(400).json({message: `Invalid status, please provide: Paid, Created or Delivered`});
            }
            const order : Order = {
                // id: req.body.id,
                created_at: req.body.created_at,
                total_amount: req.body.total_amount,
                status: req.body.status
            }
            await this.createOrderUseCase.run(order);
            return res.status(201).json({message: `Order created successfully.`, data: {created_at: req.body.created_at, total_amount: req.body.total_amount, status: req.body.status}});
        }catch(err){
            return res.status(500).json({message: `Error creating order with id ${req.body.id}`});
        }
    }
}