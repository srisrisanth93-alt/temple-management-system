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
    
    // If no admin, seed default
    if (admins.length === 0) {
      console.log('No admins found, seeding admin/admin123...');
      const defaultAdmin = new Admin({
        username: 'admin',
        password: 'admin123',
      });
      await defaultAdmin.save();
      console.log('Admin seeded!');
    } else {
      // Let's reset the first admin's password to admin123 to make sure they can login!
      const firstAdmin = admins[0];
      firstAdmin.username = 'admin';
      firstAdmin.password = 'admin123';
      await firstAdmin.save();
      console.log('Reset admin password to admin123!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

run();
