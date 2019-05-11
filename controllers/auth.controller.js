const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../models/account');

const register = async (req, res) => {
  if (!validator.isEmail(req.body.username) || !validator.isLength(req.body.password, { min: 6 })) {
    return res.sendStatus(400);
  }
  try {
    Account.register(
      new Account({
        username: validator.normalizeEmail(req.body.username),
        name: validator.trim(req.body.name),
      }),
      req.body.password,
      (err, account) => {
        if (err) {
          return res.status(500).send(err);
        }
        passport.authenticate('local', {
          session: false,
        })(req, res, () => {
          return res.status(200).send('Successfully created new account');
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
          message: 'Incorrect username/email or password',
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          return res.send(err);
        }
        const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET, {
          expiresIn: '1d',
        });
        return res.json({ user: { userId: user.id, name: user.name }, token });
      });
    })(req, res, next);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports.register = register;
module.exports.login = login;
