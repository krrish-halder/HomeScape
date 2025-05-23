const express = require('express');
const router = express.Router();
const authController = require('../../controllers/Users/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify-token', authController.verifyToken);

module.exports = router;
