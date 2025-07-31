const { Request, Package } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

const findRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await Request.findByPk(req.params.id, {
    include: [
      { model: Package, required: false }
    ],
  });
  if (!request) return next(new Error("Request not found", 404));
  req.request = request;
  next();
});


module.exports = { findRequest };