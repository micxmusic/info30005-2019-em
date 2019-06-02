const passport = require('passport');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Account = require('../models/account');

const queryAccount = async (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  try {
    res.send(await Account.findById(userToken.id));
  } catch {
    res.sendStatus(404);
  }
};

const updateAccount = async (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  const currentUser = await Account.findById(userToken.id);
  if (currentUser.username === req.body.username) {
    res.sendStatus(409);
  } else {
    currentUser.username = req.body.username;
    try {
      await currentUser.save();
      res.sendStatus(200);
    } catch {
      res.sendStatus(409);
    }
  }
};

const changePassword = async (req, res) => {
  const userToken = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
  const currentUser = await Account.findById(userToken.id);
  try {
    await currentUser.changePassword(req.body.currentPassword, req.body.newPassword);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};

module.exports.queryAccount = queryAccount;
module.exports.updateAccount = updateAccount;
module.exports.changePassword = changePassword;
