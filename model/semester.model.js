const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  semester: {
    required: true,
    type: Number,
  },
  subjects: {
    required: true,
    type: [{ type: mongoose.Types.ObjectId, ref: "Subject" }],
  },
  routine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine",
  },
});

module.exports = mongoose.module("Semester", semesterSchema);
