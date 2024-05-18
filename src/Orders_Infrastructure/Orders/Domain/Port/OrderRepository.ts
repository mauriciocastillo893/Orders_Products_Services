import { Order, OrderStatus } from "../Entities/Order";

export interface OrderRepository {
    getOrderByID(id: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    createOrder(order: Order): Promise<Order | null>;
    updateOrder(id: string, orderStatus: OrderStatus): Promise<Order | null>;
    deleteOrder(id: string): Promise<boolean>;
}