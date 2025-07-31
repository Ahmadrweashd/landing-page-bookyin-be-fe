const { body, param, query } = require("express-validator");

const serviceActions = ["delete", "new", "add"];

const createCustomer = [
  body("name").notEmpty().isString().isLength({ max: 100 }),
  body("phone").optional().isString().isLength({ max: 50 }),
  body("website").optional().isString().isLength({ max: 255 }),
  body("location").optional().isString().isLength({ max: 255 }),
  body("note").optional().isString(),
  body("isSpecial").optional().isBoolean(),
  body("services").optional().isArray(),
  body("services.*.name").optional().isString().isLength({ max: 100 }),
  body("services.*.action").optional().isIn(serviceActions),
  body("businessName").notEmpty().isString().isLength({ max: 100 }),
];

const updateCustomer = [
  param("id").isInt(),
  body("name").optional().isString().isLength({ max: 100 }),
  body("phone").optional().isString().isLength({ max: 50 }),
  body("website").optional().isString().isLength({ max: 255 }),
  body("location").optional().isString().isLength({ max: 255 }),
  body("note").optional().isString(),
  body("isSpecial").optional().isBoolean(),
  body("services").optional().isArray(),
  body("services.*.name").optional().isString().isLength({ max: 100 }),
  body("services.*.action").optional().isIn(serviceActions),
  body("businessName").optional().isString().isLength({ max: 100 }),
];

const getCustomer = [
  param("id").isInt(),
];

const deleteCustomer = [
  param("id").isInt(),
];

const getCustomers = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 200 }),
];

const getCustomerByBusinessName = [
  param("businessName").notEmpty().isString().isLength({ max: 100 }),
];

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerByBusinessName,
};