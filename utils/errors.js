const errorStatus = {
  invalidInput: 400,
  notFound: 404,
  internalServerError: 500,
};

const errorMessage = {
  invalidInput: "Invalid Item Data",
  notFound: "Item not found",
  internalServerError: "Internal Server Error",
};

const errorHandler = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res
      .status(errorStatus.invalidInput)
      .send({ message: errorMessage.invalidInput });
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
  return res
    .status(errorStatus.internalServerError)
    .send({ message: errorMessage.internalServerError });
};

module.exports = {
  errorStatus,
  errorMessage,
  errorHandler,
};
