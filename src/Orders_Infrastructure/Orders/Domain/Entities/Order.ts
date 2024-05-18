export class Order {
    constructor(
        readonly total_amount: number,
        readonly created_at: string,
        readonly status: OrderStatus,
        readonly id?: string,
    ){
        // this.created_at = new Date(created_at.toLocaleDateString("en-US"));
    }
}

export enum OrderStatus {
    "Paid", "Created", "Delivered"
}