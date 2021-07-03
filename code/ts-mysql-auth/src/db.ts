import dotenv from 'dotenv';
dotenv.config();
import mysql, { QueryOptions } from 'mysql2';
import util from 'util';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// create the connection
// query database

const query = util.promisify(pool.query).bind(pool);

export async function queryDB(q: QueryOptions): Promise<unknown> {
  let result;
  try {
    result = await query(q);
  } catch (err) {
    console.log('ERROR OCCURED');
    console.log(err);
  }
  return result;
}

export function closePool(): void {
  pool.end();
}
