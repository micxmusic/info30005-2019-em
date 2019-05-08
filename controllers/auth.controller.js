const passport = require('passport');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');

const register = async (req, res) => {
  try {
    Account.register(
      new Account({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
      }),
      req.body.password,
      (err, account) => {
        if (err) {
          return res.status(500).send(`An error occurred: ${err}`);
        }
        passport.authenticate('local', {
          session: false,
        })(req, res, () => {
          res.status(200).send('Successfully created new account');
        });
      }
    );
  } catch (err) {
    return res.status(500).send(`An error occurred: ${err}`);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Something is not right with your input',
      });
    }
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET);
        return res.json({ user: user.id, username: user.username, token });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
  }
};

module.exports.register = register;
module.exports.login = login;
