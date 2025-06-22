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
// Update Learner Profile
const updateLearner = async (req, res) => {
  try {
    const email = req.params.email;
    const updated = await Learner.findOneAndUpdate({ email }, req.body, { new: true });
    if (!updated) return res.status(404).send("Learner not found");
    res.send("Learner profile updated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// Enroll in a course (request access)




// Enroll in a Course
// Enroll in a Course (Learner requests, Trainer approves)
const enrollcourse = async (req, res) => {
  try {
    const { learneremail, courseid, coursename, trainername, duration } = req.body;

    // Check if already enrolled (or already requested)
    const alreadyEnrolled = await CourseApplicant.findOne({ learneremail, courseid });

    if (alreadyEnrolled) {
      return res.status(200).send("You have already applied for this course.");
    }

    const applicant = new CourseApplicant({
      learneremail,
      courseid,
      coursename,
      trainername,
      duration,
      status: "Pending"
    });

    await applicant.save();
    res.status(200).send("Enrollment request sent. Awaiting trainer approval.");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
// Update role after approval (Alumni/Trainer)
const selectRole = async (req, res) => {
  const { applicantId, selectedRole } = req.body;
  try {
    const updated = await CourseApplicant.findByIdAndUpdate(
      applicantId,
      { role: selectedRole },
      { new: true }
    );

    if (!updated) {
      return res.status(404).send("Enrollment not found");
    }

    res.send("Role updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};




module.exports = {
  insertlearner,
  checklearnerlogin,
  updatelearnerprofile,
  selectRole,
  learnerprofile,
  viewcourses,
  updateLearner,
  enrollcourse,
  enrolledcourses,
};
