import { OrderProducts } from "../../../Domain/Entities/OrderProducts";
import { OrderProductsRepository } from "../../../Domain/Port/OrderProductsRepository";
import signale from "signale";

export class CreateOrderProductsByOrderIDUserCase{
    constructor(private readonly orderProductsRepository: OrderProductsRepository) {}

    async run(orderID: string, orderProducts: OrderProducts): Promise<OrderProducts | null> {
        const result = this.orderProductsRepository.createOrderProductsByOrderID(orderID, orderProducts)

        if(!result){
            signale.error("Error creating order products")
            return null;
        }

        return result;
    }
}