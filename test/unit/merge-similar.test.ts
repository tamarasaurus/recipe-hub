import { mergeSimilarIngredients } from '../../api/formatting/merge-similar-ingredients';

it('merges ingredients with similar names and quantities', () => {
  const ingredients = [
    { label: 'Chicken', unit: 'g', quantity: 20 },
    { label: 'Garlic', unit: 'g', quantity: 1 },
    { label: 'garlic', unit: 'g', quantity: 1 },
    { label: 'garlics', unit: 'pieces', quantity: 3 },
    { label: 'chicken', unit: 'g', quantity: 100 },
    { label: 'chicken fillets', unit: 'g', quantity: 500 },
  ];

  const mergedIngredients = mergeSimilarIngredients(ingredients);
  const expectedIngredients = [
    { label: 'Chicken', unit: 'g', quantity: 120 },
    { label: 'Garlic', unit: 'g', quantity: 2 },
    { label: 'garlics', unit: 'pieces', quantity: 3 },
    { label: 'chicken fillets', unit: 'g', quantity: 500 },
  ];

  expect(expectedIngredients).toEqual(mergedIngredients);
});
