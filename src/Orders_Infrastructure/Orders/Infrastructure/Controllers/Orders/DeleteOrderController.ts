import { Request, Response } from 'express';
import { DeleteOrderUserCase } from '../../../Application/UseCases/Order/DeleteOrderUseCase';

export class DeleteOrderController{
    constructor(private deleteOrderUseCase : DeleteOrderUserCase){}

    async run(req: Request, res: Response) {
        try{        
            await this.deleteOrderUseCase.run(req.params.id);
            return res.status(200).json({message: `Order with id ${req.params.id} deleted successfully`});

        }catch(err){
            return res.status(500).json({message: `Error deleting order with id ${req.params.id}`});
        }
    }
}