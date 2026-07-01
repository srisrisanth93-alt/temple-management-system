const HistoryPoint = require('../models/HistoryPoint');

// @desc    Get all history points
// @route   GET /api/history-points
// @access  Public
const getHistoryPoints = async (req, res) => {
  try {
    const points = await HistoryPoint.find({}).sort({ order: 1, createdAt: 1 });
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a history point
// @route   POST /api/history-points
// @access  Private/Admin
const createHistoryPoint = async (req, res) => {
  const { content, order } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Please provide content' });
  }

  try {
    const point = new HistoryPoint({
      content,
      order: order !== undefined ? order : 0,
    });

    const createdPoint = await point.save();
    res.status(201).json(createdPoint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a history point
// @route   DELETE /api/history-points/:id
// @access  Private/Admin
const deleteHistoryPoint = async (req, res) => {
  try {
    const point = await HistoryPoint.findById(req.params.id);

    if (!point) {
      return res.status(404).json({ message: 'History point not found' });
    }

    await point.deleteOne();
    res.json({ message: 'History point removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auto-seed default history points if none exist
const seedHistoryPoints = async () => {
  try {
    const count = await HistoryPoint.countDocuments();
    if (count === 0) {
      const defaultPoints = [
        "முனியப்பன் சாமி தமிழ்நாட்டின் கிராமப்புறங்களில் வழிபடப்படும் சக்தி வாய்ந்த காவல் தெய்வமாக கருதப்படுகிறார்.",
        "கிராம மக்களை தீய சக்திகள் மற்றும் இயற்கை பேரிடர்களிலிருந்து காப்பவர் என்று நம்பப்படுகிறது.",
        "முனியப்பன் சாமி நீதியையும் தர்மத்தையும் காக்கும் தெய்வமாக போற்றப்படுகிறார்.",
        "கிராம எல்லைகளில் முனியப்பன் கோவில்கள் அதிகமாக அமைக்கப்பட்டுள்ளன.",
        "பнятாளிகளின் வேண்டுதல்களை நிறைவேற்றும் அருள்மிகு தெய்வமாக மக்கள் நம்பிக்கை கொண்டுள்ளனர்.",
        "விவசாயம் செழிக்கவும், மழை பொழியவும் முனியப்பன் சாமியிடம் பிரார்த்தனை செய்யும் வழக்கம் உள்ளது.",
        "ஆண்டுதோறும் சிறப்பு பூஜைகள் மற்றும் திருவிழாக்கள் சிறப்பாக நடத்தப்படுகின்றன.",
        "வெள்ளிக்கிழமைகளிலும், அமாவாசை நாட்களிலும் பக்தர்கள் அதிக அளவில் வழிபாடு செய்கின்றனர்.",
        "முனியப்பன் சாமி பக்தர்களுக்கு தைரியம், நம்பிக்கை மற்றும் பாதுகாப்பை அளிப்பவர் என கருதப்படுகிறார்.",
        "அதனால் முனியப்பன் சாமி தமிழர் பாரம்பரியத்தின் முக்கியமான காவல் தெய்வங்களில் ஒருவராக இன்று வரை பக்தியுடன் வழிபடப்பட்டு வருகிறார். 🙏🛕"
      ];

      const seedData = defaultPoints.map((text, idx) => ({
        content: text,
        order: idx + 1,
      }));

      await HistoryPoint.insertMany(seedData);
      console.log('Default history points seeded successfully!');
    }
  } catch (error) {
    console.error(`Error seeding history points: ${error.message}`);
  }
};

module.exports = {
  getHistoryPoints,
  createHistoryPoint,
  deleteHistoryPoint,
  seedHistoryPoints,
};
