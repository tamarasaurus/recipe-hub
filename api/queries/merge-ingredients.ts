import query from '../query';
import { compareTwoStrings } from 'string-similarity';

function findIngredient(array, label) {
  return array.find(item => {
    const exactMatch = item.label.toLowerCase() === label.toLowerCase();
    const similarMatch = compareTwoStrings(
      item.label.toLowerCase(),
      label.toLowerCase(),
    ) > 0.8;
    return exactMatch || similarMatch;
  });
}

function mergeExactIngredients(ingredients: any) {
  const mergedExact = [];

  ingredients.forEach(ingredient => {
    const existing = findIngredient(mergedExact, ingredient.label);

    if (!existing) {
      mergedExact.push(ingredient);
    } else if (existing && existing.unit === ingredient.unit) {
      existing.quantity = (existing.quantity || 0) + ingredient.quantity;
      if (existing.label.toLowerCase() !== ingredient.label.toLowerCase()) {
        console.log('add', existing.label, '|', ingredient.label, '\n');
      }
    }
  });

  return mergedExact;
}

//    WHERE recipe.id = ANY ($1)
export default async function mergeIngredients(recipeIds: string[]) {
  const { rows } = await query(`
    SELECT
        id,
        source,
        portions,
        ingredients
    FROM recipe
  `,
    []);

  const allIngredients = [];
  rows.forEach(row => allIngredients.push(...row.ingredients));

  const sortedIngredients = allIngredients.sort((a: any, b: any) => {
    return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
  });

  const mergedIngredients = mergeExactIngredients(sortedIngredients);
  console.log(
    JSON.stringify(mergedIngredients.map(ingredient => {
      return ingredient.label + ': ' + ingredient.quantity + ' ' + ingredient.unit;
    }), null, 2)
  );

  return rows;
}
