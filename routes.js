var express = require('express');
var router = express.Router();

var dropscontroller = require('C:/Users/meagh/info30005-2019-em/dropscontroller.js');

// Create drop
router.post('/api',dropscontroller.createDrop());

// Show all items
router.get('/api',dropscontroller.findAllDrops());

//Show single listing
router.get('/api/id/:id',dropscontroller.findDrop());

//Search by name
router.get('/api/name/:name',dropscontroller.findCafeByName());


module.exports = router;