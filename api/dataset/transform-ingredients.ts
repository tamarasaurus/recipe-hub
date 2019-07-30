import * as ingredients from './import-ingredients.json'
import { normalizeSync } from 'normalize-diacritics';
import { writeFileSync } from 'fs';

const dictionary = {}

Object.entries(ingredients).forEach(([id, content]: [string, any]) => {
  if (id.length === 0) return;
  const formattedId = id.split(':')[1].replace('-', ' ');
  const english = (content.name.en || formattedId).replace('-', ' ').toLowerCase();
  const french = (content.name.fr || '').toLowerCase();
  dictionary[
    normalizeSync(french)
  ] = normalizeSync(english);
});

writeFileSync(
  './api/dataset/ingredients.json',
  JSON.stringify(dictionary, null, 2),
  { encoding: 'utf-8' }
);

