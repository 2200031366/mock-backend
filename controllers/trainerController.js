const Trainer = require("../models/Trainer");
const Course = require("../models/Course");
const CourseApplicant = require("../models/CourseApplicant");

// Trainer Login
const checktrainerlogin = async (req, res) => {
  try {
    const input = req.body;
    const trainer = await Trainer.findOne(input);
    res.json(trainer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add New Course
const addcourse = async (req, res) => {
  try {
    const input = req.body;
    const course = new Course(input);
    await course.save();
    res.status(200).send("Course Posted Successfully");
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
};

// View Courses Posted by Trainer
const viewcourses = async (req, res) => {
  try {
    const username = req.params.username;
    const courses = await Course.find({ "trainer.username": username });
    if (courses.length === 0) {
      res.status(200).send("DATA NOT FOUND");
    } else {
      res.json(courses);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// View Course Applicants
const viewcourseapplicants = async (req, res) => {
  try {
    const username = req.params.username;
    const courses = await Course.find({ "trainer.username": username });

    if (courses.length === 0) {
      return res.status(200).send("No courses found for this trainer");
    }

    const courseIds = courses.map(course => course.courseid);
    const applicants = await CourseApplicant.find({ courseid: { $in: courseIds } });

    if (applicants.length === 0) {
      return res.status(200).send("No applicants found for these courses");
    }

    res.json(applicants);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Change Course Enrollment Status
const changecoursestatus = async (req, res) => {
  try {
    const { applicantId, status } = req.body;

    if (!applicantId || !status) {
      return res.status(400).send("Applicant ID and status are required");
    }

    await CourseApplicant.findOneAndUpdate(
      { applicantId },
      { $set: { courseStatus: status } },
      { new: true }
    );

    res.status(200).send("Course Enrollment Status Updated Successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  checktrainerlogin,
  addcourse,
  viewcourses,
  viewcourseapplicants,
  changecoursestatus,
};
