const sampleSize = require('lodash/sampleSize');
const faker = require('faker');

const createFakeRecipes = () => {
    const recipes = []
    for(let i = 0; i < 24; i++) {
        const ingredients = []
        for(let x = 0; x < 10; x++ ) {
            ingredients.push({
                label: faker.commerce.productName(),
                quantity: 2,
                unit: 'grams'
            })
        }
        recipes.push({
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            duration: faker.random.number({min: 2000, max: 8000}),
            ingredients: ingredients,
            portions: 2,
            imageurl: 'https://picsum.photos/500/320/?image='+faker.random.number(1084),
            url: faker.internet.url(),
            created: faker.date.past(),
            updated: faker.date.past(),
            categories: 'chicken, pork, vegetables',
            complexity: faker.random.number({min:5, max:10}),
            source: 'Hello Fresh'
        })
    }

    return recipes;
}

const data = {
    recipes: createFakeRecipes(),
    liked: [],
    saved: [],
    excluded: []
}

module.exports = function () {
    this.setRecipePreference = (recipeId, preference) => {
        const { liked, excluded, saved } = preference;

        if (liked === true) {
            data.liked.push(recipeId)
        } else {
            const index = data.liked.indexOf(recipeId)
            if (index > -1) data.liked.splice(index, 1)
        }

        if (excluded === true) {
            data.excluded.push(recipeId)
        } else {
            const index = data.excluded.indexOf(recipeId)
            if (index > -1) data.excluded.splice(index, 1)
        }

        if (saved === true) {
            data.saved.push(recipeId)
        } else {
            const index = data.saved.indexOf(recipeId)
            if (index > -1) data.saved.splice(index, 1)
        }
    }

    this.insertOrUpdateRecipe = (data) => {
        data.recipes.push(data)
    }

    this.searchRecipesWithUserPreference = () => {
        return data.recipes.filter(recipe => data.excluded.includes(recipe.id) === false)
    }

    this.searchRecipes = () => {
        return data.recipes;
    }

    this.generateRecipesWithUserPreference = ({ count }) => {
        return sampleSize(
            data.recipes.filter(recipe => data.excluded.includes(recipe.id) === false),
            count
        )
    }

    this.generateRecipes = ({ count }) => {
        return sampleSize(data.recipes, count)
    }

    this.getSavedRecipeIdsForUser = () => {
        return data.recipes.filter(recipe => data.saved.includes(recipe.id) === true)
    }

    return this;
}