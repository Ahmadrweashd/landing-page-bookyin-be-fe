const { body } = require("express-validator");

const editGlobalSettings = [
  body("whatsapp").optional({ nullable: true }).isString().isLength({ max: 50 }),
  body("instagram").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("tiktok").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("youtube").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("email").optional({ nullable: true }).isString().isEmail(),
  body("location").optional({ nullable: true }).isString().isLength({ max: 255 }),
  body("mobileNumber").optional({ nullable: true }).isString().isLength({ max: 50 }),
];

module.exports = {
  editGlobalSettings
}