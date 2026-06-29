const Donation = require('../models/Donation');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Private/Admin
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({}).sort({ date: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a donation (Simulate checkout)
// @route   POST /api/donations
// @access  Public
const createDonation = async (req, res) => {
  const { donorName, email, phone, amount, purpose, address } = req.body;

  if (!donorName || !email || !phone || !amount || !purpose) {
    return res.status(400).json({ message: 'Please fill in all required donor fields' });
  }

  try {
    // Generate a unique transaction id
    const transactionId = `TXN-TMP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const donation = new Donation({
      donorName,
      email,
      phone,
      amount,
      purpose,
      address: address || '',
      paymentStatus: 'Completed', // Simulating successful immediate payment
      transactionId,
    });

    const createdDonation = await donation.save();
    res.status(201).json(createdDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get donation by ID (for receipt)
// @route   GET /api/donations/:id
// @access  Public
const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (donation) {
      res.json(donation);
    } else {
      res.status(404).json({ message: 'Donation record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDonations,
  createDonation,
  getDonationById,
};
