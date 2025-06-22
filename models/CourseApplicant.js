const mongoose = require("mongoose");

const CourseApplicantSchema = new mongoose.Schema({
  jobseekeremail: String,  // Learner's email
  courseid: String,
  coursename: String,
  trainername: String,
  duration: String,
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }
});

module.exports = mongoose.model("CourseApplicant", CourseApplicantSchema);
