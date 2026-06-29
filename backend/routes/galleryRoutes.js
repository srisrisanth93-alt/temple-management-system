const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getGalleryItems)
  .post(protect, createGalleryItem);

router.route('/:id')
  .delete(protect, deleteGalleryItem);

// Media upload endpoint (handles upload and returns the static URL path)
router.post('/upload', protect, upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded or invalid file type' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'File uploaded successfully',
    url: fileUrl,
  });
});

module.exports = router;
