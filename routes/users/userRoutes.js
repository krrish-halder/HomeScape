const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const userController = require('../../controllers/Users/userController');
const upload = require('../../middleware/multerMiddleware');

router.get('/me', protect, userController.getMe);
router.put('/me', protect, upload.single('profile_photo'), userController.updateMe);

router.get('/getProperties', protect, userController.getUserProperties);
module.exports = router;