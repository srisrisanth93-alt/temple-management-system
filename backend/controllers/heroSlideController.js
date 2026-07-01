const HeroSlide = require('../models/HeroSlide');
const fs = require('fs');
const path = require('path');

// @desc    Get all hero slides
// @route   GET /api/hero-slides
// @access  Public
const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({}).sort({ createdAt: 1 });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a hero slide
// @route   POST /api/hero-slides
// @access  Private/Admin
const createHeroSlide = async (req, res) => {
  const { image, quoteTA, titleEN, subtitleEN } = req.body;

  if (!image) {
    return res.status(400).json({ message: 'Please provide an image url' });
  }

  try {
    const slide = new HeroSlide({
      image,
      quoteTA: quoteTA || undefined,
      titleEN: titleEN || undefined,
      subtitleEN: subtitleEN || undefined,
    });

    const createdSlide = await slide.save();
    res.status(201).json(createdSlide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a hero slide
// @route   DELETE /api/hero-slides/:id
// @access  Private/Admin
const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    // Delete image file from local uploads directory if it exists
    if (slide.image && slide.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', slide.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await slide.deleteOne();
    res.json({ message: 'Hero slide removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
};
