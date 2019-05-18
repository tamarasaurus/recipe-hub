import query from './query';

interface SearchQuery {
  keywords?: string;
  ids?: string[];
}

interface UserPreferences {
  liked: string[]
  excluded: string[]
  saved: string[]
}

export default class Database {
  createUser(auth_id: string) {

  }

  savePreferencesForUser(userId: string, preferences: UserPreferences) {
    const { liked, excluded, saved } = preferences
    const recipeIds = Array.from(new Set([...liked, ...excluded, ...saved]))
    const rowQueries = recipeIds.map((recipeId) => {
      return query(`
        INSERT INTO auth_user_recipe (user_id, recipe_id, liked, excluded, saved) 
        VALUES ($1, $2, $3, $3, $5)
        ON CONFLICT(user_id, recipe_id)
        DO 
          UPDATE
            liked = COALESCE($3, auth_user_recipe.liked),
            excluded = COALESCE($4, auth_user_recipe.excluded),
            saved = COALESCE($5, auth_user_recipe.saved)
            RETURNING *
      `, [
        userId,
        recipeId,
        liked.includes(recipeId) === true,
        excluded.includes(recipeId) === true,
        saved.includes(recipeId) === true
      ])
    })

    return Promise.all(rowQueries).then((storedResult) => {
      console.log(storedResult)
    }).catch((e: Error) => {
      console.log('Error storing user preferences')
    });
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
        SET name = COALESCE($1, recipes.name),
            duration = COALESCE($2, recipes.duration),
            ingredients = COALESCE($3, recipes.ingredients),
            portions = COALESCE($4, recipes.portions),
            url = COALESCE($5, recipes.url),
            imageUrl = COALESCE($6, recipes.imageUrl),
            categories = COALESCE($7, recipes.categories),
            calories = COALESCE($8, recipes.calories),
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
        categories ? categories.join(','): '',
        calories
      ])
      .then((storedResult) => storedResult.rows)
      .catch((error: Error) => {
        console.log('\n', error);
      })
  }

  searchRecipes(searchQuery: SearchQuery) {
    let filters = ``;
    const { ids } = searchQuery

    if (ids !== undefined) {
      filters = `where id IN (${ids})`;
    }

    return query(`
      select * from recipe ${filters} limit 1000
    `, []).then((result) => result.rows);
  }
}