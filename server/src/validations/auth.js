const { body } = require("express-validator");

const login = [
  body("phone").notEmpty().withMessage("phone is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const editPassword = [
  body("password").notEmpty().withMessage("Old password is required"),
  body("newPassword")
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];

const changePhone = [
  body("password").notEmpty().withMessage("Password is required"),
  body("newPhone")
    .notEmpty().withMessage("New phone is required")
    .isMobilePhone().withMessage("New phone must be a valid phone number"),
];

module.exports = {
  login,
  editPassword,
  changePhone,
}