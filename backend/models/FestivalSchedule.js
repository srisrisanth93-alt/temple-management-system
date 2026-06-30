const mongoose = require('mongoose');

const FestivalScheduleSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('FestivalSchedule', FestivalScheduleSchema);
