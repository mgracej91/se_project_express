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
      .send({ errorMessage: errorMessage.invalidInput });
  } else if (err.name === "DocumentNotFoundError") {
    return res
      .status(errorStatus.notFound)
      .send({ errorMessage: errorMessage.notFound });
  } else if (err.name === "CastError") {
    return res
      .status(errorStatus.invalidInput)
      .send({ errorMessage: errorMessage.invalidInput });
  }
  return res
    .status(errorStatus.internalServerError)
    .send({ errorMessage: errorMessage.internalServerError });
};

module.exports = {
  errorStatus,
  errorMessage,
  errorHandler,
};
