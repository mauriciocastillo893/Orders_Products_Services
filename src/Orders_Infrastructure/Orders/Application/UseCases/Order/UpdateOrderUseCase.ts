import signale from "signale";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";
import { OrderStatus } from "../../../Domain/Entities/Order";

export class UpdateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async run(orderID: string, orderStatus: OrderStatus){
        const result = await this.orderRepository.updateOrder(orderID, orderStatus);

        if (!result)
            signale.error(`Order with ID ${orderID} not found`);

        return result;
    }
}   