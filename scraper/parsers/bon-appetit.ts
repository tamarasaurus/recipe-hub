import * as path from 'jsonpath';
const ms = require('ms');

export default function (data: any) {
  const calories = /\(kcal\)\s(\d+)/gm.exec(data.nutritionalInfo);
  const portions = path.value(data, '$.servingSizeInfo.amount');
  const duration = path.value(data, '$.times.totalTime.text');
  const photoId = path.value(data, '$.photos.tout.0.id');
  const photoTitle = path.value(data, '$.photos.tout.0.title');

  let durationInSeconds = 0;

  if (duration !== undefined) {
    durationInSeconds = ms(duration) / 1000;
  }

  return {
    name: data.hed,
    duration: durationInSeconds,
    ingredients: data.ingredientGroups[0].ingredients.map((ingredient: any): any => {
      return {
        label: ingredient.name,
        quantity: null,
      };
    }),
    portions: parseInt(`${portions}`, 10),
    imageurl: `https://assets.bonappetit.com/photos/${photoId}/16:11/w_400,h_300,c_limit/${photoTitle}.jpg`,
    categories: data.cneTags,
    calories: calories === null ? null : parseInt(calories[1], 10),
    url: `https://bonappetit.com${data.url}`,
    source: 'Bon Appetit',
  };
}