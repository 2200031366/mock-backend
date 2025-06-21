const mongoose = require('mongoose');
const moment = require('moment-timezone');

const courseschema = new mongoose.Schema({
  courseId: {
    type: Number,
    unique: true,
    required: true,
    default: () => generateRandomId()
  },
  title: {
    type: String,
    required: true
  },
  category: {  // similar to company
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  fee: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 100;
      },
      message: 'Fee must be at least 100'
    }
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  postedTime: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
  },
  trainer: {
    type: Object,
    required: true
  }
});

const Course = mongoose.model('Course', courseschema);

function generateRandomId() {
  return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = Course;
