import * as pg from 'pg'
import query from './query';

query(
  `CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL,
      name TEXT NOT NULL,
      duration INTEGER,
      ingredients json,
      portions INTEGER,
      imageUrl TEXT,
      url TEXT PRIMARY KEY,
      created timestamp NOT NULL DEFAULT current_timestamp,
      updated timestamp NOT NULL DEFAULT current_timestamp,
      categories TEXT,
      calories INTEGER
    )`, [])
  .then((recipes: pg.QueryResult) => {
    console.log('Finished setting up database \n', recipes)
  })
  .catch((error: Error) => {
    console.error('Error setting up database table \n', error)
  })

export default query;