import { createPool } from 'mysql2';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } from '$env/static/private';

const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    maxIdle: 100, 
    idleTimeout: 600000,
    queueLimit: 0
});
export function accessPool() {
    return pool.promise();
} 