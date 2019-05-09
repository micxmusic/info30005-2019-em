const express = require('express');
const authController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/register', (req, res) => {
  authController.register(req, res);
});

router.post('/login', (req, res, next) => {
  authController.login(req, res, next);
});

module.exports = router;
