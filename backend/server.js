const dotenv = require("dotenv");
dotenv.config(); // ✅ Load .env variables first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Now connect DB after env variables are loaded
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // React frontend
app.use(express.json());

// Routes
// Routes
const authRoutes = require("./routes/authRoutes");
const moodRoutes = require("./routes/moodRoutes"); 

app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes); 



// Test route
app.get("/ping", (req, res) => res.json({ msg: "pong" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
