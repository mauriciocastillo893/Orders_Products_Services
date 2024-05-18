import signale from "signale";
import { OrderProducts } from "../../../Domain/Entities/OrderProducts";
import { OrderProductsRepository } from "../../../Domain/Port/OrderProductsRepository";

export class UpdateOrderProductsByOrderIDUseCase{
    constructor(private readonly orderProductsRepository: OrderProductsRepository) {}

    async run(orderID: string, orderProducts: OrderProducts): Promise<OrderProducts | null> {
        const result = this.orderProductsRepository.updateOrderProductsByOrderID(orderID, orderProducts)

        if(!result){
            signale.error("Error updating order products")
            return null;
        }

        return result;
    }
}