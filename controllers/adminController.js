const Learner = require("../models/Learner");
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");
const Course = require("../models/Course");
const CourseApplicant = require("../models/CourseApplicant");

// View Learners
const viewLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    if (learners.length === 0) return res.status(404).send("No learners found");
    res.json(learners);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete Learner
const deleteLearner = async (req, res) => {
  try {
    const email = req.params.email;
    const learner = await Learner.findOne({ email });
    if (!learner) return res.status(404).send("Learner Email ID Not Found");
    await Learner.deleteOne({ email });
    res.status(200).send("Learner Deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Check Admin Login
const checkAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (!admin) return res.status(401).send("Invalid credentials");
    res.json(admin);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add Trainer
const addTrainer = async (req, res) => {
  try {
    const input = req.body;
    const trainer = new Trainer(input);
    await trainer.save();
    res.status(201).send('Trainer Added Successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// View Trainers
const viewTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (trainers.length === 0) return res.status(404).send("No trainers found");
    res.json(trainers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete Trainer
const deleteTrainer = async (req, res) => {
  try {
    const username = req.params.username;
    const trainer = await Trainer.findOne({ username });
    if (!trainer) return res.status(404).send("Trainer Username Not Found");
    await Trainer.deleteOne({ username });
    res.status(200).send("Trainer Deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Change Admin Password
const changeAdminPwd = async (req, res) => {
  try {
    const { username, oldpassword, newpassword } = req.body;
    const admin = await Admin.findOne({ username, password: oldpassword });
    if (!admin) return res.status(400).send('Invalid Old Password');
    if (oldpassword === newpassword) return res.status(400).send('New password cannot be same as old password');

    await Admin.updateOne({ username }, { $set: { password: newpassword } });
    res.status(200).send('Password Updated Successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Admin Dashboard Analytics
const analysis = async (req, res) => {
  try {
    const courseCount = await Course.countDocuments();
    const trainerCount = await Trainer.countDocuments();
    const learnerCount = await Learner.countDocuments();

    res.json({ courseCount, trainerCount, learnerCount });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// View Learner Profile
const viewLearnerProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const learner = await Learner.findOne({ email });
    if (!learner) return res.status(404).send("Learner not found with the provided email id");
    res.json(learner);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add Course
const addCourse = async (req, res) => {
  try {
    const { title, trainerName, description, startDate, duration } = req.body;

    if (!title || !trainerName) return res.status(400).send("Title and Trainer Name are required");

    const newCourse = new Course({
      title,
      trainerName,
      description,
      startDate,
      duration,
    });

    await newCourse.save();
    res.status(201).send("Course Added Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View Courses (added missing function)
const viewCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) return res.status(404).send("No courses found");
    res.json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  viewLearners,
  deleteLearner,
  checkAdminLogin,
  addTrainer,
  viewTrainers,
  deleteTrainer,
  changeAdminPwd,
  analysis,
  viewLearnerProfile,
  addCourse,
  viewCourses,
};
