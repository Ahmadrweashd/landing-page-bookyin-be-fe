const { body, param, query } = require("express-validator");

const createContact = [
  body("message").notEmpty().isString(),
  body("phone").notEmpty().isString().isLength({ max: 50 }),
  body("name").notEmpty().isString().isLength({ max: 100 })
];

const getContact = [
  param("id").isInt()
];

const deleteContact = [
  param("id").isInt()
];

const getContacts = [
  query("page").optional().isInt({ min: 1 }),
  query("limit").optional().isInt({ min: 1, max: 200 })
];

const markContactsAsRead = [
  body("ids")
    .isArray({ min: 1 })
    .withMessage("ids must be a non-empty array")
    .bail()
    .custom((ids) =>
      ids.every((id) => Number.isInteger(id) && id > 0)
    )
    .withMessage("All ids must be positive integers"),
];

module.exports = {
  createContact,
  getContact,
  deleteContact,
  getContacts,
  markContactsAsRead
};