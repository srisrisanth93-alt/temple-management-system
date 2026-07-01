const mongoose = require('mongoose');

const HistoryPointSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HistoryPoint', HistoryPointSchema);
