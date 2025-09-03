const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id consistently
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(400).json({ msg: "Token not valid" });
  }
}

module.exports = auth;
