const Learner = require("../models/Learner");
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");
const Course = require("../models/Course");
const CourseApplicant = require("../models/CourseApplicant");

// ✅ View Learners
const viewLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    if (!learners.length) return res.status(404).send("No learners found");
    res.json(learners);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ Delete Learner
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

// ✅ View Learner Profile
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

// ✅ Admin Login
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

// ✅ Change Admin Password
const changeAdminPwd = async (req, res) => {
  try {
    const { username, oldpassword, newpassword } = req.body;
    const admin = await Admin.findOne({ username, password: oldpassword });

    if (!admin) return res.status(400).send("Invalid Old Password");
    if (oldpassword === newpassword) return res.status(400).send("New password cannot be same as old password");

    await Admin.updateOne({ username }, { $set: { password: newpassword } });
    res.status(200).send("Password Updated Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ Add Trainer
const addTrainer = async (req, res) => {
  try {
    const { fullname, username, email, password, contact } = req.body;

    if (!fullname || !username || !email || !password || !contact) {
      return res.status(400).send("All fields are required");
    }

    const existingTrainer = await Trainer.findOne({ username });
    if (existingTrainer) {
      return res.status(400).send("Username already exists");
    }

    const trainer = new Trainer({ fullname, username, email, password, contact });
    await trainer.save();

    res.status(200).send("Trainer added successfully");
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

// ✅ View Trainers
const viewTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    if (!trainers.length) return res.status(404).send("No trainers found");
    res.json(trainers);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ Delete Trainer
const deleteTrainer = async (req, res) => {
  try {
    const email = req.params.email;
    const trainer = await Trainer.findOne({ email });
    if (!trainer) return res.status(404).send("Trainer Email Not Found");
    await Trainer.deleteOne({ email });
    res.status(200).send("Trainer Deleted Successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ View Trainer Profile
const viewTrainerProfile = async (req, res) => {
  try {
    const email = req.params.email;
    const trainer = await Trainer.findOne({ email });
    if (!trainer) return res.status(404).send("Trainer not found with the provided email id");
    res.json(trainer);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ✅ Dashboard Analysis
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

// ✅ Add Course (with file upload)
const addCourse = async (req, res) => {
  try {
    console.log("Incoming form data:", req.body);
    console.log("Uploaded file info:", req.file);

    const { title, trainerName, description, startDate, duration } = req.body;

    if (!title || !trainerName) {
      return res.status(400).send("Title and Trainer Name are required");
    }

    const newCourse = new Course({
      title,
      trainerName,
      description,
      startDate,
      duration,
      file: req.file ? req.file.filename : null,
    });

    await newCourse.save();
    res.status(201).send("Course Added Successfully");
  } catch (error) {
    console.error("Error in addCourse:", error);  // 👈 this will show real issue in terminal
    res.status(500).send(error.message);
  }
};

// ✅ View Courses
const viewCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses.length) return res.status(404).send("No courses found");
    res.json(courses);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  // Learners
  viewLearners,
  deleteLearner,
  viewLearnerProfile,

  // Admin
  checkAdminLogin,
  changeAdminPwd,
  analysis,

  // Trainers
  addTrainer,
  viewTrainers,
  deleteTrainer,
  viewTrainerProfile,

  // Courses
  addCourse,
  viewCourses,
};
