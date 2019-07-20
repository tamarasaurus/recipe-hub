import * as pg from 'pg';
import query from './query';

query(
  `
  CREATE TABLE IF NOT EXISTS
  recipe (
    id SERIAL UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    duration INTEGER,
    ingredients JSON,
    portions INTEGER,
    imageurl TEXT,
    url TEXT NOT NULL UNIQUE,
    created timestamp NOT NULL DEFAULT current_timestamp,
    updated timestamp NOT NULL DEFAULT current_timestamp,
    categories TEXT,
    calories INTEGER,
    source TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS
  auth_user (
    id SERIAL UNIQUE PRIMARY KEY NOT NULL,
    auth_id TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS
  auth_user_recipe (
    recipe_id INTEGER UNIQUE references recipe(id),
    user_id INTEGER references auth_user(id),
    liked BOOLEAN DEFAULT FALSE NOT NULL,
    excluded BOOLEAN DEFAULT FALSE NOT NULL,
    saved BOOLEAN DEFAULT FALSE NOT NULL,
    primary key(recipe_id, user_id)
  );
  `, [])
  .then((recipes: pg.QueryResult) => {
    console.log('Finished setting up database \n', recipes);
  })
  .catch((error: Error) => {
    console.error('Error setting up database table \n', error);
  });

export default query;
