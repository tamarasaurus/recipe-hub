import query from '../query';
import { mergeSimilarIngredients } from '../formatting/merge-similar-ingredients';

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
