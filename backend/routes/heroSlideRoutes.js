const express = require('express');
const router = express.Router();
const {
  getHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} = require('../controllers/heroSlideController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHeroSlides)
  .post(protect, createHeroSlide);

router.route('/:id')
  .delete(protect, deleteHeroSlide);

module.exports = router;
