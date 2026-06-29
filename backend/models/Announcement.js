const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  titleEN: {
    type: String,
    required: true,
    trim: true,
  },
  titleTA: {
    type: String,
    required: true,
    trim: true,
  },
  contentEN: {
    type: String,
    required: true,
  },
  contentTA: {
    type: String,
    required: true,
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
