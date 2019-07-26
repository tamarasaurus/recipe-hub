import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
  order?: string;
  liked?: number;
}

const allowedSortTypes = {
  complexity: 'r.complexity',
};

export default async function searchRecipes(searchQuery: SearchQuery, userId: string) {
  const { ids, keywords, offset, source, sort, order, liked } = searchQuery;
  const sortType = allowedSortTypes[sort] || 'created';
  const sortOrder = order || 'desc';

  let searchFilters = '';
  if (keywords !== undefined && keywords.trim().length > 0) {
    searchFilters = `
      AND unaccent(lower(r.name)) LIKE unaccent(lower('%${keywords.trim()}%'))
      OR unaccent(lower(r.labels)) LIKE unaccent(lower('%${keywords.trim()}%'))
      OR unaccent(lower(r.categories)) LIKE unaccent(lower('%${keywords.trim()}%'))
    `;
  }

  const likedFilter = liked == 1 ? 'WHERE auth_user_recipe.liked = TRUE' : '';

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
      r.complexity,
      COALESCE(r.liked, false) as liked,
      COALESCE(r.excluded, false) as excluded,
      COALESCE(r.saved, false) as saved
    FROM (
      SELECT *,
      json_array_length(recipe.ingredients) as complexity,
      array_to_string(array((
        SELECT json_agg(list->'label')
        FROM json_array_elements(recipe.ingredients)
        AS list
      )), '|') AS labels
      FROM recipe
      LEFT JOIN auth_user_recipe on auth_user_recipe.user_id = $3
      AND auth_user_recipe.recipe_id = recipe.id
      AND auth_user_recipe.excluded IS FALSE OR NULL
      ${likedFilter}
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
    userId,
  ]);

  return rows;
}
