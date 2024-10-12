const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: String, required: false },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  message: { type: String, required: false },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
});

const appointment = mongoose.model("appointmen", appointmentSchema);

module.exports = appointment;
