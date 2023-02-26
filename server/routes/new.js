const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.post('/', messageController.message_create);

module.exports = router;