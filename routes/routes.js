const express = require('express');

const router = express.Router();
const participantController = require('../controllers/participant_controller.js');
const commentsController = require('../controllers/comments_controller.js');
const dropsController = require('../controllers/drops_controller.js');

router.get('/api/participate/byUser/:user_id', participantController.showDropsForUser);
router.get('/api/participate/byDrop/:drop_id', participantController.showUsersForDrop);
router.post('/api/participate', participantController.joinDrop);

router.get('/api/comments/:id', commentsController.showDropComments);
router.post('/api/comments', commentsController.addDropComments);

// Create drop
router.post('/api',dropsController.createDrop);
// Show all items
router.get('/api',dropsController.findAllDrops);
//Show single listing
router.get('/api/id/:id',dropsController.findDrop);
//Search by name
router.get('/api/name/:name',dropsController.findCafeByName);

module.exports = router;
