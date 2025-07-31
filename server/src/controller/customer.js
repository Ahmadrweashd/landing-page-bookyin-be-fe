const { Customer, CustomerService } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { omitImageFields } = require("../middlewares/customer");
const { handleServices } = require("../strategies/customer");
const path = require("path");
const fs = require('fs');

const getCustomers = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Customer.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]],
    include: [{ model: CustomerService, through: { attributes: [] } }],
  });

  res.status(200).json({
    customers: rows.map(customer => ({
      ...omitImageFields(customer),
    })),
    total: count,
    page,
    pages: Math.ceil(count / limit),
  });
});

const getCustomersServices = catchAsyncErrors(async (req, res) => {
  const services = await CustomerService.findAll();
  res.status(200).json({ services });
})

const getCustomer = catchAsyncErrors(async (req, res) => {
  const customer = await Customer.findByPk(req.customer.id, {
    include: [{ model: CustomerService, through: { attributes: [] } }],
  });
  res.status(200).json({
    customer: {
      ...omitImageFields(customer),
    }
  });
});

const getProfileImage = catchAsyncErrors(async (req, res) => {
  const filePath = path.resolve(
    process.cwd(),
    "uploads",
    req.customer.profileURL.replace(/^\/?uploads[\\/]/, '')
  )

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Profile image not found' });
  }

  res.sendFile(filePath);
});


const getBackgroundImage = catchAsyncErrors(async (req, res) => {
  const filePath = path.resolve(
    process.cwd(),
    "uploads",
    req.customer.backgroundImageURL.replace(/^\/?uploads[\\/]/, '')
  )

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Background image not found' });
  }

  res.sendFile(filePath);
});


const createCustomer = catchAsyncErrors(async (req, res) => {
  const { services, ...customerData } = req.body;

  if (req.files) {
    if (req.files.profileURL) {
      customerData.profileURL = `/uploads/${req.files.profileURL[0].filename}`;
    }

    if (req.files.backgroundImageURL) {
      customerData.backgroundImageURL = `/uploads/${req.files.backgroundImageURL[0].filename}`;
    }
  }

  const customer = await Customer.create(customerData);
  await handleServices(customer, services);

  res.status(201).json({
    msg: "Customer created successfully",
    customerId: customer.id,
  });
});


const updateCustomer = catchAsyncErrors(async (req, res) => {
  const { services, ...customerData } = req.body;

  if (req.files) {
    if (req.files.profileURL && req.files.profileURL[0]) {
      if (req.customer.profileURL) {
        const filePath = path.resolve(
          process.cwd(),
          "uploads",
          req.customer.profileURL.replace(/^\/?uploads[\\/]/, '')
        )
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      customerData.profileURL = `/uploads/${req.files.profileURL[0].filename}`;
    }

    if (req.files.backgroundImageURL && req.files.backgroundImageURL[0]) {
      if (req.customer.backgroundImageURL) {
        const filePath = path.resolve(
          process.cwd(),
          "uploads",
          req.customer.backgroundImageURL.replace(/^\/?uploads[\\/]/, '')
        )
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      customerData.backgroundImageURL = `/uploads/${req.files.backgroundImageURL[0].filename}`;
    }
  }

  await req.customer.update(customerData);
  await handleServices(req.customer, services);

  res.status(200).json({
    msg: "Customer updated successfully",
    customerId: req.customer.id,
  });
});

const deleteCustomer = catchAsyncErrors(async (req, res) => {
  await req.customer.destroy();
  res.status(200).json({ msg: "Customer deleted" });
});

const convertRequestToCustomer = catchAsyncErrors(async (req, res) => {
  const request = req.request;

  const customerData = {
    name: request.name,
    phone: request.phone,
    businessName: request.businessName,
  };
  const customer = await Customer.create(customerData);
  await request.destroy();

  res.status(201).json({
    msg: "Customer created from request and request deleted",
    customerId: customer.id,
  });
});

const getCustomerByBusinessName = catchAsyncErrors(async (req, res) => {
  res.status(200).json({
    customer: {
      ...omitImageFields(req.customer),
    }
  });
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  getProfileImage,
  getBackgroundImage,
  updateCustomer,
  deleteCustomer,
  convertRequestToCustomer,
  getCustomerByBusinessName,
  getCustomersServices
};