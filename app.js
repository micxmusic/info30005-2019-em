const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  })
);

require('./models/db.js');

const routes = require('./routes/routes.js');

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
