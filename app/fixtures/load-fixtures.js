const recipes = require('./recipes.json');
const request = require('request-promise');

console.log('Loading fixtures');

async function loadFixtures() {
    for (let recipe of recipes) {
        await request(`${process.env.API_URL}/api/recipes`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        })
        .then(() => {
            console.log('Success', recipe.id)
        })
        .catch(e => {
            console.log('Error', e.message, recipe.id)
        })
    }
}

loadFixtures();