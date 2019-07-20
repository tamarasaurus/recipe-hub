import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
  order?: string;
}

const allowedSortTypes = {
  complexity: 'r.complexity',
};

export default async function searchRecipes(searchQuery: SearchQuery) {
  const { ids, keywords, offset, source, sort, order } = searchQuery;
  const sortType = allowedSortTypes[sort] || 'created';
  const sortOrder = order || 'desc';

  let searchFilters = '';
  if (keywords !== undefined && keywords.trim().length > 0) {
    searchFilters = `
      AND unaccent(lower(r.name)) LIKE unaccent(lower('%${keywords.trim()}%'))
      OR unaccent(lower(r.labels)) LIKE unaccent(lower('%${keywords.trim()}%'))
    `;
  }

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
    ${ids ? `AND r.id IN (${ids})` : ''}
    ${searchFilters}
    ORDER BY ${sortType} ${sortOrder}
    LIMIT 24
    OFFSET $2
  `, [
    `%${source || ''}%`,
    offset || 0,
  ]);

  return rows;
}
