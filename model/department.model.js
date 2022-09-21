const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    required: true,
    trim: true,
    type: String,
  },
  subjects: {
    required: true,
    type: [
      {
        subject: { type: mongoose.Types.ObjectId, ref: "Subject" },
        teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
        semester: {
          type: Number,
          /* [1,2,3,4,5,6,7,8] */
          enum: [...Array(8).keys()].map((i) => i + 1),
        },
      },
    ],
  },
  routines: {
    type: [
      {
        semester: { type: String },
        routine: { type: mongoose.Types.ObjectId, ref: "Routine" },
      },
    ],
  },
});

module.exports = mongoose.model("Department", departmentSchema);
