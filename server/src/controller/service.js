const { Service } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getAllServices = catchAsyncErrors(async (req, res) => {
  const services = await Service.findAll({ order: [["order", "ASC"], ["id", 'DESC']] });
  res.status(200).json({ services });
});

const getService = catchAsyncErrors(async (req, res) => {
  const service = req.service
  res.status(200).json({
    service
  });
});

const createService = catchAsyncErrors(async (req, res) => {
  const newService = await Service.create(req.body);
  res.status(201).json({
    msg: "Service created successfully",
    serviceId: newService.id,
  });
});

const updateService = catchAsyncErrors(async (req, res) => {
  await req.service.update(req.body);
  res.status(200).json({
    msg: "Service updated successfully",
    serviceId: req.service.id,
  });
});

const deleteService = catchAsyncErrors(async (req, res) => {
  await req.service.destroy();
  res.status(200).json({ msg: "Service deleted successfully" });
});

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getService
};
