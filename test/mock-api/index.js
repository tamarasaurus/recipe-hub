const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const recipesJSON = require('./recipes.json');

const PORT = 4000
const USER = { name: 'Tamara', isLoggedIn: true };
const app = express();
const recipes = recipesJSON;
const likedRecipes = [];
const excludedRecipes = [];
const savedRecipes = [];

const corsOptions = {
  origin: '*',
  methods: ['POST', 'GET'],
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/user', (req, res) => res.json(USER));

app.get('/api/recipes/generate', (req, res) => {
  res.json(Object.freeze(recipes).slice(0, 5));
});

app.get('/api/recipes', (req, res) => res.json(recipes));

app.get('/api/recipes/merge', (req, res) => {
  res.json(recipes.map(recipe => recipe.ingredients));
})

app.post('/api/recipes/:id/like', (req, res) => {
  res.sendStatus(200).json({});
});

app.post('/api/recipes/:id/unlike', (req, res) => {
  res.sendStatus(200).json({});
});

app.post('/api/recipes/:id/save', (req, res) => {
  res.sendStatus(200).json({});
});

app.post('/api/recipes/:id/unsave', (req, res) => {
  res.sendStatus(200).json({});
});

app.post('/api/recipes/:id/exclude', (req, res) => {
  res.sendStatus(200).json({});
});

app.get('/api/recipes/saved', (req, res) => {
  res.json([]);
});

app.listen(PORT, () => console.log(`Started app on ${PORT}`));
