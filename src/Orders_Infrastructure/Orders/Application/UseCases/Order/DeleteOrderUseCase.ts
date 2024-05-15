import signale from "signale";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";

export class DeleteOrderUserCase {
    constructor(private readonly orderRepository: OrderRepository) {}

    async run(orderID: string){
        const result = await this.orderRepository.deleteOrder(orderID);

        if (!result)
            signale.error(`Order with ID ${orderID} was not deleted`);

        return result;
    }
}