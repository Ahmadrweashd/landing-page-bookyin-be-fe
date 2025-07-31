const express = require("express");
const {
  login: loginController,
  logout,
  verifyToken,
  editPassword,
  changePhone,
} = require("../controller/auth");
const { validate } = require("../utils/validate");
const { checkUserExistsByPhoneNumber, checkIsPasswordCorrect, isAuthenticated } = require("../middlewares/auth");
const {
  login: loginValidation,
  editPassword: editPasswordValidation,
  changePhone: changePhoneValidation,
  editGlobalSettings: editGlobalSettingsValidation
} = require("../validations/auth");

const router = express.Router();

router.get(
  "/verify",
  isAuthenticated,
  verifyToken
);

router.post(
  "/login",
  loginValidation,
  validate,
  checkUserExistsByPhoneNumber,
  checkIsPasswordCorrect,
  loginController
)

router.post(
  "/logout",
  isAuthenticated,
  logout
)

router.put(
  "/edit-password",
  isAuthenticated,
  editPasswordValidation,
  validate,
  checkIsPasswordCorrect,
  editPassword
);

router.put(
  "/edit-phone",
  isAuthenticated,
  changePhoneValidation,
  validate,
  checkIsPasswordCorrect,
  changePhone
);

module.exports = router