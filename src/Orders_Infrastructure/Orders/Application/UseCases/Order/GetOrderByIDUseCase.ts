import signale from "signale";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";

export class GetOrderByIDUseCase {
    constructor (private readonly orderRepository: OrderRepository) {}

    async run(orderID: string){
        const result = await this.orderRepository.getOrderByID(orderID);

        if (!result)
            signale.error(`Order with ID ${orderID} not found`);

        return result;
    }
}