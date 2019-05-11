const express = require('express');
const path = require('path');
const compression = require('compression');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const helmet = require('helmet');
const csp = require('helmet-csp');
const cors = require('cors');
const _ = require('lodash');

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

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    async (token, done) => {
      try {
        return done(null, await Account.findById(token.id));
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use('/api', require('./routes/auth.routes.js'));
app.use('/api', passport.authenticate('jwt', { session: false }), require('./routes/routes.js'));

if (process.env.NODE_ENV === 'production') {
  app.disable('x-powered-by');
  app.use(
    helmet.referrerPolicy({
      policy: ['no-referrer', 'strict-origin-when-cross-origin'],
    })
  );
  app.use(helmet.frameguard({ action: 'sameorigin' }));
  app.use(helmet.noSniff());
  app.use(helmet.xssFilter());
  app.use(cors());
  const manifest = require(path.join(__dirname, '/./dist/manifest.json'));
  const scriptHash = [];
  const styleHash = [];

  _.forEach(manifest, file => {
    if (file.src.match('.js$')) {
      scriptHash.push(`'${file.integrity}'`);
    } else if (file.src.match('.css$')) {
      styleHash.push(`'${file.integrity}'`);
    }
  });
  app.use(
    csp({
      directives: {
        defaultSrc: ["'none'"],
        scriptSrc: [...scriptHash, "'unsafe-inline'", "'unsafe-eval'", 'https:'],
        styleSrc: [...styleHash, "'unsafe-inline'", 'https:'],
        fontSrc: ['http:'],
        imgSrc: ["'self'", 'https://s3.amazonaws.com', 'https://images.unsplash.com'],
        requireSriFor: ['script', 'style'],
        upgradeInsecureRequests: true,
      },
    })
  );
  app.use(express.static('dist'));
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
