const express = require('express');
const router = express.Router();
const { 
  loginAdmin, 
  getAdminProfile, 
  updateAdminPassword,
  forgotPasswordAdmin,
  verifyOtpAdmin,
  resetPasswordAdmin
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/forgot-password', forgotPasswordAdmin);
router.post('/verify-otp', verifyOtpAdmin);
router.post('/reset-password', resetPasswordAdmin);

router.get('/profile', protect, getAdminProfile);
router.put('/update-password', protect, updateAdminPassword);

module.exports = router;
