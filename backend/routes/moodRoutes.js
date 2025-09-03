const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/auth");

// Save mood
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mood, note } = req.body;
    console.log("📩 Mood request:", { mood, note, user: req.user });

    const newMood = new Mood({ user: req.user.id, mood, note });
    await newMood.save();

    res.json(newMood);
  } catch (err) {
    console.error("❌ Error saving mood:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// Get moods for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Danger: only use in dev!
router.delete("/clear", async (req, res) => {
  try {
    await Mood.deleteMany({});
    res.json({ msg: "✅ All moods cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
