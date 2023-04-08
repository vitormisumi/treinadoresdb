import { redirect } from '@sveltejs/kit';
import { createConnection } from 'mysql2';
import { DB_HOST } from '$env/static/private';
import { DB_PORT } from '$env/static/private';
import { DB_USER } from '$env/static/private';
import { DB_PASSWORD } from '$env/static/private';
import { DATABASE } from '$env/static/private';

export function load() {
    throw redirect(301, '/home');
}

// create the connection to database
const connection = createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE
});

// simple query
connection.query(
  'SELECT * FROM `coaches`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
connection.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function(err, results) {
    console.log(results);
  }
);