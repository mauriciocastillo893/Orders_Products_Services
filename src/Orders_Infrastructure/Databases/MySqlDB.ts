import mysql, { Connection, ConnectionOptions } from 'mysql2';
import signale from "signale";
import 'dotenv/config'

const access: ConnectionOptions  = {
    host: process.env.HOST_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    connectionLimit: 3,
};

let conn = mysql.createConnection(access);


export async function setMySqlConnection(options: MySqlOptions) : Promise<Connection>{
    await createDataBase(options);
    const newConnection = await setConnection(options);
    return newConnection;
}

async function createDataBase(options: MySqlOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        conn.query(`CREATE DATABASE IF NOT EXISTS ${options.database}`, (err, _result) => {
            if (err) {
                signale.error(`Error creating database ${options.database}: ${err.message}`);
                reject(err);
            } else {
                signale.success(`Database checked: ${options.database}`);
                conn.end(); // Cerrar conexión
                resolve();
            }
        });
    });
}


async function setConnection(options: MySqlOptions): Promise<Connection>{
    signale.success(`Connection established succesfully to "${options.database}" database`)
    conn = mysql.createConnection({
        host: process.env.HOST_MYSQL,
        user: process.env.USER_MYSQL,
        password: process.env.PASSWORD_MYSQL,
        database: options.database,
        connectionLimit: 3,
    });
    return conn;
}

interface MySqlOptions {
    database: string;
}

conn.on('release', () => {
    signale.success('Connection closed successfully [RELEASE EVENT]');
});

conn.on('end', () => {
    signale.success('Connection closed successfully [END EVENT]');
});

conn.on('error', (err) => {
    signale.error('Connection closed with error:', err);
});

// npm install mysql2
// npm install --save-dev @types/node