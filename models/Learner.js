const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'others']
  },
  dateofbirth: {
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
  location: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true,
    unique: true
  }
});

const Learner = mongoose.model('Learner', learnerSchema);

module.exports = Learner;
