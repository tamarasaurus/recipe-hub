export default function (data: any) {
  return {
    name: data.hed,
    duration: parseInt(data.times.totalTime.amount, 10),
    ingredients: data.ingredientGroups[0].ingredients.map((ingredient: any): any => {
      return {
        label: ingredient.name,
        quantity: null,
      };
    }),
    portions: parseInt(data.servingSizeInfo.amount, 10),
    imageUrl: data.photoTout.aspectRatios.master.url,
    categories: data.cneTags,
    calories: /\(kcal\)\s(\d+)/gm.exec(data.nutritionalInfo)[1],
    url: `https://bonappetit.com${data.url}`,
  };
};