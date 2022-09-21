const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  creditHour: {
    required: true,
    type: Number,
  },
  lecture: {
    required: true,
    type: Number,
  },
  practical: {
    required: true,
    type: Number,
  },
  alias: {
    required: true,
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
