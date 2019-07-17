import query from '../query';

interface Recipe {
  name: string;
  duration: number;
  ingredients: any[];
  portions: number;
  url: string;
  imageurl: string;
  categories: string[];
  calories: number;
  source: string;
}

export default async function (recipe: Recipe) {
  try {
    const { rows } = await query(
      `
      INSERT INTO recipe(
        name,
        duration,
        ingredients,
        portions,
        url,
        imageurl,
        categories,
        calories,
        source
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (url)
      DO
        UPDATE
          SET name = COALESCE($1, recipe.name),
              duration = COALESCE($2, recipe.duration),
              ingredients = COALESCE($3, recipe.ingredients),
              portions = COALESCE($4, recipe.portions),
              url = COALESCE($5, recipe.url),
              imageurl = COALESCE($6, recipe.imageurl),
              categories = COALESCE($7, recipe.categories),
              calories = COALESCE($8, recipe.calories),
              source = COALESCE($9, recipe.source),
              updated = now()
      RETURNING *
    `,
      [
        recipe.name,
        recipe.duration,
        JSON.stringify(recipe.ingredients),
        recipe.portions,
        recipe.url,
        recipe.imageurl,
        recipe.categories ? recipe.categories.join(',') : '',
        recipe.calories,
        recipe.source,
      ]);

    return rows;
  } catch (error) {
    console.log('\n', error);
  }
}
