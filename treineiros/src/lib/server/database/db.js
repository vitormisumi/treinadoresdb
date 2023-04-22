import { createPool } from 'mysql2';
import { DATABASE_URL } from '$env/static/private';

const pool = createPool(DATABASE_URL);
export function accessPool() {
    return pool.promise();
} 
