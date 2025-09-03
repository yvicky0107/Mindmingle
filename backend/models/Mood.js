const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    mood: {
      type: String,
      required: true,
      lowercase: true, // 🔑 normalize automatically
      trim: true,
      enum: ["happy", "sad", "angry", "calm", "stressed"], // enforce valid moods
    },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", MoodSchema);
