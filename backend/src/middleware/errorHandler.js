const { errorResponse } = require("../utils/response");

// Global Error Handler
const errorHandler = (
  err,
  req,
  res,
  next
) => {

  console.error(err);

  return errorResponse(
    res,
    err.message || "Internal Server Error",
    err.statusCode || 500
  );

};

module.exports = errorHandler;