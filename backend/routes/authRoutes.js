const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, updateAdminPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.put('/update-password', protect, updateAdminPassword);

module.exports = router;
