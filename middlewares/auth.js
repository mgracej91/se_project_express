const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Authorization required");
    error.name = "UnauthorizedError";
    error.statusCode = 401;
    return next(error);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.name = "UnauthorizedError";
    err.statusCode = 401;
    return next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
