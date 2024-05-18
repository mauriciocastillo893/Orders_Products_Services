export class OrderProducts{
    constructor(
        // private readonly id: string,
        readonly order_id: string,
        readonly product_id: string,
        readonly price: number,
        readonly quantity: number,
    ){}
}