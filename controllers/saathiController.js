const Saathi = require("../models/Saathi");
const Learner = require("../models/Learner");

// Saathi Login
const checksaathilogin = async (req, res) => {
  try {
    const input = req.body;
    const saathi = await Saathi.findOne(input);
    res.json(saathi);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update Saathi Profile
const updatesaathiprofile = async (req, res) => {
  try {
    const input = req.body;
    const email = input.email;
    const saathi = await Saathi.findOne({ email });

    if (!saathi) {
      return res.status(200).send("Saathi not found with the provided email id");
    }

    for (const key in input) {
      if (key !== "email" && input[key]) {
        saathi[key] = input[key];
      }
    }

    await saathi.save();
    res.status(200).send("Saathi Profile Updated Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

// View Assigned Learners (Dummy logic: based on same location or any assigned mapping if exists)
const viewassignedlearners = async (req, res) => {
  try {
    const email = req.params.email;
    const saathi = await Saathi.findOne({ email });

    if (!saathi) {
      return res.status(200).send("Saathi not found");
    }

    // Example logic: get learners from same location (customize as needed)
    const learners = await Learner.find({ location: saathi.address });

    if (learners.length === 0) {
      return res.status(200).send("No learners found for this saathi");
    }

    res.json(learners);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  checksaathilogin,
  updatesaathiprofile,
  viewassignedlearners,
};
