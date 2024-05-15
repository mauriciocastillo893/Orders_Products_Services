import signale from "signale";
import { Order } from "../../../Domain/Entities/Order";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";

export class CreateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async run(order: Order){
        const result = await this.orderRepository.createOrder(order);

        if (!result) 
            signale.error("Order not created");

        return result;
    }
}