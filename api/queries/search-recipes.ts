import query from '../query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
  source?: string;
  sort?: string;
}

const DEFAULT_SORTING = 'complexity';

function addIdFilter(ids: string[]) {
  if (!ids) return '';
  return `AND id IN (${ids})`;
}

function addSourceFilter(source) {
  if (!source) return '';
  return `AND source LIKE '${source}'`;
}

async function searchRecipesWithUserPreferences(
  searchQuery: SearchQuery,
  userId: string,
) {
  const { ids, keywords, offset, source, sort } = searchQuery;

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
    SELECT * from
      (SELECT
        recipe.id,
        recipe.name,
        recipe.duration,
        recipe.ingredients,
        recipe.portions,
        recipe.imageurl,
        recipe.url,
        recipe.created,
        recipe.updated,
        recipe.categories,
        recipe.source,
        json_array_length(recipe.ingredients) as complexity,
        COALESCE(auth_user_recipe.liked, false) as liked,
        COALESCE(auth_user_recipe.excluded, false) as excluded,
        COALESCE(auth_user_recipe.saved, false) as saved
      FROM recipe
      LEFT JOIN auth_user_recipe on auth_user_recipe.user_id = $1
      AND auth_user_recipe.recipe_id = recipe.id) as recipes
    WHERE recipes.excluded = FALSE
    ${addIdFilter(ids)}
    ${addSourceFilter(source)}
    ${searchFilters}
    ORDER BY $2 DESC
    LIMIT 24
    OFFSET $3
  `, [
    userId,
    sort || DEFAULT_SORTING,
    (offset || 0),
  ]);

  return rows;
}

async function searchRecipes(searchQuery: SearchQuery) {
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

export default function (
  searchQuery: SearchQuery,
  userId: string = null,
) {
  if (!userId) {
    return searchRecipes(searchQuery);
  }

  return searchRecipesWithUserPreferences(
    searchQuery,
    userId,
  );
}
