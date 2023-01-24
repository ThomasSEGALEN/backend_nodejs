const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const interventionController = require('../controllers/Intervention');

router.post('/', auth, interventionController.createIntervention);

router.get('/', auth, interventionController.getInterventions);

router.get('/all', interventionController.getAllInterventions);

router.delete('/:id', auth, interventionController.deleteIntervention);

module.exports = router;
