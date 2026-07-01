const express = require('express');
const router = express.Router();
const {
  getHistoryPoints,
  createHistoryPoint,
  deleteHistoryPoint,
} = require('../controllers/historyPointController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHistoryPoints)
  .post(protect, createHistoryPoint);

router.route('/:id')
  .delete(protect, deleteHistoryPoint);

module.exports = router;
