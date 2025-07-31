const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../middlewares/error");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const validate = catchAsyncErrors(
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map(err => err.msg)
        .join(", ");

      return next(new ErrorHandler(message, 400))
    }

    next();
  }
)

module.exports = { validate };
