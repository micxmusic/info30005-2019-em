const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../models/account');

const register = async (req, res) => {
  if (!validator.isEmail(req.body.username) || !validator.isLength(req.body.password, { min: 6 })) {
    return res.sendStatus(400);
  }
  try {
    return Account.register(
      new Account({
        username: validator.normalizeEmail(req.body.username),
        name: validator.trim(req.body.name),
      }),
      req.body.password,
      err => {
        if (err) {
          res.sendStatus(409);
        }
        passport.authenticate('local', {
          session: false,
        })(req, res, () => {
          res.status(201).json({
            message: 'Successfully created new account',
          });
        });
      }
    );
  } catch {
    return res.sendStatus(500);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        message: 'Something is not right with your input',
      });
    }
    return passport.authenticate('local', { session: false }, (authErr, user) => {
      if (authErr || !user) {
        res.status(403).json({
          message: 'Incorrect username/email or password',
        });
      }
      req.login(user, { session: false }, err => {
        if (err) {
          res.sendStatus(500);
        }
        const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET, {
          expiresIn: '1d',
        });
        res.status(200).json({ user: { userId: user.id, name: user.name }, token });
      });
    })(req, res, next);
  } catch (err) {
    return res.sendStatus(500);
  }
};

module.exports.register = register;
module.exports.login = login;
