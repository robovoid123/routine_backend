const mongoose = require("mongoose");

const routineSchema = new mongoose.Schema({
  routine: {
    required: true,
    type: String,
  },
  version: {
    type: String,
  },
});

module.exports = mongoose.model("Routine", routineSchema);
