const Learner = require("../models/Learner");
const Course = require("../models/Course");
const CourseApplicant = require("../models/CourseApplicant");

// Register Learner
const insertlearner = async (req, res) => {
  try {
    const input = req.body;
    const learner = new Learner(input);
    await learner.save();
    res.status(200).send("Registered Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// Update Learner Profile
const updatelearnerprofile = async (req, res) => {
  try {
    const input = req.body;
    const email = input.email;
    const learner = await Learner.findOne({ email });

    if (!learner) {
      return res.status(200).send("Learner not found with the provided email id");
    }

    for (const key in input) {
      if (key !== 'email' && input[key]) {
        learner[key] = input[key];
      }
    }

    await learner.save();
    res.status(200).send("Learner Profile Updated Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// Login
const checklearnerlogin = async (req, res) => {
  try {
    const input = req.body;
    const learner = await Learner.findOne(input);
    res.json(learner);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get Profile by Email
const learnerprofile = async (req, res) => {
  try {
    const email = req.params.email;
    const learner = await Learner.findOne({ email });

    if (learner) {
      res.json(learner);
    } else {
      res.status(200).send("Learner not found with the provided email id");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View All Courses
const viewcourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      res.status(200).send("DATA NOT FOUND");
    } else {
      res.json(courses);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View Enrolled Courses
const enrolledcourses = async (req, res) => {
  try {
    const email = req.params.email;
    const enrolled = await CourseApplicant.find({ jobseekeremail: email }); // field unchanged
    if (enrolled.length === 0) {
      res.status(200).send("DATA NOT FOUND");
    } else {
      res.json(enrolled);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Enroll in a Course
const enrollcourse = async (req, res) => {
  try {
    const input = req.body; // courseId and learner email
    const alreadyEnrolled = await CourseApplicant.findOne(input);

    if (!alreadyEnrolled) {
      const applicant = new CourseApplicant(input);
      await applicant.save();
      res.status(200).send("Course Enrolled Successfully");
    } else {
      res.status(200).send("You have already enrolled in this Course");
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  insertlearner,
  checklearnerlogin,
  updatelearnerprofile,
  learnerprofile,
  viewcourses,
  enrollcourse,
  enrolledcourses,
};
