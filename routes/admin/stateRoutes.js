const express = require('express');
const router = express.Router();
const stateController = require('../../controllers/Admin/stateController');

router.get('/', stateController.getAllStates);
router.post('/', stateController.addState);
router.put('/:id', stateController.updateState);
router.delete('/:id', stateController.deleteState);

module.exports = router;

