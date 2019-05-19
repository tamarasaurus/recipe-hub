import query from './query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
}

interface RecipeUserPreference {
  liked?: boolean
  excluded?: boolean
  saved?: boolean
}

export default class Database {
  createUser(auth_id: string) {
    return query(`INSERT INTO auth_user (auth_id) VALUES ($1)`, [auth_id])
  }

  setRecipePreference(recipeId: string, userId: string, preference: RecipeUserPreference) {
    const { liked, excluded, saved } = preference;

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
      (saved || false)
    ])
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
      calories
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
        calories
      ])
      .then((storedResult) => storedResult.rows)
      .catch((error: Error) => {
        console.log('\n', error);
      })
  }

  searchRecipes(searchQuery: SearchQuery) {
    let filters = ``;

    const { ids, keywords } = searchQuery

    if (ids !== undefined) {
      filters = `where id IN (${ids})`;
    }

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
        LEFT JOIN auth_user_recipe on auth_user_recipe.user_id = '1'
        AND auth_user_recipe.recipe_id = recipe.id) as recipes
      WHERE recipes.excluded = FALSE
      ${filters}
    `, []).then((result) => result.rows);
  }

  getSavedRecipeIdsForUser(userId: string): Promise<string[]> {
    return query(`
      SELECT *
      FROM auth_user_recipe
      RIGHT JOIN recipe on auth_user_recipe.recipe_id = recipe.id
      WHERE auth_user_recipe.user_id = $1
      AND auth_user_recipe.saved = TRUE
    `, [ userId ]).then((result) => result.rows)
  }
}