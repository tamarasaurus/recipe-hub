import Database from './db';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import * as session from 'express-session';
import { OAuth2Strategy } from 'passport-google-oauth';

const db = new Database();
const app = express();

app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie, done) => {
  done(null, userDataFromCookie);
});

const isUserLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('http://localhost:8000/auth/google');
  }
};

passport.use(new OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  },
));

app.get('/auth/google',
  passport.authenticate('google', { scope: 'email' }),
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
    console.log('wooo we authenticated, here is our user object:', req.user);
    // res.json(req.user);
    res.redirect('/');
  },
);

function setRecipePreference(
  recipeId: string,
  userId: string,
  preference: any,
  res: express.Response) {
  db.setRecipePreference(recipeId, userId, preference)
    .then(() => res.json({
      message: `Saved preferences for recipe ${recipeId}`,
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
      message: 'Error fetching recipes',
    }));
});

app.post('/recipes/:id/like', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { liked: true }, res);
});

app.post('/recipes/:id/unlike', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { liked: false }, res);
});

app.post('/recipes/:id/save', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { saved: true }, res);
});

app.post('/recipes/:id/unsave', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { saved: false }, res);
});

app.post('/recipes/:id/exclude', cors(), (req, res) => {
  setRecipePreference(req.params.id, '1', { excluded: true }, res);
});

app.get('/recipes/saved', cors(), isUserLoggedIn, (req, res) => {
  console.log('req.user', req.user);
  db.getSavedRecipeIdsForUser('1')
    .then((recipeIds: string[]) => res.json(recipeIds))
    .catch((e: Error) => res.sendStatus(404));
});


app.listen('8000', () => console.log('Example app listening on port 8000'));
