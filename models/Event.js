const mongoose = require("mongoose");

const eventschema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  file: {
    type: String // stores filename of image/pdf/etc.
  }
});

const Event = mongoose.model("Event", eventschema);

module.exports = Event;
