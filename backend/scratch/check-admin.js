const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');
require('dotenv').config();

const run = async () => {
  await connectDB();
  try {
    const admins = await Admin.find({});
    console.log('--- ADMIN LIST ---');
    console.log(admins.map(a => ({ id: a._id, username: a.username })));
    
    // Delete any old admin records (like username 'admin') to ensure ONLY ONE admin exists
    await Admin.deleteMany({ username: { $ne: '6383661817' } });

    let admin = await Admin.findOne({ username: '6383661817' });
    if (!admin) {
      console.log('No admins found, seeding 6383661817 / youngstars...');
      admin = new Admin({
        username: '6383661817',
        password: 'youngstars',
      });
      await admin.save();
      console.log('Admin seeded!');
    } else {
      admin.password = 'youngstars';
      await admin.save();
      console.log('Reset admin password to youngstars!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

run();
