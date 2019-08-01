import query from '../query';
import { compareTwoStrings } from 'string-similarity';

function findSimilarIngredientLabel(array, label) {
  return array.find((item: any) => {
    return compareTwoStrings(
      item.label.toLowerCase(),
      label.toLowerCase(),
    ) > 0.8;
  });
}

function mergeSimilarIngredients(ingredients: any) {
  const merged = [];

  ingredients.forEach((ingredient: any) => {
    const similar = findSimilarIngredientLabel(merged, ingredient.label);

    if (!similar) {
      merged.push(ingredient);
    } else if (similar.unit === ingredient.unit) {
      similar.quantity = similar.quantity + ingredient.quantity;
    }
  });

  return merged;
}

export default async function mergeIngredients(recipeIds: string[]) {
  let { rows } = await query(`
        SELECT
            DISTINCT(label) as label,
            SUM(quantity) as quantity,
            unit
        FROM (
               SELECT id, label, unit, quantity
               FROM recipe,
                    json_to_recordset(recipe.ingredients) as ing(label text, unit text, quantity float)
             ) AS recipeingredients
        WHERE recipeIngredients.id = ANY ($1)
        GROUP BY label, unit
        ORDER BY label asc
  `,
    [recipeIds]);

  return mergeSimilarIngredients(rows);
}
