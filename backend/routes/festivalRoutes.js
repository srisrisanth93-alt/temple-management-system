const express = require('express');
const router = express.Router();
const {
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival,
} = require('../controllers/festivalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFestivals)
  .post(protect, createFestival);

router.route('/:id')
  .put(protect, updateFestival)
  .delete(protect, deleteFestival);

module.exports = router;
