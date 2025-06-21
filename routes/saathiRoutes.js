// saathiRoutes.js

const saathiController = require("../controllers/saathiController");
const express = require("express");
const saathiRouter = express.Router();

// Saathi Login
saathiRouter.post("/checksaathilogin", saathiController.checksaathilogin);

// View Learners Assigned to This Saathi
saathiRouter.get("/viewassignedlearners/:username", saathiController.viewassignedlearners);

// Update Saathi Profile
saathiRouter.put("/updatesaathiprofile", saathiController.updatesaathiprofile);

module.exports = saathiRouter;
