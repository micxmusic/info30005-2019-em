const express = require('express');

const router = express.Router();
const participantController = require('../controllers/participant_controller.js');
const commentsController = require('../controllers/comments_controller.js');

router.get('/api/participate/byUser/:user_id', participantController.showDropsForUser);
router.get('/api/participate/byDrop/:drop_id', participantController.showUsersForDrop);
router.post('/api/participate', participantController.joinDrop);

router.get('/api/comments/:id',commentsController.showComment);
router.get('/api/comments',commentsController.findOnePerson);


module.exports = router;
