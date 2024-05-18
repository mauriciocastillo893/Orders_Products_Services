import { Request, Response } from 'express';
import { GetOrderByIDUseCase } from "../../../Application/UseCases/Order/GetOrderByIDUseCase";
import { OrderNotFound } from "../../Services/OrderNotFound";

export class GetOrderByIDController{
    constructor(private getOrderByIDUseCase : GetOrderByIDUseCase){}

    async run(req: Request, res: Response) {
        try{        
            const order = await this.getOrderByIDUseCase.run(req.params.id);
            return res.status(200).send(order);

        }catch(err){
            if(err instanceof OrderNotFound) {
                return res.status(404).json({message: `Order with id ${req.params.id} not found`});
            }
            return res.status(500).json({message: `Error getting order with id ${req.params.id}`});
        }
    }
}