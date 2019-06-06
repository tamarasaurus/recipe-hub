import query from './query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
  offset?: number;
}

interface RecipeUserPreference {
  liked?: boolean;
  excluded?: boolean;
  saved?: boolean;
}

export default class Database {
  async getUserId(authId: string) {
    const queryResult = await query(`
      SELECT id
      FROM auth_user
      WHERE auth_id = $1
    `, [authId]);

    if (queryResult.rowCount === 0) {
      throw Error('User does not exist');
    }

    return queryResult.rows[0].id;
  }

  createUser(authId: string) {
    return query(`
      INSERT INTO auth_user (auth_id) VALUES ($1)
      ON CONFLICT DO NOTHING
    `, [authId]);
  }

  async setRecipePreference(
    recipeId: string,
    authId: string = '1',
    preference: RecipeUserPreference,
  ) {
    const { liked, excluded, saved } = preference;
    const userId = await this.getUserId(authId);

    return query(`
      INSERT INTO auth_user_recipe (user_id, recipe_id, liked, excluded, saved)
      VALUES ($1, $2, $3, $4, $5) ON CONFLICT(user_id, recipe_id)
      DO UPDATE SET liked = $3, excluded = $4, saved = $5
    `,
      [
        userId,
        recipeId,
        (liked || false),
        (excluded || false),
        (saved || false),
      ]);
  }

  insertOrUpdateRecipe(data: any) {
    const {
      name,
      duration,
      ingredients,
      portions,
      url,
      imageUrl,
      categories,
      calories,
    } = data;

    return query(
      `
      INSERT INTO recipe(name, duration, ingredients, portions, url, imageUrl, categories, calories)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (url)
      DO
        UPDATE
          SET name = COALESCE($1, recipe.name),
              duration = COALESCE($2, recipe.duration),
              ingredients = COALESCE($3, recipe.ingredients),
              portions = COALESCE($4, recipe.portions),
              url = COALESCE($5, recipe.url),
              imageUrl = COALESCE($6, recipe.imageUrl),
              categories = COALESCE($7, recipe.categories),
              calories = COALESCE($8, recipe.calories),
              updated = now()
      RETURNING *
    `,
      [
        name,
        duration,
        JSON.stringify(ingredients),
        portions,
        url,
        imageUrl,
        categories ? categories.join(',') : '',
        calories,
      ])
      .then(storedResult => storedResult.rows)
      .catch((error: Error) => {
        console.log('\n', error);
      });
  }

  async searchRecipesWithUserPreference(searchQuery: SearchQuery, authId: string) {
    const { ids, keywords, offset } = searchQuery;

    let filters = '';
    if (ids !== undefined) {
      filters = `AND id IN (${ids})`;
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

    const userId = await this.getUserId(authId);

    return query(`
      SELECT * from
        (SELECT
          recipe.id,
          recipe.name,
          recipe.duration,
          recipe.ingredients,
          recipe.portions,
          recipe.imageUrl,
          recipe.url,
          recipe.created,
          recipe.updated,
          recipe.categories,
          COALESCE(auth_user_recipe.liked, false) as liked,
          COALESCE(auth_user_recipe.excluded, false) as excluded,
          COALESCE(auth_user_recipe.saved, false) as saved
        FROM recipe
        LEFT JOIN auth_user_recipe on auth_user_recipe.user_id = $2
        AND auth_user_recipe.recipe_id = recipe.id) as recipes
      WHERE recipes.excluded = FALSE
      ${filters}
      ${searchFilters}
      ORDER BY created DESC
      LIMIT 24
      OFFSET $1
    `, [
      (offset || 0),
      userId,
    ]).then(result => result.rows);
  }

  async searchRecipes(searchQuery: SearchQuery) {
    const { ids, keywords, offset } = searchQuery;

    let filters = '';
    if (ids !== undefined) {
      filters = `AND id IN (${ids})`;
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

    return query(`
      SELECT *
      FROM recipe
      WHERE recipe.name IS NOT NULL
      ${filters}
      ${searchFilters}
      ORDER BY created DESC
      LIMIT 24
      OFFSET $1
    `, [
      (offset || 0),
    ]).then(result => result.rows);
  }

  async getSavedRecipeIdsForUser(authId: string): Promise<string[]> {
    const userId = await this.getUserId(authId);

    return query(`
      SELECT recipe.id,
      recipe.name,
      recipe.duration,
      recipe.ingredients,
      recipe.portions,
      recipe.imageUrl,
      recipe.url,
      recipe.created,
      recipe.updated,
      recipe.categories,
      COALESCE(auth_user_recipe.liked, false) as liked,
      COALESCE(auth_user_recipe.excluded, false) as excluded,
      COALESCE(auth_user_recipe.saved, false) as saved
      FROM auth_user_recipe
      RIGHT JOIN recipe on auth_user_recipe.recipe_id = recipe.id
      WHERE auth_user_recipe.user_id = $1
      AND auth_user_recipe.saved = TRUE
    `, [userId]).then(result => result.rows);
  }
}
