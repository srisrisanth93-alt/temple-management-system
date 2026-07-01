const express = require('express');
const router = express.Router();
const { loginAdmin, getAdminProfile, updateAdminPassword, forceResetDbNow } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', protect, getAdminProfile);
router.put('/update-password', protect, updateAdminPassword);
router.get('/force-reset-db-now', forceResetDbNow);

module.exports = router;
