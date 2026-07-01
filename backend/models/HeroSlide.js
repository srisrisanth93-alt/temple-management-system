const mongoose = require('mongoose');

const HeroSlideSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  quoteTA: {
    type: String,
    default: 'நம்பி வந்த பக்தர்களை என்றும் கைவிடாத காவல் தெய்வம் – ஸ்ரீ முனியப்பன் சுவாமி.',
  },
  titleEN: {
    type: String,
    default: 'MUNIYAPPAN',
  },
  subtitleEN: {
    type: String,
    default: 'SWAMY TEMPLE',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('HeroSlide', HeroSlideSchema);
