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

    console.log(data);

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
    `, [ name, duration, JSON.stringify(ingredients), portions, url, imageUrl, categories.join(','), calories ])
  }

  searchRecipes(query: SearchQuery) {

  }

  getRecipesByIds(ids: string[]) {

  }
}