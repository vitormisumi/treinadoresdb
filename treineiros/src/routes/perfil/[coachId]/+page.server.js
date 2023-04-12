import { createPool } from 'mysql2';
// import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DATABASE } from '$env/static/private';

async function getCoach(query) {
    const pool = createPool({
    host: "containers-us-west-35.railway.app",
    port: "6058",
    user: "root",
    password: "wx8vG4YqewXLCoxFTLZ5",
    database: "railway",
    });
    const promisePool = pool.promise();
    const [rows, fields] = await promisePool.query("SELECT * FROM coaches WHERE coach_id = ?", [query]);
    console.log(rows[0]);
    return rows[0];
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        coach: getCoach(params.coachId),
    };
};