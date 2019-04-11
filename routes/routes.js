const express = require('express');

const router = express.Router();
const participantController = require('../controllers/participant_controller.js');

router.get('/api/participate/byUser/:user_id', participantController.showDropsForUser);
router.get('/api/participate/byDrop/:drop_id', participantController.showUsersForDrop);
router.post('/api/participate', participantController.joinDrop);

module.exports = router;
