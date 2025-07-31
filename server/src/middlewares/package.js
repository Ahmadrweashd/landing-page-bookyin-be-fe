const { Package } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

const findPackage = catchAsyncErrors(async (req, res, next) => {
  const pkg = await Package.findByPk(req.params.id, { include: ["PackageServices"] });
  if (!pkg) return next(new Error("Package not found", 404));

  req.package = pkg;
  next();
});

module.exports = { findPackage };