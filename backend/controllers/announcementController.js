const Announcement = require('../models/Announcement');

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({}).sort({ pinned: -1, date: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = async (req, res) => {
  const { titleEN, titleTA, contentEN, contentTA, pinned } = req.body;

  if (!titleEN || !titleTA || !contentEN || !contentTA) {
    return res.status(400).json({ message: 'Please fill in all bilingual fields' });
  }

  try {
    const announcement = new Announcement({
      titleEN,
      titleTA,
      contentEN,
      contentTA,
      pinned: pinned || false,
    });

    const createdAnnouncement = await announcement.save();
    res.status(201).json(createdAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
const updateAnnouncement = async (req, res) => {
  const { titleEN, titleTA, contentEN, contentTA, pinned } = req.body;

  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      announcement.titleEN = titleEN || announcement.titleEN;
      announcement.titleTA = titleTA || announcement.titleTA;
      announcement.contentEN = contentEN || announcement.contentEN;
      announcement.contentTA = contentTA || announcement.contentTA;
      announcement.pinned = pinned !== undefined ? pinned : announcement.pinned;

      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await Announcement.deleteOne({ _id: req.params.id });
      res.json({ message: 'Announcement removed' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
