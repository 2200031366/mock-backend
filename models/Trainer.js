const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    unique: true
  }
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
