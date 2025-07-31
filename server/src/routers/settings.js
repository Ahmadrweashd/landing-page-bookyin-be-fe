const express = require("express");
const { getGlobalSettings, editGlobalSettings } = require("../controller/settings");
const { findAdmin } = require("../middlewares/settings");
const { isAuthenticated } = require("../middlewares/auth");
const { validate } = require("../utils/validate");
const { editGlobalSettings: editGlobalSettingsValidation } = require("../validations/settings")

const router = express.Router();

router.get(
  "/settings",
  findAdmin,
  getGlobalSettings
);

router.put(
  "/edit-settings",
  isAuthenticated,
  editGlobalSettingsValidation,
  validate,
  editGlobalSettings
);

module.exports = router