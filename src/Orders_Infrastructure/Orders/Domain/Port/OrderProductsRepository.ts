import { OrderProducts } from "../Entities/OrderProducts";

export interface OrderProductsRepository {
    getOrderProductsByOrderID(id: string): Promise<OrderProducts>;
    getAllOrderProducts(): Promise<OrderProducts[]>;
    createOrderProductsByOrderID(orderID: string, orderProduct: OrderProducts): Promise<OrderProducts | null>;
    updateOrderProductsByOrderID(id: string, orderProduct: OrderProducts): Promise<OrderProducts | null>;
    deleteOrderProductsByOrderID(id: string): Promise<void>;
}