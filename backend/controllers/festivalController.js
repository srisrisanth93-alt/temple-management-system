const Festival = require('../models/Festival');

// @desc    Get all festivals
// @route   GET /api/festivals
// @access  Public
const getFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find({}).sort({ date: 1 });
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a festival
// @route   POST /api/festivals
// @access  Private/Admin
const createFestival = async (req, res) => {
  const { nameEN, nameTA, descriptionEN, descriptionTA, date, poojaTimings, image } = req.body;

  if (!nameEN || !nameTA || !descriptionEN || !descriptionTA || !date) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const festival = new Festival({
      nameEN,
      nameTA,
      descriptionEN,
      descriptionTA,
      date,
      poojaTimings: poojaTimings || [],
      image: image || '',
    });

    const createdFestival = await festival.save();
    res.status(201).json(createdFestival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a festival
// @route   PUT /api/festivals/:id
// @access  Private/Admin
const updateFestival = async (req, res) => {
  const { nameEN, nameTA, descriptionEN, descriptionTA, date, poojaTimings, image } = req.body;

  try {
    const festival = await Festival.findById(req.params.id);

    if (festival) {
      festival.nameEN = nameEN || festival.nameEN;
      festival.nameTA = nameTA || festival.nameTA;
      festival.descriptionEN = descriptionEN || festival.descriptionEN;
      festival.descriptionTA = descriptionTA || festival.descriptionTA;
      festival.date = date || festival.date;
      festival.poojaTimings = poojaTimings || festival.poojaTimings;
      festival.image = image !== undefined ? image : festival.image;

      const updatedFestival = await festival.save();
      res.json(updatedFestival);
    } else {
      res.status(404).json({ message: 'Festival not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a festival
// @route   DELETE /api/festivals/:id
// @access  Private/Admin
const deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);

    if (festival) {
      await Festival.deleteOne({ _id: req.params.id });
      res.json({ message: 'Festival removed' });
    } else {
      res.status(404).json({ message: 'Festival not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFestivals,
  createFestival,
  updateFestival,
  deleteFestival,
};
