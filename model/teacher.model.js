const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  workload: {
    required: true,
    type: Number,
  },
  type: {
    required: true,
    type: String,
    enum: ["full-time", "part-time"],
    default: "full-time",
  },
  subjects: {
    type: [mongoose.Types.ObjectId],
    ref: "Subject",
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  initial: {
    required: true,
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
