import { createConnection } from 'mysql2';

const connection = createConnection({
    host: "containers-us-west-35.railway.app",
    port: "6058",
    user: "root",
    password: "wx8vG4YqewXLCoxFTLZ5",
    database: "railway",
});
    
let name = '';
connection.query(
    'SELECT * FROM `coaches` WHERE `coach_id` = ?',
    [1],
    function(err, results) {
        name = (results[0].name);
    }
);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        name: name,
    }
};
