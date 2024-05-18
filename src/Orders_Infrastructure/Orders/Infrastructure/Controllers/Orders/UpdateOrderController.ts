import { UpdateOrderUseCase } from "../../../Application/UseCases/Order/UpdateOrderUseCase";
import { Request, Response } from 'express';

export class UpdateOrderController {
    constructor(private updateOrderUseCase : UpdateOrderUseCase){}

    async run(req: Request, res: Response) {
        try{        
            if (req.body.status !== "Paid" && req.body.status !== "Created" && req.body.status !== "Delivered") {
                return res.status(400).json({message: `Invalid status, please provide: Paid, Created or Delivered`});
            }
            await this.updateOrderUseCase.run(req.params.id, req.body.status);
            return res.status(200).json({message: `Order status with id ${req.params.id} updated successfully.`, data: {status: req.body.status}});

        }catch(err){
            if (err instanceof Error) {
                return res.status(500).json({ message: err.message });
            } else {
                return res.status(500).json({ message: "An unknown error occurred." });
            }

        }
    }
}