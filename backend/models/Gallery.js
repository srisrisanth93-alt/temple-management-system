const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
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
  url: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['photo', 'video'],
    default: 'photo',
  },
  category: {
    type: String,
    default: 'general',
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Gallery', GallerySchema);
