import query from './query';

interface SearchQuery {
  keywords: string;
}

export default class Database {
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
    INSERT INTO recipes(name, duration, ingredients, portions, url, imageUrl, categories, calories)
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

  searchRecipes() {
    return query('select * from recipes limit 1000', []).then((result) => result.rows);
  }

  getRecipesByIds(ids: string[]) {

  }
}