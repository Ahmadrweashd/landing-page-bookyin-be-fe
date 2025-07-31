const { Request, Package } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getRequests = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await Request.findAndCountAll({
    offset,
    limit,
    order: [["id", "DESC"]],
    include: [
      { model: Package, attributes: ['type'] }
    ],
  });

  res.status(200).json({
    requests: rows.map(request => ({
      ...request.get({ plain: true }),
      packageType: request.Package.type

    })),
    total: count,
    page,
    pages: Math.ceil(count / limit),
  });
});

const getRequest = catchAsyncErrors(async (req, res) => {
  const request = await Request.findByPk(req.request.id, {
    include: [
      { model: Package }
    ],
  });
  res.status(200).json({
    request: {
      ...request.get({ plain: true }),
      package: request.Package,
    }
  });
});

const createRequest = catchAsyncErrors(async (req, res) => {
  const { services, ...requestData } = req.body;
  const request = await Request.create(requestData);
  res.status(201).json({
    msg: "Request created successfully",
    requestId: request.id,
  });
});

const updateRequest = catchAsyncErrors(async (req, res) => {
  const { services, ...requestData } = req.body;
  await req.request.update(requestData);
  res.status(200).json({
    msg: "Request updated successfully",
    requestId: req.request.id,
  });
});

const deleteRequest = catchAsyncErrors(async (req, res) => {
  await req.request.destroy();
  res.status(200).json({ msg: "Request deleted" });
});

module.exports = {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
};