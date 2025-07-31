const { body, param, query } = require("express-validator");

const createPackage = [
  body("priceMonthly").isInt({ min: 0 }),
  body("priceYearly").isInt({ min: 0 }),

  body("arNote").optional().isString().isLength({ max: 255 }),
  body("enNote").optional().isString().isLength({ max: 255 }),
  body("heNote").optional().isString().isLength({ max: 255 }),

  body("arServiceNote").optional().isString().isLength({ max: 255 }),
  body("enServiceNote").optional().isString().isLength({ max: 255 }),
  body("heServiceNote").optional().isString().isLength({ max: 255 }),

  body("isActive").optional().isBoolean(),
  body("isComingSoon").optional().isBoolean(),

  body("services").optional().isArray(),
  body("services.*.arName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.heName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.enName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.isSpecial").optional().isBoolean(),
];

const updatePackage = [
  param("id").isInt(),

  body("priceMonthly").optional().isInt({ min: 0 }),
  body("priceYearly").optional().isInt({ min: 0 }),

  body("arNote").optional().isString().isLength({ max: 255 }),
  body("enNote").optional().isString().isLength({ max: 255 }),
  body("heNote").optional().isString().isLength({ max: 255 }),

  body("arServiceNote").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("enServiceNote").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("heServiceNote").optional({ nullable: true }).isString().isLength({ max: 255 }),

  body("isActive").optional().isBoolean(),
  body("isComingSoon").optional().isBoolean(),

  body("services").optional().isArray(),
  body("services.*.arName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.heName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.enName").notEmpty().isString().isLength({ max: 100 }),
  body("services.*.isSpecial").optional().isBoolean(),
];

const getPackage = [
  param("id").isInt(),
];

const deletePackage = [
  param("id").isInt(),
];

const getPackages = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 200 }),
];

module.exports = {
  createPackage,
  updatePackage,
  getPackage,
  deletePackage,
  getPackages,
};
