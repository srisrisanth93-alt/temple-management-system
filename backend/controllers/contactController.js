const ContactMessage = require('../models/ContactMessage');

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ date: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    const contactMessage = new ContactMessage({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    const createdMessage = await contactMessage.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contact/:id
// @access  Private/Admin
const updateContactMessageStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
      message.status = status || message.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (message) {
      await ContactMessage.deleteOne({ _id: req.params.id });
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactMessages,
  createContactMessage,
  updateContactMessageStatus,
  deleteContactMessage,
};
