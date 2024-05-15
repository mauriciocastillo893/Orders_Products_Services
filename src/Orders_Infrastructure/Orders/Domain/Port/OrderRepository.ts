import { Order } from "../Entities/Order";

export interface OrderRepository {
    getOrderByID(id: string): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    createOrder(order: Order): Promise<Order | null>;
    updateOrder(id: string, order: Order): Promise<Order | null>;
    deleteOrder(id: string): Promise<boolean>;
}