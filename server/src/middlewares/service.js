const { Service } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

const findService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findByPk(req.params.id);
  if (!service) return next(new Error("Service not found", 404));
  req.service = service;
  next();
});

module.exports = {
  findService,
};
