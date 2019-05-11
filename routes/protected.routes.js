const express = require('express');

const router = express.Router();
const participantController = require('../controllers/participation.controller.js');
const commentsController = require('../controllers/comments.controller.js');
const dropsController = require('../controllers/drops.controller.js');

router.get('/participate/byUser/:userId', participantController.showDropsForUser);
router.get('/participate/byDrop/:dropId', participantController.showUsersForDrop);
router.post('/participate', participantController.joinDrop);

router.get('/comments/:dropId', commentsController.showDropComments);
router.post('/comments', commentsController.addDropComment);

router.post('/drops', dropsController.createDrop);
router.get('/drops', dropsController.findAllDrops);
router.get('/drops/byID/:id', dropsController.findDrop);
router.get('/drops/byName/:name', dropsController.findDropByName);

module.exports = router;
