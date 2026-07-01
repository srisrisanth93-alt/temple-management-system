const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'templeSecretKeyKey123!', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auto-seed default admin if none exist (Force reset to user phone/pass for recovery)
const seedAdmin = async () => {
  try {
    // Delete any old admin records (like username 'admin') to ensure ONLY ONE admin exists
    await Admin.deleteMany({ username: { $ne: '6383661817' } });

    let admin = await Admin.findOne({ username: '6383661817' });
    if (!admin) {
      admin = new Admin({
        username: '6383661817',
        password: 'youngstars', // Will be hashed by pre-save middleware
      });
      await admin.save();
      console.log('Default admin seeded successfully: 6383661817 / youngstars');
    } else {
      admin.password = 'youngstars';
      await admin.save();
      console.log('Forced reset admin password to youngstars on boot');
    }
  } catch (error) {
    console.error(`Error seeding/resetting admin: ${error.message}`);
  }
};

// @desc    Update admin password
// @route   PUT /api/auth/update-password
// @access  Private
const updateAdminPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin && (await admin.matchPassword(currentPassword))) {
      admin.password = newPassword;
      await admin.save();
      res.json({ message: 'Password updated successfully' });
    } else {
      res.status(400).json({ message: 'Incorrect current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forceResetDbNow = async (req, res) => {
  try {
    // Delete any old admin records to ensure ONLY ONE admin exists
    await Admin.deleteMany({ username: { $ne: '6383661817' } });

    let admin = await Admin.findOne({ username: '6383661817' });
    if (!admin) {
      admin = new Admin({
        username: '6383661817',
        password: 'youngstars',
      });
      await admin.save();
    } else {
      admin.password = 'youngstars';
      await admin.save();
    }
    res.json({ message: 'Live database admin successfully reset to 6383661817 / youngstars!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  seedAdmin,
  updateAdminPassword,
  forceResetDbNow,
};
