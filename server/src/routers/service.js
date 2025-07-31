const express = require("express");
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getService,
} = require("../controller/service");

const {
  createService: createServiceValidation,
  updateService: updateServiceValidation,
  deleteService: deleteServiceValidation,
  getService: getServiceValidation,
} = require("../validations/service");

const { validate } = require("../utils/validate");
const { isAuthenticated } = require("../middlewares/auth");
const { findService } = require("../middlewares/service");

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceValidation, validate, findService, getService);

router.post(
  "/",
  isAuthenticated,
  createServiceValidation,
  validate,
  createService
);

router.put(
  "/:id",
  isAuthenticated,
  updateServiceValidation,
  validate,
  findService,
  updateService
);

router.delete(
  "/:id",
  isAuthenticated,
  deleteServiceValidation,
  validate,
  findService,
  deleteService
);

module.exports = router;
