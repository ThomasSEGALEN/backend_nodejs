const express = require('express');
const router = express.Router();
const agentController = require('../controllers/Agent');

router.post('/register', agentController.register);

router.post('/login', agentController.login);

router.post('/update', agentController.updateAgent);

module.exports = router;
