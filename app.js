const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI not defined in env');
}

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: 'sessions',
});
const sessionSettings = {
  store,
  secret: process.env.SECRET || '9Ipebao4fF11XFizc92pFmSTp8I=',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    secure: false,
  },
};

if (process.env.NODE_ENV === 'production') {
  sessionSettings.cookie.secure = true;
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(session(sessionSettings));

require('./models/db.js');

const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
