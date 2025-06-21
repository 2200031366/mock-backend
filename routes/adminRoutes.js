const adminController = require("../controllers/adminController");
const express = require("express");
const multer = require("multer");
const adminRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './media/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage: storage });

// Learners
adminRouter.get("/viewlearners", adminController.viewLearners);
adminRouter.delete("/deletelearner/:email", adminController.deleteLearner);
adminRouter.get("/viewlearnerprofile/:email", adminController.viewLearnerProfile);

// Admin Login & Password
adminRouter.post("/checkadminlogin", adminController.checkAdminLogin);
adminRouter.put("/changeadminpwd", adminController.changeAdminPwd);

// Trainers
adminRouter.post("/addtrainer", adminController.addTrainer);
adminRouter.get("/viewtrainers", adminController.viewTrainers);
adminRouter.delete("/deletetrainer/:username", adminController.deleteTrainer);

// Dashboard Analysis
adminRouter.get("/analysis", adminController.analysis);

// Courses
adminRouter.post("/addcourse", upload.single("file"), adminController.addCourse);
adminRouter.get("/viewcourses", adminController.viewCourses);

module.exports = adminRouter;
