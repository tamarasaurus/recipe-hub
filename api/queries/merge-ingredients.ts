import query from '../query';

export default async function mergeIngredients(recipeIds: string[]) {

  const { rows } = await query(`
    SELECT
        id,
        portions,
        ingredients
    FROM recipe
    WHERE recipe.id = ANY ($1)
    LIMIT 5
  `,
  [
      recipeIds
    ]);

   return rows;
}
