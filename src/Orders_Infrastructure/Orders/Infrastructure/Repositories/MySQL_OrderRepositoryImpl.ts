import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Order, OrderStatus } from "../../Domain/Entities/Order";
import { OrderRepository } from "../../Domain/Port/OrderRepository";
import { setMySqlConnection } from "../../../Databases/MySqlDB";
import signale from "signale";
import { createTableOrder } from "../Services/CreateTableMySQL";

export class MYSQL_OrderRepositoryImpl implements OrderRepository {
    private myDatabaseConnection: Connection | null;

    constructor(){
        this.myDatabaseConnection = null; // Initialize the property with null
        this.turnOnMySQLConnection().then(connection => {
            this.myDatabaseConnection = connection;
            this.verifyTableExists();
        });
    }

    private async turnOnMySQLConnection(){
        return await setMySqlConnection({database: 'orders_service'});
    }

    private async verifyTableExists(){
        if(!this.myDatabaseConnection){
            signale.error("MySQL connection is not available.");
            return Promise.reject("MySQL connection is not available.");
        }
        createTableOrder("orders", this.myDatabaseConnection);
    }

    async getOrderByID(id: string): Promise<Order> {
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query(`SELECT * FROM orders WHERE id = ${id}`, (err, results) => {
                    if (err) {
                        signale.error("It was not found an Order by the ID given", err);
                        reject(err);
                    } else {
                        if (Array.isArray(results) && results.length === 0) {
                            reject("No se encontró ningún pedido con el ID proporcionado.");
                        } else {
                            console.log(results);
                            resolve(new Order("1", 100, new Date(), OrderStatus.Created));
                        }
                    }
                });
            } else {
                reject(new Error("Database connection is not available."));
            }
        });
    }
    getAllOrders(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    createOrder(_order: Order): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    updateOrder(_id: string, _order: Order): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    deleteOrder(_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}