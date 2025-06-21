const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  fullname: {           // or username if you want
    type: String,
    required: true
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
  contact: {            // phone number
    type: String,
    required: true,
    unique: true
  }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
