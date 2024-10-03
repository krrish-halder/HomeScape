const express = require('express');
const router = express.Router();
const stateController = require('../../controllers/Admin/stateController');

router.post('/state', stateController.addState);
router.get('/states', stateController.getAllStates);

module.exports = router;
