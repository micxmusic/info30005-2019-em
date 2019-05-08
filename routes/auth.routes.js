const express = require('express');
const authController = require('../controllers/auth.controller.js');

const router = express.Router();

router.post('/api/register', (req, res) => {
  authController.register(req, res);
});

router.post('/api/login', (req, res, next) => {
  authController.login(req, res, next);
});

module.exports = router;
