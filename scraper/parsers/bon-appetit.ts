import * as path from 'jsonpath';

export default function (data: any) {
  const calories = /\(kcal\)\s(\d+)/gm.exec(data.nutritionalInfo);
  const portions = path.value(data, '$.servingSizeInfo.amount');

  return {
    name: data.hed,
    duration: path.value(data, '$.times.totalTime.text'),
    ingredients: data.ingredientGroups[0].ingredients.map((ingredient: any): any => {
      return {
        label: ingredient.name,
        quantity: null,
      };
    }),
    portions: parseInt(`${portions}`, 10),
    imageUrl: path.value(data, '$.photoTout.aspectRatios.master.url'),
    categories: data.cneTags,
    calories: calories === null ? null : parseInt(calories[1], 10),
    url: `https://bonappetit.com${data.url}`,
  };
};