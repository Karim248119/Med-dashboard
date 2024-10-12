const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid e-mail"],
  },
  password: { type: String, required: true },
  role: { type: String, required: false },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
