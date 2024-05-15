export class OrderProducts{
    constructor(
        readonly id: string,
        readonly product_id: string,
        readonly price: number,
        readonly quantity: number,
    ){}
}