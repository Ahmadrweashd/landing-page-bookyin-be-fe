const { body, param, query } = require("express-validator");

const serviceActions = ["delete", "new", "add"];

const createRequest = [
  body("name").notEmpty().isString().isLength({ max: 100 }),
  body("phone").notEmpty().isString().isLength({ max: 50 }),
  body("businessName").notEmpty().isString().isLength({ max: 100 }),
  body("packageId").isInt(),
  body("services").optional().isArray(),
  body("services.*.name").optional().isString().isLength({ max: 100 }),
  body("services.*.action").optional().isIn(serviceActions),
];

const updateRequest = [
  param("id").isInt(),
  body("name").optional().isString().isLength({ max: 100 }),
  body("phone").optional().isString().isLength({ max: 50 }),
  body("businessName").optional().isString().isLength({ max: 100 }),
  body("packageId").optional().isInt(),
  body("services").optional().isArray(),
  body("services.*.name").optional().isString().isLength({ max: 100 }),
  body("services.*.action").optional().isIn(serviceActions),
];

const getRequest = [
  param("id").isInt(),
];

const deleteRequest = [
  param("id").isInt(),
];

const getRequests = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 200 }),
];

module.exports = {
  createRequest,
  updateRequest,
  getRequest,
  deleteRequest,
  getRequests,
};