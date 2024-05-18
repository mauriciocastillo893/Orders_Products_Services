import { Connection } from "mysql2/typings/mysql/lib/Connection";
import signale from "signale";

export async function createOrderTable(tableName: string, MySQLConnection: Connection) : Promise<void>{
    if(!MySQLConnection){
        signale.error("MySQL connection is not available.");
        return Promise.reject("MySQL connection is not available.");
    }
    if(!tableName){
        signale.error("Table name is not available.");
        return Promise.reject("Table name is not available.");
    }
    MySQLConnection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, total VARCHAR(255), date VARCHAR(255), status_product VARCHAR(255))`, (err, _results) => {
        if(err){
            signale.error("An error occurred while trying to create the table");
            return Promise.reject(err);
        }else{
            signale.success(`Table "orders" was verified successfully`);
            return Promise.resolve();
        }
    });
}
