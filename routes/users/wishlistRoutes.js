const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/authMiddleware');
const wishlistController = require('../../controllers/Users/wishlistController');

router.post('/toggle', protect, wishlistController.toggleWishlist);

router.get('/', protect, wishlistController.getWishlist);

module.exports = router;
