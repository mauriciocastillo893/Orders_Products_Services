import { GetAllOrdersUseCase } from "../../../Application/UseCases/Order/GetAllOrdersUseCase";
import { Request, Response } from 'express';

export class GetAllOrdersController{
    constructor(private getAllOrdersUseCase : GetAllOrdersUseCase){}

    async run(_req: Request, res: Response) {
        try{        
            const orders = await this.getAllOrdersUseCase.run();
            return res.status(200).send(orders);

        }catch(err){
            return res.status(500).json({message: `Error getting orders`});
        }
    }
}