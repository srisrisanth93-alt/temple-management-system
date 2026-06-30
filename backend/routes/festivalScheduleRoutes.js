const express = require('express');
const router = express.Router();
const {
  getFestivalSchedules,
  createFestivalSchedule,
  updateFestivalSchedule,
  deleteFestivalSchedule,
} = require('../controllers/festivalScheduleController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getFestivalSchedules)
  .post(protect, createFestivalSchedule);

router.route('/:id')
  .put(protect, updateFestivalSchedule)
  .delete(protect, deleteFestivalSchedule);

module.exports = router;
