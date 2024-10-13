const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const stateController = require('../../controllers/Admin/stateController');

router.get('/', protect, adminOnly, stateController.getAllStates);
router.post('/', protect, adminOnly, stateController.addState);
router.put('/:id', protect, adminOnly, stateController.updateState);
router.delete('/:id', protect, adminOnly, stateController.deleteState);

module.exports = router;

