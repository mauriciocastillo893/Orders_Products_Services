import signale from "signale";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";
import { Order } from "../../../Domain/Entities/Order";

export class UpdateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async run(orderID: string, order: Order){
        const result = await this.orderRepository.updateOrder(orderID, order);

        if (!result)
            signale.error(`Order with ID ${orderID} not found`);

        return result;
    }
}   