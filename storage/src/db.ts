import query from './query';
import { QueryResult } from 'pg';

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

  // Join with user preference table
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