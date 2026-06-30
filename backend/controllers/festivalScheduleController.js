const FestivalSchedule = require('../models/FestivalSchedule');

// @desc    Get all festival schedule items
// @route   GET /api/festival-schedules
// @access  Public
exports.getFestivalSchedules = async (req, res) => {
  try {
    const schedules = await FestivalSchedule.find().sort({ order: 1, createdAt: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching festival schedules', error: error.message });
  }
};

// @desc    Create a new festival schedule item
// @route   POST /api/festival-schedules
// @access  Private
exports.createFestivalSchedule = async (req, res) => {
  try {
    const { date, time, program, order } = req.body;
    if (!date || !time || !program) {
      return res.status(400).json({ message: 'Please provide date, time, and program' });
    }

    const schedule = new FestivalSchedule({
      date,
      time,
      program,
      order: order || 0
    });

    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating festival schedule', error: error.message });
  }
};

// @desc    Update a festival schedule item
// @route   PUT /api/festival-schedules/:id
// @access  Private
exports.updateFestivalSchedule = async (req, res) => {
  try {
    const { date, time, program, order } = req.body;
    const schedule = await FestivalSchedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule item not found' });
    }

    schedule.date = date || schedule.date;
    schedule.time = time || schedule.time;
    schedule.program = program || schedule.program;
    schedule.order = order !== undefined ? order : schedule.order;

    const updatedSchedule = await schedule.save();
    res.json(updatedSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error updating festival schedule', error: error.message });
  }
};

// @desc    Delete a festival schedule item
// @route   DELETE /api/festival-schedules/:id
// @access  Private
exports.deleteFestivalSchedule = async (req, res) => {
  try {
    const schedule = await FestivalSchedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule item not found' });
    }

    await schedule.deleteOne();
    res.json({ message: 'Schedule item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting festival schedule', error: error.message });
  }
};

// Seed default schedules
exports.seedFestivalSchedules = async () => {
  try {
    const count = await FestivalSchedule.countDocuments();
    if (count === 0) {
      const defaultSchedules = [
        {
          date: "ஆவணி மாதம் கடைசி புதன்கிழமை (10-09-2025)",
          time: "அதிகாலை 5:00 மணிக்குமேல் 9:00 மணிக்குள்",
          program: "சுவாமிக்கு காப்பு கட்டுதல், சுவாமிக்கு பூ போடுதல் மற்றும் பால்குடம் எடுப்பவர்களுக்கு காப்பு கட்டுதல்",
          order: 1
        },
        {
          date: "ஆவணி மாதம் கடைசி வெள்ளிக்கிழமை (12-09-2025)",
          time: "பகல் 12:00 மணிக்கு",
          program: "ஸ்ரீ சக்தி அழைத்தல், பால்குடம் எடுத்தல், பம்பை அடித்தல்",
          order: 2
        },
        {
          date: "ஆவணி மாதம் கடைசி வெள்ளிக்கிழமை (12-09-2025)",
          time: "மாலை 5:00 மணிக்கு",
          program: "ஸ்ரீ பராசக்தி அம்மனுக்கு அலங்காரபூஜை, ஊரணி பொங்கல், சர்க்கரை பொங்கல், அன்னதானம்",
          order: 3
        },
        {
          date: "ஆவணி மாதம் கடைசி சனிக்கிழமை (13-09-2025)",
          time: "காலை 8:00 மணிக்கு",
          program: "ஸ்ரீ முனியப்பனுக்கு பூஜை நடைபெறும்",
          order: 4
        },
        {
          date: "ஆவணி மாதம் கடைசி சனிக்கிழமை (13-09-2025)",
          time: "இரவு 12:00 மணிக்கு",
          program: "அலங்கார பூஜை, காவு பூஜை நடைபெறும்",
          order: 5
        },
        {
          date: "ஆவணி மாதம் கடைசி ஞாயிற்றுக்கிழமை (14-09-2025)",
          time: "காலை 6:00 மணிக்குமேல் 11:00 மணிக்குள்",
          program: "கிடா வெட்டு அன்னதானம் வழங்கப்படும்",
          order: 6
        },
        {
          date: "ஆவணி மாதம் கடைசி திங்கட்கிழமை (15-09-2025)",
          time: "காலை 6:00 மணிக்குமேல்",
          program: "ஸ்ரீ முனியப்பனுக்கு ஊரணி பொங்கல் நடைபெறும்",
          order: 7
        },
        {
          date: "ஆவணி மாதம் கடைசி செவ்வாய்க்கிழமை (16-09-2025)",
          time: "காலை 9:00 மணிக்குமேல்",
          program: "பெரியவர்கள், சிறியவர்களுக்கு விளையாட்டு போட்டி நடைபெறும்",
          order: 8
        },
        {
          date: "ஆவணி மாதம் கடைசி செவ்வாய்க்கிழமை (16-09-2025)",
          time: "பகல் 2:00 மணிக்கு",
          program: "மஞ்சள் நீராட்டுவிழா, மண்டல பூஜை நடைபெறும்",
          order: 9
        }
      ];

      await FestivalSchedule.insertMany(defaultSchedules);
      console.log('Festival schedules successfully seeded.');
    }
  } catch (error) {
    console.error('Error seeding festival schedules:', error.message);
  }
};
