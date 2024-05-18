import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Order, OrderStatus } from "../../../Domain/Entities/Order";
import { OrderRepository } from "../../../Domain/Port/OrderRepository";
import { setMySqlConnection } from "../../../../Databases/MySqlDB";
import signale from "signale";
import { createOrderTable } from "../../Services/CreateOrdersTableMySQL";

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
        createOrderTable("orders", this.myDatabaseConnection);
    }

    async getOrderByID(id: string): Promise<Order> {
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query(`SELECT * FROM orders WHERE id = ${id}`, (err, results) => {
                    if (err) {
                        signale.error("It was not found an Order by the ID given.", err);
                        reject(err);
                    } else {
                        if (Array.isArray(results) && results.length === 0) {
                            reject("\n\t     It was not found an Order by the ID given.");
                        } else {
                            const resultsArray = results as { id: number, total: number, date: string, status_product: OrderStatus }[];
                            const result = resultsArray[0];
                            const order = new Order(
                                result.total,
                                result.date,
                                result.status_product,
                                result.id.toString(),
                            );
                            resolve(order);
                        }
                    }
                });
            } else {
                signale.error("Database connection is not available.");
                reject(new Error("Database connection is not available."));
            }
        });
    }
    getAllOrders(): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query("SELECT * FROM orders", (err, results) => {
                    if (err) {
                        signale.error("An error occurred while trying to get all orders.", err);
                        reject(err);
                    } else {
                        const resultsArray = results as { id: number, total: number, date: string, status_product: OrderStatus }[];
                        const orders = resultsArray.map(result => {
                            return new Order(
                                result.total,
                                result.date,
                                result.status_product,
                                result.id.toString(),
                            );
                        });
                        resolve(orders);
                    }
                });
            } else {
                signale.error("Database connection is not available.");
                reject(new Error("Database connection is not available."));
            }
        });
    }
    createOrder(order: Order): Promise<Order | null> {
        console.log("Data to be inserted: ", order)
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query(`INSERT INTO orders (total, date, status_product) VALUES (${order.total_amount}, '${order.created_at}', '${order.status}')`, (err) => {
                    if (err) {
                        signale.error("An error occurred while trying to create an order.", err);
                        reject(err);
                    } else {
                        resolve(order);
                    }
                });
            } else {
                signale.error("Database connection is not available.");
                reject(new Error("Database connection is not available."));
            }
        });
    }
    updateOrder(id: string, orderStatus: OrderStatus): Promise<Order | null> {
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query(`UPDATE orders SET status_product = '${orderStatus}' WHERE id = ${id}`, (err) => {
                    if (err) {
                        signale.error("An error occurred while trying to update an order.", err);
                        reject(err);
                    } else {
                        this.getOrderByID(id).then(order => {
                            resolve(order);
                        }).catch(err => {
                            reject(err);
                        });
                    }
                });
            } else {
                signale.error("Database connection is not available.");
                reject(new Error("Database connection is not available."));
            }
        
        }); 
    }
    deleteOrder(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.myDatabaseConnection) {
                this.myDatabaseConnection.query(`DELETE FROM orders WHERE id = ${id}`, (err) => {
                    if (err) {
                        signale.error("An error occurred while trying to delete an order.", err);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                signale.error("Database connection is not available.");
                reject(new Error("Database connection is not available."));
            }
        });
    }

}