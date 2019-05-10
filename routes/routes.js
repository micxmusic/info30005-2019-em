const express = require('express');

const router = express.Router();
const participantController = require('../controllers/participation.controller.js');
const commentsController = require('../controllers/comments.controller.js');
const dropsController = require('../controllers/drops.controller.js');

router.get('/api/participate/byUser/:userId', participantController.showDropsForUser);
router.get('/api/participate/byDrop/:dropId', participantController.showUsersForDrop);
router.post('/api/participate', participantController.joinDrop);

router.get('/api/comments/:dropId', commentsController.showDropComments);
router.post('/api/comments', commentsController.addDropComment);

router.post('/api/drops', dropsController.createDrop);
router.get('/api/drops', dropsController.findAllDrops);
router.get('/api/drops/byID/:id', dropsController.findDrop);
router.get('/api/drops/byName/:name', dropsController.findDropByName);
router.get('/api/drops/mostRecent', dropsController.pullLastDrop);

module.exports = router;
