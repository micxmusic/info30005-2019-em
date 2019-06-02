const express = require('express');

const router = express.Router();
const accountController = require('../controllers/account.controller.js');
const participantController = require('../controllers/participation.controller.js');
const commentsController = require('../controllers/comments.controller.js');
const dropsController = require('../controllers/drops.controller.js');

router.get('/account', accountController.queryAccount);
router.post('/account', accountController.updateAccount);
router.post('/account/changePassword', accountController.changePassword);

router.get('/participate/byUser/:userId', participantController.showDropsForUser);
router.get('/participate/byDrop/:dropId', participantController.showUsersForDrop);
router.post('/participate', participantController.joinDrop);

router.post('/comments', commentsController.addDropComment);

router.post('/drops/signUpload', dropsController.signUploadReq);
router.post('/drops', dropsController.createDrop);
router.get('/drops', dropsController.findAllDrops);
router.post('/drops/join', dropsController.joinDrop);
router.post('/drops/leave', dropsController.leaveDrop);
router.get('/drops/byName/:name', dropsController.findDropByName);

module.exports = router;
