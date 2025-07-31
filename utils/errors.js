const errorStatus = {
  invalidInput: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

const errorMessage = {
  invalidInput: "Invalid Item Data",
  unauthorized: "Authorization required",
  forbidden: "Forbidden access",
  notFound: "Item not found",
  conflict: "Conflict with existing data",
  internalServerError: "Internal Server Error",
};

const errorHandler = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res
      .status(errorStatus.invalidInput)
      .send({ message: errorMessage.invalidInput });
  }
  if (err.name === "UnauthorizedError") {
    return res
      .status(errorStatus.unauthorized)
      .send({ message: errorMessage.unauthorized });
  }
  if (err.name === "ForbiddenError") {
    return res
      .status(errorStatus.forbidden)
      .send({ message: errorMessage.forbidden });
  }
  if (err.statusCode === 404) {
    return res
      .status(errorStatus.notFound)
      .send({ message: errorMessage.notFound });
  }
  if (err.name === "CastError") {
    return res
      .status(errorStatus.invalidInput)
      .send({ message: errorMessage.invalidInput });
  }
  if (err.name === "MongoServerError" && err.code === 11000) {
    return res
      .status(errorStatus.conflict)
      .send({ message: "Duplicate key error" });
  }
  return res
    .status(errorStatus.internalServerError)
    .send({ message: errorMessage.internalServerError });
};

module.exports = {
  errorStatus,
  errorMessage,
  errorHandler,
};
