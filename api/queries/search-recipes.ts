import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
}

const allowedSortTypes = {
  difficulty: 'complexity'
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
    ORDER BY $1 DESC
    LIMIT 24
    OFFSET $2
  `, [
    sortType,
    (offset || 0),
  ]);

  return rows;
}
