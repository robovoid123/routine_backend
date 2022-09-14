const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    required: true,
    type: Number,
  },
  available: {
    required: true,
    type: Boolean,
  },
});

module.exports = mongoose.model("Room", roomSchema);
