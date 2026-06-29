const mongoose = require('mongoose');

const PoojaTimingSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  nameTA: {
    type: String,
    required: true,
  },
});

const FestivalSchema = new mongoose.Schema({
  nameEN: {
    type: String,
    required: true,
    trim: true,
  },
  nameTA: {
    type: String,
    required: true,
    trim: true,
  },
  descriptionEN: {
    type: String,
    required: true,
  },
  descriptionTA: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  poojaTimings: [PoojaTimingSchema],
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Festival', FestivalSchema);
