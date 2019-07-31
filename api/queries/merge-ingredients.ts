import query from '../query';
import * as dictionary from '../dataset/dictionary.json';
import { compareTwoStrings } from 'string-similarity';

const sourceLanguages = {
  'Bon Appetit': 'en',
  'Blue Apron': 'en',
}

function translateIngredient(word: string, sourceLanguage: string) {
  const matches = [];

  Object.entries(dictionary).forEach(([french, english]: [string, string]) => {
    if (sourceLanguage === 'en') {
      matches.push([compareTwoStrings(word, english), english]);
    } else {
      matches.push([compareTwoStrings(word, french), english]);
    }
  });

  return matches.sort((a, b) => b[0] - a[0])[0];
}

function findIngredient(array, label) {
  return array.find(item => {
    const exactMatch = item.label.toLowerCase() === label.toLowerCase();
    const similarMatch = compareTwoStrings(item.label.toLowerCase(), label.toLowerCase()) > 0.8;
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
      existing.quantity = existing.quantity + ingredient.quantity;
      if (existing.label.toLowerCase() !== ingredient.label.toLowerCase()) {
        console.log('add', existing.label, '|', ingredient.label, '\n');
      }
    }
  });

  return mergedExact;
}

function mergeSimilarIngredients() {

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
    LIMIT 400
  `,
    []);

  const allIngredients = [];
  rows.forEach(row => allIngredients.push(...row.ingredients.map(ingredient => {
    ingredient.language = sourceLanguages[row.source] || 'fr';
    return ingredient;
  })));

  const sortedIngredients = allIngredients.sort((a: any, b: any) => {
    return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
  });

  const mergedIngredients = mergeExactIngredients(sortedIngredients);
  console.log(
    JSON.stringify(mergedIngredients.map(ingredient => {
      return ingredient.label + ': ' + ingredient.quantity + ' ' + ingredient.unit;
    }), null, 2)
  );

  // merge similar terms before translating
  // merge same language in the second step

  // allIngredients.forEach(({ label, language }) => {
  //   const matchingTranslation = translateIngredient(label.toLowerCase(), language);
  //   console.log(label.toLowerCase(), matchingTranslation);
  // });

  return rows;
}
