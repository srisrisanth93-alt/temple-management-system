const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'templeSecretKeyKey123!', {
    expiresIn: '30d',
  });
};

// Send OTP via Nodemailer helper
const sendOtpEmail = async (email, otp) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('--- SMTP credentials not configured. Skipping real mail. ---');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"Sri Muniyappan Temple Admin" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Sri Muniyappan Temple Admin - Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #cca43b; border-radius: 10px; padding: 20px; background-color: #fcfaf7;">
        <h2 style="color: #4a080a; border-bottom: 2px solid #cca43b; padding-bottom: 10px; font-family: 'Georgia', serif; text-align: center;">Verification Code (OTP)</h2>
        <p style="font-size: 15px; color: #333; line-height: 1.6;">A request was made to reset the admin password for Sri Muniyappan Temple Management System.</p>
        <p style="font-size: 15px; color: #333; line-height: 1.6;">Please use the following 6-digit Verification Code (OTP) to reset your password. This code is valid for 10 minutes.</p>
        <div style="background-color: #4a080a; color: #ffffff; padding: 15px; text-align: center; border-radius: 8px; font-size: 28px; font-weight: bold; letter-spacing: 6px; margin: 25px 0; border: 1px solid #cca43b; text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
          ${otp}
        </div>
        <p style="color: #777; font-size: 12px; margin-top: 25px; border-top: 1px solid #eee; padding-top: 10px; text-align: center;">
          If you did not request this, please ignore this email or contact support.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  return true;
};

// @desc    Auth admin & get token (support Email or Phone)
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body; // username holds either email or phone

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide email/phone and password' });
  }

  const cleanUser = username.trim();
  const cleanPass = password.trim();

  try {
    // Find admin by email or phone
    const admin = await Admin.findOne({
      $or: [
        { email: cleanUser.toLowerCase() },
        { phone: cleanUser }
      ]
    });

    if (admin) {
      const isMatch = await admin.matchPassword(cleanPass);
      if (isMatch) {
        return res.json({
          _id: admin._id,
          username: admin.username || admin.phone,
          email: admin.email,
          phone: admin.phone,
          token: generateToken(admin._id),
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email/phone or password',
      received: { username: cleanUser },
      expected: {
        email: "muniyappankovil07@gmail.com",
        phone: "6383661817",
        password: "youngstars"
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Request Password Reset OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPasswordAdmin = async (req, res) => {
  const { identifier } = req.body; // email or phone

  if (!identifier) {
    return res.status(400).json({ message: 'Please enter your email or phone number' });
  }

  const cleanId = identifier.trim();

  try {
    const admin = await Admin.findOne({
      $or: [
        { email: cleanId.toLowerCase() },
        { phone: cleanId }
      ]
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found with this email or phone number' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    admin.resetOtp = otp;
    admin.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

    console.log('====================================');
    console.log(`EMERGENCY RESET OTP FOR ${admin.email}:`, otp);
    console.log('====================================');

    let emailSent = false;
    try {
      emailSent = await sendOtpEmail(admin.email, otp);
    } catch (mailError) {
      console.error('Mail sending error:', mailError.message);
    }

    res.json({
      success: true,
      message: emailSent 
        ? 'A 6-digit verification code has been sent to your registered email address.' 
        : 'A 6-digit verification code has been generated. (Test Mode: Check the server console logs!)',
      simulated: !emailSent,
      // For development ease, we can include OTP in response if not in production
      otp: process.env.NODE_ENV !== 'production' ? otp : undefined
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtpAdmin = async (req, res) => {
  const { identifier, otp } = req.body;

  if (!identifier || !otp) {
    return res.status(400).json({ message: 'Please provide identifier and verification code' });
  }

  const cleanId = identifier.trim();
  const cleanOtp = otp.trim();

  try {
    const admin = await Admin.findOne({
      $or: [
        { email: cleanId.toLowerCase() },
        { phone: cleanId }
      ]
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    if (!admin.resetOtp || admin.resetOtp !== cleanOtp) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    if (admin.resetOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification code has expired. Please request a new one.' });
    }

    res.json({ success: true, message: 'Verification code verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset Password using OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPasswordAdmin = async (req, res) => {
  const { identifier, otp, newPassword } = req.body;

  if (!identifier || !otp || !newPassword) {
    return res.status(400).json({ message: 'Please provide all details including the new password' });
  }

  const cleanId = identifier.trim();
  const cleanOtp = otp.trim();

  try {
    const admin = await Admin.findOne({
      $or: [
        { email: cleanId.toLowerCase() },
        { phone: cleanId }
      ]
    });

    if (!admin) {
      return res.status(404).json({ message: 'Admin account not found' });
    }

    if (!admin.resetOtp || admin.resetOtp !== cleanOtp) {
      return res.status(400).json({ message: 'Verification failed. Invalid code.' });
    }

    if (admin.resetOtpExpires < Date.now()) {
      return res.status(400).json({ message: 'Verification code has expired.' });
    }

    // Set new password (bcrypt will hash it on pre-save hook)
    admin.password = newPassword;
    admin.resetOtp = undefined;
    admin.resetOtpExpires = undefined;
    await admin.save();

    res.json({ success: true, message: 'Your password has been successfully reset!' });
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

// @desc    Update admin password (from dashboard)
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

// @desc    Auto-seed default admin
const seedAdmin = async () => {
  try {
    // Delete any old admin records (like username 'admin') to ensure ONLY ONE admin exists
    await Admin.deleteMany({
      $or: [
        { username: 'admin' },
        { phone: { $ne: '6383661817' } }
      ]
    });

    let admin = await Admin.findOne({ phone: '6383661817' });
    if (!admin) {
      admin = new Admin({
        username: '6383661817',
        email: 'muniyappankovil07@gmail.com',
        phone: '6383661817',
        password: 'youngstars', // Will be hashed by pre-save middleware
      });
      await admin.save();
      console.log('Default admin seeded successfully: 6383661817 / youngstars');
    } else {
      admin.email = 'muniyappankovil07@gmail.com';
      admin.password = 'youngstars';
      await admin.save();
      console.log('Forced reset admin password to youngstars on boot');
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};

module.exports = {
  loginAdmin,
  getAdminProfile,
  seedAdmin,
  updateAdminPassword,
  forgotPasswordAdmin,
  verifyOtpAdmin,
  resetPasswordAdmin
};
