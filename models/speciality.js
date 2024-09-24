const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
});

const speciality = mongoose.model("speciality", specialitySchema);

module.exports = speciality;
