import signale from "signale";
import { OrderProductsRepository } from "../../../Domain/Port/OrderProductsRepository";

export class DeleteOrderProductsByOrderIDUseCase{
    constructor(private readonly orderProductsRepository: OrderProductsRepository) {}

    async run(orderID: string): Promise<void> {
        const result = this.orderProductsRepository.deleteOrderProductsByOrderID(orderID)

        if(!result){
            signale.error("Error deleting order products")
        }

        return result;
    }
}