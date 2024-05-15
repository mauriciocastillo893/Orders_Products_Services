export class Order {
    constructor(
        readonly id: string,
        readonly total_amount: number,
        readonly created_at: Date,
        readonly status: OrderStatus,
    ){}
}

export enum OrderStatus {
    "Paid", "Created", "Delivered"
}