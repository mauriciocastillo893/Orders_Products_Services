import signale from "signale";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";

export class GetAllOrdersUseCase {
    constructor(private readonly orderRepository: OrderRepository){}

    async run(){
        const result = await this.orderRepository.getAllOrders();

        if (!result) 
            signale.error("No orders found");

        return result;
    }
}