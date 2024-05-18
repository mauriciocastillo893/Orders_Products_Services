import signale from "signale";
import { OrderProductsRepository } from "../../../Domain/Port/OrderProductsRepository";

export class GetAllOrderProductsUseCase {
    constructor(private readonly orderProductsRepository: OrderProductsRepository) {}

    async run() {
        const result = this.orderProductsRepository.getAllOrderProducts();

        if(!result)
            signale.error("No order with products were found");

        return result;
    }
}