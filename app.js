/* eslint-disable import/no-extraneous-dependencies,node/no-unpublished-require,global-require,no-console */
const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const helmet = require('helmet');
const csp = require('helmet-csp');
const cors = require('cors');

const db = require('./models/db.js');
const Account = require('./models/account');

const app = express();
const PORT = process.env.PORT || 3000;

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI not defined in env');
}

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.disable('x-powered-by');

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    (token, done) => {
      return done(null, token);
    }
  )
);

const corsOptions = {
  origin: ['localhost', 'https://info30005-2019-em.herokuapp.com'],
  optionsSuccessStatus: 200,
};

app.use('/api', cors(corsOptions), require('./routes/public.routes.js'));
app.use(
  '/api',
  [passport.authenticate('jwt', { session: false }), cors(corsOptions)],
  require('./routes/protected.routes.js')
);

if (process.env.NODE_ENV === 'production') {
  app.use(
    helmet.hsts({
      maxAge: 15768000,
    })
  );
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
  app.use(
    helmet.referrerPolicy({
      policy: ['no-referrer', 'strict-origin-when-cross-origin'],
    })
  );
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(
    csp({
      directives: {
        defaultSrc: ["'none'"],
        connectSrc: ["'self'", 'https://info30005-2019-em.s3.ap-southeast-2.amazonaws.com/'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'"],
        imgSrc: [
          "'self'",
          'data:',
          'https://info30005-2019-em.s3.amazonaws.com',
          'https://images.unsplash.com',
        ],
        frameAncestors: ["'self'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: true,
      },
    })
  );
  app.use('/', expressStaticGzip('dist', { index: false }));
  // app.use(express.static('dist'));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/./dist/index.html'));
  });
} else {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev.js');
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: '/',
      stats: {
        colors: true,
        warnings: false,
      },
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

db.connectDb()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Express listening on port ${PORT}`);
    })
  )
  .catch(err => console.error(err));
