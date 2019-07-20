import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
}

export default async function searchRecipes(searchQuery: SearchQuery) {
  const { ids, keywords, offset, source, sort } = searchQuery;

  let filters = '';
  if (ids !== undefined) {
    filters = `AND id IN (${ids})`;
  }

  if (source !== undefined && source.trim().length > 0) {
    filters += `AND source LIKE '${source}'`;
  }

  const sortByDate = 'ORDER BY created DESC';
  let sortQuery = sortByDate;

  if (sort === 'complexity') {
    sortQuery = 'ORDER BY complexity DESC';
  }

  let searchFilters = '';
  if (keywords !== undefined && keywords.trim().length > 0) {
    searchFilters = `AND (
      to_tsvector('english', COALESCE(name, ''))      ||
      to_tsvector('english', ingredients::json)       ||
      to_tsvector('english', COALESCE(categories, ''))
    ) @@ phraseto_tsquery('english', '%${keywords}%')
      OR name LIKE '${keywords}'
    `;
  }

  const { rows } = await query(`
    SELECT *,
    json_array_length(recipe.ingredients) as complexity
    FROM recipe
    WHERE recipe.name IS NOT NULL
    ${filters}
    ${searchFilters}
    ${sortQuery}
    LIMIT 24
    OFFSET $1
  `, [
    (offset || 0),
  ]);

  return rows;
}
