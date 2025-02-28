const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../../middleware/authMiddleware');
const adminUserController = require('../../controllers/Admin/userController');

router.get('/', protect, adminOnly, adminUserController.getAllUsers);

router.put('/:id', protect, adminOnly, adminUserController.updateUser);

router.delete('/:id', protect, adminOnly, adminUserController.deleteUser);

module.exports = router;
