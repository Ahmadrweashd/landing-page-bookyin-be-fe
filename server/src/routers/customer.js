const express = require("express");
const {
  createCustomer,
  getCustomers,
  getCustomer,
  getProfileImage,
  getBackgroundImage,
  updateCustomer,
  deleteCustomer,
  convertRequestToCustomer,
  getCustomerByBusinessName,
} = require("../controller/customer");
const { validate } = require("../utils/validate");
const {
  createCustomer: createCustomerValidation,
  getCustomers: getCustomersValidation,
  getCustomer: getCustomerValidation,
  updateCustomer: updateCustomerValidation,
  deleteCustomer: deleteCustomerValidation,
  getCustomerByBusinessName: getCustomerByBusinessNameValidation,
} = require("../validations/customer");
const { isAuthenticated } = require("../middlewares/auth");
const {
  findCustomer,
  checkProfileImageExists,
  checkBackgroundImageExists,
  findCustomerByBusinessName,
} = require("../middlewares/customer");
const { findRequest } = require("../middlewares/request");
const upload = require("../utils/multer");

const router = express.Router();

router.get("/business/:businessName", getCustomerByBusinessNameValidation, validate, findCustomerByBusinessName, getCustomerByBusinessName);
router.get("/:id/profile-image", getCustomerValidation, validate, findCustomer, checkProfileImageExists, getProfileImage);
router.get("/:id/background-image", getCustomerValidation, validate, findCustomer, checkBackgroundImageExists, getBackgroundImage);
router.get("/:id", getCustomerValidation, validate, findCustomer, getCustomer);
router.get("/", getCustomersValidation, validate, getCustomers);

router.post("/", isAuthenticated, upload.fields([{ name: "profileURL", maxCount: 1 }, { name: "backgroundImageURL", maxCount: 1 },]), createCustomerValidation, validate, createCustomer);
router.post("/convert-request/:id", isAuthenticated, findRequest, convertRequestToCustomer);

router.put("/:id", isAuthenticated, upload.fields([{ name: "profileURL", maxCount: 1 }, { name: "backgroundImageURL", maxCount: 1 },]), updateCustomerValidation, validate, findCustomer, updateCustomer);

router.delete("/:id", isAuthenticated, deleteCustomerValidation, validate, findCustomer, deleteCustomer);

module.exports = router;