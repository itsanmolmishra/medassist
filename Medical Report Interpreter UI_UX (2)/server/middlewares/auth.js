const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

module.exports = async function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: missing token" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized: invalid token" });
  }
};

