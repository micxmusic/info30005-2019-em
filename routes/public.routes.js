const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const dropsController = require('../controllers/drops.controller.js');
const commentsController = require('../controllers/comments.controller.js');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/drops/mostRecent', dropsController.pullLastDrop);
router.get('/comments/:dropId', commentsController.showDropComments);
router.get('/drops/byID/:id', dropsController.findDrop);

module.exports = router;
