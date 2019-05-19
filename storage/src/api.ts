import Database from './db'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const db = new Database();
const app = express()

app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next()
})

function setRecipePreference(recipeId: string, userId: string, preference: any, res) {
  db.setRecipePreference(recipeId, userId, preference)
    .then(() => res.json({
      message: `Saved preferences for recipe ${recipeId}`
    }))
    .catch(() => res.sendStatus(404));
}

app.post('/recipes', cors(), (req, res) => {
  db.insertOrUpdateRecipe(req.body).then(data => res.json(data));
});

app.get('/recipes', cors(), (req, res) => {
  const { ids, keywords, offset } = req.query;

  db.searchRecipes({ ids, keywords, offset })
  .then((data => res.json(data)))
  .catch((e: Error) => res.status(500).json({
    message: 'Error fetching recipes'
  }))
})

app.post('/recipes/:id/like', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { liked: true }, res)
})

app.post('/recipes/:id/unlike', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { liked: false }, res)
})

app.post('/recipes/:id/save', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { saved: true }, res)
})

app.post('/recipes/:id/unsave', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { saved: false }, res)
})

app.post('/recipes/:id/exclude', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { excluded: true }, res)
})

app.get('/recipes/saved', cors(), (req, res) => {
  db.getSavedRecipeIdsForUser('1')
    .then((recipeIds: string[]) => res.json(recipeIds))
    .catch((e: Error) => res.sendStatus(404));
})

app.post('/account/create', cors(), (req, res) => {
  const token = req.body.token;
  db.createUser(token).then(() => res.sendStatus(200)).catch(() => res.sendStatus(400));
})

app.listen('8000', () => console.log(`Example app listening on port 8000`))