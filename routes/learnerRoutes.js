const learnerController = require("../controllers/learnerController");
const express = require("express");
const learnerRouter = express.Router();

// Registration and Login
learnerRouter.post("/insertlearner", learnerController.insertlearner);
learnerRouter.post("/checklearnerlogin", learnerController.checklearnerlogin);

// Profile Management
learnerRouter.put("/updatelearnerprofile", learnerController.updatelearnerprofile);
learnerRouter.get("/learnerprofile/:email", learnerController.learnerprofile);

// ✅ Add this missing route (important!)
learnerRouter.put("/update/:email", learnerController.updateLearner);

// ✅ Also alias for frontend consistency
learnerRouter.get("/viewlearnerprofile/:email", learnerController.learnerprofile);

// View Courses & Enroll
learnerRouter.get("/viewcourses", learnerController.viewcourses);
learnerRouter.post("/enrollcourse", learnerController.enrollcourse);
learnerRouter.get("/enrolledcourses/:email", learnerController.enrolledcourses);
learnerRouter.put("/selectrole", learnerController.selectRole);


module.exports = learnerRouter;
