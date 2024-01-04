const express = require('express');
const { getMessageData, postMessageData, createMessageData, deleteMessageData} = require('../controllers/messageControllers');

const router = express.Router();

router.get('/getmessagedata',getMessageData);
router.post('/postmessagedata/:roomName',postMessageData)
router.post('/createmessagedata',createMessageData)
router.delete('/deletemessagedata/:roomName',deleteMessageData)


module.exports = router;