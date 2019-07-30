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

//    WHERE recipe.id = ANY ($1)
export default async function mergeIngredients(recipeIds: string[]) {
  const { rows } = await query(`
    SELECT
        id,
        source,
        portions,
        ingredients
    FROM recipe
    LIMIT 20
  `,
    []);

  const allIngredients = [];
  rows.forEach(row => allIngredients.push(...row.ingredients.map(ingredient => {
    ingredient.language = sourceLanguages[row.source] || 'fr';
    return ingredient;
  })));

  allIngredients.forEach(({ label, language }) => {
    const matchingTranslation = translateIngredient(label.toLowerCase(), language);
    console.log(label.toLowerCase(), matchingTranslation);
  });

  return rows;
}
