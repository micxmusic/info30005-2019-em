const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const dropsController = require('../controllers/drops.controller.js');
const commentsController = require('../controllers/comments.controller.js');

router.post('/register', (req, res) => {
  authController.register(req, res);
});

router.post('/login', (req, res, next) => {
  authController.login(req, res, next);
});

router.get('/drops/mostRecent', dropsController.pullLastDrop);
router.get('/comments/:dropId', commentsController.showDropComments);
router.get('/drops/byID/:id', dropsController.findDrop);

module.exports = router;
