const mongoose = require('mongoose');
const moment = require('moment-timezone');

const courseschema = new mongoose.Schema({
  courseId: {
    type: Number,
    unique: true,
    required: true,
    default: () => Math.floor(Math.random() * 900000) + 100000
  },
  title: {
    type: String,
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: false
  },
  postedTime: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
  }
});

const Course = mongoose.model('Course', courseschema);
module.exports = Course;
