const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errorHandler } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Authorization required");
    error.name = "UnauthorizedError";
    error.statusCode = 401;
    return errorHandler(error, res);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.name = "UnauthorizedError";
    return errorHandler(err, res);
  }
  req.user = payload;
  next();
  return null;
};

module.exports = auth;
