const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header is malformed" });
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, "seu_segredo_jwt");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
