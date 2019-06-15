const Database = require('./recipe');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = new Database();
const app = express();

app.use(cors({ origin: '*' }));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const data = {
    isLoggedIn: false,
}

function setRecipePreference(
    recipeId,
    preference,
    res) {
    db.setRecipePreference(recipeId, preference)

    res.json({
        message: `Saved preferences for recipe ${recipeId}`,
    })
}

app.get('/login', (req, res) => {
    data.isLoggedIn = true;
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    data.isLoggedIn = false
    res.redirect('/');
});

app.get('/api/user', (req, res) => {
    res.json({
        name: 'User',
        isLoggedIn: data.isLoggedIn
    })
});

app.get('/api/recipes', (req, res) => {
    const { ids, keywords, offset } = req.query;

    if (data.isLoggedIn) {
        const data = db.searchRecipesWithUserPreference({ ids, keywords, offset })
        res.json(data);
    } else {
        const data = db.searchRecipes({ ids, keywords, offset })
        res.json(data);
    }
});

app.post('/api/recipes/:id/like', (req, res) => {
    setRecipePreference(req.params.id, { liked: true }, res);
});

app.post('/api/recipes/:id/unlike', (req, res) => {
    setRecipePreference(req.params.id, { liked: false }, res);
});

app.post('/api/recipes/:id/save', (req, res) => {
    setRecipePreference(req.params.id, { saved: true }, res);
});

app.post('/api/recipes/:id/unsave', (req, res) => {
    setRecipePreference(req.params.id, { saved: false }, res);
});

app.post('/api/recipes/:id/exclude', (req, res) => {
    setRecipePreference(req.params.id, { excluded: true }, res);
});

app.get('/api/recipes/saved', (req, res) => {
    if (data.isLoggedIn) {
        const saved = db.getSavedRecipeIdsForUser()
        res.json(saved);
    } else {
        return res.json([]);
    }
});

app.listen(4000, () => console.log(`Started mock server on ${4000}`));
