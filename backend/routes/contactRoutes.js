const express = require('express');
const router = express.Router();
const {
  getContactMessages,
  createContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getContactMessages)
  .post(createContactMessage);

router.route('/:id')
  .put(protect, updateContactMessageStatus)
  .delete(protect, deleteContactMessage);

module.exports = router;
