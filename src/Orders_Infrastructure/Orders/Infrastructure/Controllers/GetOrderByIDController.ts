import signale from "signale";
import { Request, Response } from 'express';
import { GetOrderByIDUseCase } from "../../Application/UseCases/Order/GetOrderByIDUseCase";
import { OrderNotFound } from "../Services/OrderNotFound";

export class GetOrderByIDController{
    constructor(private getOrderByIDUseCase : GetOrderByIDUseCase){}

    async run(req: Request, res: Response) {
        try{        
            const order = await this.getOrderByIDUseCase.run(req.params.id);
            return res.status(200).send(order);

        }catch(err){
            signale.error("An error occurred while trying to get an Order by ID", err);
            if(err instanceof OrderNotFound) {
                return res.status(404).send();
            }
            return res.status(500).send();
        }
    }
}