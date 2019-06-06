import Database from './api/db';
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
    res.sendStatus(401);
  }
};

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

passport.use(new OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1/api/auth/google/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  },
));

app.use(express.static('./frontend/build/'))

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: 'email' }),
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
    console.log(req.user.id, 'logged in');
    return db.createUser(req.user.id).then(() => {
      res.redirect('/');
    }).catch(() => res.sendStatus(500));
  },
);

app.post('/api/recipes', cors(), (req, res) => {
  db.insertOrUpdateRecipe(req.body).then(data => res.json(data));
});

app.get('/api/recipes', cors(), (req, res) => {
  const { ids, keywords, offset } = req.query;

  if (req.isAuthenticated()) {
    db.searchRecipesWithUserPreference({ ids, keywords, offset }, req.user.id)
      .then((data => res.json(data)))
      .catch((e: Error) => res.status(500).json({
        message: 'Error fetching recipes',
      }));
  } else {
    db.searchRecipes({ ids, keywords, offset })
      .then((data => res.json(data)))
      .catch((e: Error) => {
        console.log(e);
        res.status(500).json({
          message: 'Error fetching recipes',
        });
      });
  }
});

app.post('/api/recipes/:id/like', isUserLoggedIn, cors(), (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { liked: true }, res);
});

app.post('/api/recipes/:id/unlike', isUserLoggedIn, cors(), (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { liked: false }, res);
});

app.post('/api/recipes/:id/save', isUserLoggedIn, cors(), (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { saved: true }, res);
});

app.post('/api/recipes/:id/unsave', isUserLoggedIn, cors(), (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { saved: false }, res);
});

app.post('/api/recipes/:id/exclude', isUserLoggedIn, cors(), (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { excluded: true }, res);
});

app.get('/api/recipes/saved', isUserLoggedIn, cors(), (req, res) => {
  if (req.isAuthenticated()) {
    db.getSavedRecipeIdsForUser(req.user.id)
      .then((recipeIds: string[]) => res.json(recipeIds))
      .catch((e: Error) => res.sendStatus(404));
  } else {
    return res.json([]);
  }
});

app.listen(process.env.port || '8000', () => console.log('Example app listening on port 8000'));
