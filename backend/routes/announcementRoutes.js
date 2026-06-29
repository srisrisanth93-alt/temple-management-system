const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAnnouncements)
  .post(protect, createAnnouncement);

router.route('/:id')
  .put(protect, updateAnnouncement)
  .delete(protect, deleteAnnouncement);

module.exports = router;
