const { Customer, CustomerService } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");

const findCustomer = catchAsyncErrors(async (req, res, next) => {
  const customer = await Customer.findByPk(req.params.id);
  if (!customer) return next(new Error("Customer not found", 404));
  req.customer = customer;
  next();
});

const checkProfileImageExists = catchAsyncErrors(async (req, res, next) => {
  if (!req.customer.profileURL) return next(new Error("Profile image not found", 404));
  next();
});

const checkBackgroundImageExists = catchAsyncErrors(async (req, res, next) => {
  if (!req.customer.backgroundImageURL) return next(new Error("Background image not found", 404));
  next();
});

const omitImageFields = (customer) => {
  const { profileURL, backgroundImageURL, ...rest } = customer.get({ plain: true });
  return rest;
};

const findCustomerByBusinessName = catchAsyncErrors(async (req, res, next) => {
  const customer = await Customer.findOne({
    where: { businessName: req.params.businessName },
    include: [{ model: CustomerService, through: { attributes: [] }, required: false }]
  });
  if (!customer) return next(new Error("Customer not found", 404));
  req.customer = customer;
  next();
});

const parseServicesToArray = catchAsyncErrors(
  (req, res, next) => {
    if (typeof req.body.services === "string") {
      req.body.services = JSON.parse(req.body.services);
    }
    next();
  })

module.exports = {
  findCustomer,
  omitImageFields,
  checkProfileImageExists,
  checkBackgroundImageExists,
  findCustomerByBusinessName,
  parseServicesToArray
};