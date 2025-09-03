const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Invalid phone number"],
  },
  password: { type: String, required: true, minlength: 8 },
});

module.exports = mongoose.model("User", userSchema);
