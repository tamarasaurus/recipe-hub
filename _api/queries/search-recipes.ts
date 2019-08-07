import query from '../query';
import { SearchQuery } from './types';

const allowedSortTypes = { complexity: 'r.complexity' };
const allowedOrderDirections = ['asc', 'desc'];

export default async function searchRecipes(searchQuery: SearchQuery) {
  const { keywords, offset, source, sort, order } = searchQuery;
  const sortType = allowedSortTypes[sort] || 'created';
  const sortOrder = allowedOrderDirections.includes(order) ? order : 'desc';

  const { rows } = await query(`
    SELECT
      r.id,
      r.name,
      r.duration,
      r.ingredients,
      r.portions,
      r.imageurl,
      r.url,
      r.created,
      r.updated,
      r.categories,
      r.source,
      r.complexity
    FROM (
      SELECT *,
      json_array_length(recipe.ingredients) as complexity,
      array_to_string(array((
        SELECT json_agg(list->'label')
        FROM json_array_elements(recipe.ingredients)
        AS list
      )), '|') AS labels
      FROM recipe
    ) AS r
    WHERE name IS NOT NULL
    AND source LIKE $1
    AND unaccent(lower(r.name)) LIKE unaccent(lower($3))
    OR unaccent(lower(r.labels)) LIKE unaccent(lower($3))
    OR unaccent(lower(r.categories)) LIKE unaccent(lower($3))
    ORDER BY ${sortType} ${sortOrder}
    LIMIT 24
    OFFSET $2
  `, [
    `%${source || ''}%`,
    offset || 0,
    `%${keywords.trim()}%`
  ]);

  return rows;
}
