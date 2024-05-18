import signale from "signale";
import { OrderProductsRepository } from "../../../Domain/Port/OrderProductsRepository";

export class GetOrderProductsByOrderIDUseCase {
    constructor(private readonly orderProductsRepository: OrderProductsRepository) {}

    async run(orderID: string) {
        const result = this.orderProductsRepository.getOrderProductsByOrderID(orderID);

        if(!result)
            signale.error("No order with products were found");

        return result;
    }
}