const BadRequestError = require("./errors/BadRequestError");
const UnauthorizedError = require("./errors/UnauthorizedError");
const ForbiddenError = require("./errors/ForbiddenError");
const NotFoundError = require("./errors/NotFoundError");
const ConflictError = require("./errors/ConflictError");

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
