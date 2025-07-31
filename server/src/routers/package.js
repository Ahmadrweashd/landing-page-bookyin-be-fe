const express = require("express");
const {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getActivePackages,
} = require("../controller/package");
const { validate } = require("../utils/validate");
const {
  createPackage: createPackageValidation,
  getPackages: getPackagesValidation,
  getPackage: getPackageValidation,
  updatePackage: updatePackageValidation,
  deletePackage: deletePackageValidation,
} = require("../validations/package");
const { isAuthenticated } = require("../middlewares/auth");
const { findPackage } = require("../middlewares/package");

const router = express.Router();

router.get("/", getPackagesValidation, validate, getPackages);
router.get("/actives", getPackagesValidation, validate, getActivePackages);
router.get("/:id", getPackageValidation, validate, findPackage, getPackage);
router.post("/", isAuthenticated, createPackageValidation, validate, createPackage);
router.put("/:id", isAuthenticated, updatePackageValidation, validate, findPackage, updatePackage);
router.delete("/:id", isAuthenticated, deletePackageValidation, validate, findPackage, deletePackage);

module.exports = router;