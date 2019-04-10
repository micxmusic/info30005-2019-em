var express = require('express');
var router = express.Router();

var controller = require('../controllers/comments_controller.js');

// Show comments for a particular drop
router.get('/api/comments/:id',controller.showDropComments);
// Add a comeent to a drop
router.post('/api/comments',controller.addDropComments);


module.exports = router;