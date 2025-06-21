const mongoose = require('mongoose');
const moment = require('moment-timezone');

const courseApplicantSchema = new mongoose.Schema({
  applicantId: {
    type: String,
    unique: true,
    required: true,
    default: () => generateRandomId()
  },
  // Value from Course model
  courseId: {
    type: Number,
    required: true
  },
  // Value from Learner model
  learnerEmail: {
    type: String,
    required: true
  },
  courseStatus: {
    type: String,
    required: true,
    default: "ENROLLED"
  },
  enrolledTime: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
  }
});

const CourseApplicant = mongoose.model('CourseApplicant', courseApplicantSchema);

function generateRandomId() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return "C" + randomNumber;
}

module.exports = CourseApplicant;
