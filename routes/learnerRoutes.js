// learnerRoutes.js

const learnerController = require("../controllers/learnerController");
const express = require("express");
const learnerRouter = express.Router();

// Registration and Login
learnerRouter.post("/insertlearner", learnerController.insertlearner);
learnerRouter.post("/checklearnerlogin", learnerController.checklearnerlogin);

// Profile Management
learnerRouter.put("/updatelearnerprofile", learnerController.updatelearnerprofile);
learnerRouter.get("/learnerprofile/:email", learnerController.learnerprofile);

// View Courses & Enroll
learnerRouter.get("/viewcourses", learnerController.viewcourses); // ✅ updated name
learnerRouter.post("/enrollcourse", learnerController.enrollcourse); // ✅ updated name
learnerRouter.get("/enrolledcourses/:email", learnerController.enrolledcourses); // ✅ updated name

module.exports = learnerRouter;
