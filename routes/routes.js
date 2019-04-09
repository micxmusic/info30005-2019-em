var express = require('express');
var router = express.Router();

var controller = require('../controllers/comments_controller.js');

// Show comments for a particular drop
router.get('/api/comments/:id',controller.showComment);
// Add a comeent to a drop
router.get('/api/comments',controller.findOnePerson);


module.exports = router;