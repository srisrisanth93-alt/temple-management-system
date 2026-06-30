const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const { seedAdmin } = require('./controllers/authController');

// Route files
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const festivalRoutes = require('./routes/festivalRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const donationRoutes = require('./routes/donationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const festivalScheduleRoutes = require('./routes/festivalScheduleRoutes');
const { seedFestivalSchedules } = require('./controllers/festivalScheduleController');

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(() => {
  // Seed admin if database connection is successful
  seedAdmin();
  seedFestivalSchedules();
});

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/festivals', festivalRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/festival-schedules', festivalScheduleRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Temple Management API is running...');
});

// Custom 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

// Custom error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
