import { Prisma } from './generated/prisma-client/index';

const prisma = new Prisma();

async function go() {
  const source = await prisma.upsertRecipeSource({
    where: {
      name: 'Bon Appetit',
    },
    create: {
      name: 'Bon Appetit',
    },
    update: {},
  });


  const recipe = await prisma.upsertRecipe({
    where: {
      url: 'http://unique-reciepe.com',
    },
    create: {
      name: 'Chicken',
      duration: 231,
      ingredients: {
        create: [
          {
            label: 'Chicken',
            unit: 'grams',
            quantity: 200,
          },
        ],
      },
      portions: 2,
      imageurl: 'http://placekitten.com/100/100',
      url:'http://unique-reciepe.com',
      categories: {
        set: ['weeknight', 'chicken'],
      },
      calories: 200,
      source: {
        connect: { id: source.id },
      },
    },
    update: {},
  });

  console.log('Source', source, '\n');
  console.log('Recipe', recipe, '\n');

  const ingredients = await prisma.recipeIngredients({
    where: {
      recipe: {
        id: recipe.id,
      },
    },
  });

  console.log('Ingredients', ingredients, '\n');
}

go();
