const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true,
    min: 6,
    max: 255,
  },
  lname: {
    type: String,
    trim: true,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["admin", "teacher"],
    default: "teacher",
  },
});

module.exports = mongoose.model("User", userSchema);
