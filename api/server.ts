import Database from './repository';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
import * as session from 'express-session';
import * as helmet from 'helmet';
import { OAuth2Strategy } from 'passport-google-oauth';
import rateLimiter from './middleware/rate-limiting';
import * as ConnectRedis from 'connect-redis';
import mergeIngredients from './queries/merge-ingredients';

const RedisStore = ConnectRedis(session);
const PORT = process.env.PORT || '8000';
const API_URL = process.env.API_URL || `http://localhost:${PORT}`;
const SESSION_SECRET = process.env.SESSION_SECRET || 'default';

console.log('API_URL', API_URL);
const db = new Database();
const app = express();

const corsOptions = {
  origin: [API_URL],
  methods: ['POST', 'GET'],
  credentials: true,
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL,
  }),
  secret: SESSION_SECRET,
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
    res.status(401).json({ message: 'Unauthorized' })
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
    callbackURL: `${API_URL}/auth/google/callback`,
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  },
));

app.get('/login',
  passport.authenticate('google', { scope: 'email' }),
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: true }),
  (req, res) => {
    return db.createUser(req.user.id).then(() => {
      res.redirect('/');
    }).catch(() => res.sendStatus(500));
  },
);

app.get('/api/user', rateLimiter, (req, res) => {
  const user = req.user || {};

  return res.json({
    name: user.name,
    isLoggedIn: req.isAuthenticated(),
  });
});

app.post('/api/recipes', (req, res) => {
  db.insertOrUpdateRecipe(req.body).then(data => res.json(data));
});

app.get('/api/recipes/generate', rateLimiter, (req, res) => {
  const user = req.user || {};

  db.generateRecipes(user.id)
    .then((data => res.json(data)))
    .catch((e: Error) => {
      console.log(e);
      res.status(500).json({
        message: 'Error generating recipes',
      });
    });
});

app.get('/api/recipes', rateLimiter, (req, res) => {
  const { ids, keywords, offset, source, sort, order, liked } = req.query;
  const user = req.user || {};

  db.searchRecipes({
    ids,
    keywords,
    offset,
    source,
    sort,
    order,
    liked,
  }, user.id)
    .then((data => res.json(data)))
    .catch((e: Error) => {
      console.log(e);
      res.status(500).json({
        message: 'Error fetching recipes',
      });
    });
});

app.get('/api/recipes/merge', rateLimiter, (req, res) => {
  const ids = req.query.ids || '';
  mergeIngredients(ids.split(',')).then((mergedIngredients) => {
    res.json(mergedIngredients);
  }).catch((e: Error) => res.status(500).json({
    message: 'Error merging recipes: ' + e.message,
  }));
})

app.post('/api/recipes/:id/like', rateLimiter, isUserLoggedIn, (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { liked: true }, res);
});

app.post('/api/recipes/:id/unlike', rateLimiter, isUserLoggedIn, (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { liked: false }, res);
});

app.post('/api/recipes/:id/save', rateLimiter, isUserLoggedIn, (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { saved: true }, res);
});

app.post('/api/recipes/:id/unsave', rateLimiter, isUserLoggedIn, (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { saved: false }, res);
});

app.post('/api/recipes/:id/exclude', rateLimiter, isUserLoggedIn, (req, res) => {
  setRecipePreference(req.params.id, req.user.id, { excluded: true }, res);
});

app.get('/api/recipes/saved', rateLimiter, (req, res) => {
  if (req.isAuthenticated()) {
    db.getSavedRecipeIdsForUser(req.user.id)
      .then((recipeIds: string[]) => res.json(recipeIds))
      .catch((e: Error) => res.sendStatus(404));
  } else {
    return res.json([]);
  }
});

app.use(express.static('./frontend/build/'));
app.listen(PORT, () => console.log(`Started app on ${PORT}`));
