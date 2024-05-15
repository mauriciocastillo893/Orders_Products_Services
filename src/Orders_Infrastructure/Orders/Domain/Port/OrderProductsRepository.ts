import { OrderProducts } from "../Entities/OrderProducts";

export interface OrderProductsRepository {
    getOrderProductByID(id: string): Promise<OrderProducts>;
    getAllOrderProducts(): Promise<OrderProducts[]>;
    createOrderProduct(orderProduct: OrderProducts): Promise<OrderProducts | null>;
    updateOrderProduct(id: string): Promise<OrderProducts | null>;
    deleteOrderProduct(id: string): Promise<void>;
}