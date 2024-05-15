export class OrderNotFound extends Error{
    constructor(id: string){
        super(`Order with ID ${id} was not found`);
    }
}