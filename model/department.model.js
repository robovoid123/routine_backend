const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  subjects: {
    required: true,
    type: [
      {
        subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
        teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
      },
    ],
  },
  semesters: {
    required: true,
    type: [{ type: mongoose.Types.ObjectId, ref: "Semester" }],
  },
});

module.exports = mongoose.model("Department", departmentSchema);
