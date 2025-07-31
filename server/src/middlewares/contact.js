const { Contact } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

const findContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) return next(new Error("Contact not found", 404));
  req.contact = contact;
  next();
});

module.exports = { findContact };