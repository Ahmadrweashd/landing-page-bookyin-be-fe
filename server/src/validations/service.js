const { body, param } = require("express-validator");

const createService = [
  body("arTitle").notEmpty().isString().isLength({ max: 255 }),
  body("heTitle").notEmpty().isString().isLength({ max: 255 }),
  body("enTitle").notEmpty().isString().isLength({ max: 255 }),
  body("arDescription").optional().isString(),
  body("heDescription").optional().isString(),
  body("enDescription").optional().isString(),
  body("order").optional().isInt(),
  body("icon").optional().isString().isLength({ max: 255 }),
];

const updateService = [
  param("id").isInt(),
  body("arTitle").optional().isString().isLength({ max: 255 }),
  body("heTitle").optional().isString().isLength({ max: 255 }),
  body("enTitle").optional().isString().isLength({ max: 255 }),
  body("arDescription").optional().isString(),
  body("heDescription").optional().isString(),
  body("enDescription").optional().isString(),
  body("order").optional().isInt(),
  body("icon").optional().isString().isLength({ max: 255 }),
];

const deleteService = [
  param("id").isInt(),
];

const getService = [
  param("id").isInt(),
];

module.exports = {
  createService,
  updateService,
  deleteService,
  getService
};
