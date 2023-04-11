import { redirect } from '@sveltejs/kit';
import { createConnection } from 'mysql2';

export function load() {
    throw redirect(301, '/home');
}

// create the connection to database
const connection = createConnection({
  host: "containers-us-west-35.railway.app",
  port: "6058",
  user: "root",
  password: "wx8vG4YqewXLCoxFTLZ5",
  database: "railway",
});

// with placeholder
connection.query(
  'SELECT * FROM `coaches` WHERE coach_id = 1',
  function(err, results) {
      console.log(results);
  }
);