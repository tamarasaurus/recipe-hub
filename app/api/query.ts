import * as pg from 'pg';

const enableSSL = process.env.ENABLE_DATABASE_SSL === '1';

console.log('Enable SSL', process.env.ENABLE_DATABASE_SSL, enableSSL);

const poolConfig: any = {
  connectionString: process.env.POSTGRES_HOST,
  ssl: enableSSL,
  max: 20,
  min: 4,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  client_encoding: 'utf8',
};

const pool = new pg.Pool(poolConfig);

const query = (text: string, values: any[]) => {
  return pool.query(text, values);
};

export default query;
