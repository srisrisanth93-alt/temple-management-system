const express = require('express');
const router = express.Router();
const {
  getDonations,
  createDonation,
  getDonationById,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getDonations)
  .post(createDonation);

router.route('/:id')
  .get(getDonationById);

module.exports = router;
