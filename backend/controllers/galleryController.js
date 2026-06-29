const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = async (req, res) => {
  try {
    const { category, type } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.mediaType = type;

    const items = await Gallery.find(filter).sort({ date: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryItem = async (req, res) => {
  const { titleEN, titleTA, url, mediaType, category } = req.body;

  if (!titleEN || !titleTA || !url) {
    return res.status(400).json({ message: 'Title and URL are required' });
  }

  try {
    const item = new Gallery({
      titleEN,
      titleTA,
      url,
      mediaType: mediaType || 'photo',
      category: category || 'general',
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (item) {
      // If local file, delete it
      if (item.url.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', item.url);
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Error deleting file: ${err.message}`);
        });
      }

      await Gallery.deleteOne({ _id: req.params.id });
      res.json({ message: 'Gallery item removed' });
    } else {
      res.status(404).json({ message: 'Gallery item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
};
