import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
}

const allowedSortTypes = {
  difficulty: 'complexity',
}

export default async function searchRecipes(searchQuery: SearchQuery) {
  const { ids, keywords, offset, source, sort } = searchQuery;
  const sortType = allowedSortTypes[sort] || 'created';

  let filters = '';
  if (ids !== undefined) {
    filters = `AND id IN (${ids})`;
  }

  if (source !== undefined && source.trim().length > 0) {
    filters += `AND source LIKE '${source}'`;
  }

  let searchFilters = '';
  if (keywords !== undefined && keywords.trim().length > 0) {
    searchFilters = `
      AND unaccent(lower(r.name)) ILIKE unaccent(lower('%${keywords.trim()}%'))
      OR unaccent(lower(r.labels)) ILIKE unaccent(lower('%${keywords.trim()}%'))
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
    WHERE r.name IS NOT NULL
    ${filters}
    ${searchFilters}
    ORDER BY $1 DESC
    LIMIT 24
    OFFSET $2
  `, [
    sortType,
    (offset || 0),
  ]);

  return rows;
}
