import { compareTwoStrings } from 'string-similarity';

function findSimilarIngredientLabel(array, label) {
  return array.find((item: any) => {
    return compareTwoStrings(
      item.label.toLowerCase(),
      label.toLowerCase(),
    ) > 0.8;
  });
}

export function mergeSimilarIngredients(ingredients: any) {
  const merged = [];

  ingredients.forEach((ingredient: any) => {
    const similar = findSimilarIngredientLabel(merged, ingredient.label);

    if (!similar) {
      merged.push(ingredient);
    } else if (similar.unit === ingredient.unit) {
      similar.quantity = similar.quantity + ingredient.quantity;
    } else {
      merged.push(ingredient);
    }
  });

  return merged;
}
