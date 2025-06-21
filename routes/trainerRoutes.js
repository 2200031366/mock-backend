const express = require("express");
const trainerController = require("../controllers/trainerController");

const trainerRouter = express.Router();

// Trainer Login
trainerRouter.post("/checktrainerlogin", trainerController.checktrainerlogin);

// Course Management
trainerRouter.post("/addcourse", trainerController.addcourse);
trainerRouter.get("/viewcourses/:username", trainerController.viewcourses);

// View Learners Applied for Trainer's Courses
trainerRouter.get("/viewcourseapplicants/:username", trainerController.viewcourseapplicants);

// Update Course Application Status
trainerRouter.post("/changecoursestatus", trainerController.changecoursestatus);

module.exports = trainerRouter;
