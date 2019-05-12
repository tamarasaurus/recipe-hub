import Database from './db'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

const db = new Database();
const app = express()

app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next()
})

app.post('/recipes', cors(), (req, res) => {
  db.insertOrUpdateRecipe(req.body).then(data => res.json(data));
});

app.get('/recipes', cors(), (req, res) => {
  const ids = req.query.ids
  const keywords = req.query.keywords;

  db.searchRecipes({ids, keywords}).then((data => res.json(data)))
})

app.listen('8000', () => console.log(`Example app listening on port 8000`))