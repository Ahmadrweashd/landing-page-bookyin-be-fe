const express = require("express");
const {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} = require("../controller/request");
const { validate } = require("../utils/validate");
const {
  createRequest: createRequestValidation,
  getRequests: getRequestsValidation,
  getRequest: getRequestValidation,
  updateRequest: updateRequestValidation,
  deleteRequest: deleteRequestValidation,
} = require("../validations/request");
const { isAuthenticated } = require("../middlewares/auth");
const { findRequest } = require("../middlewares/request");

const router = express.Router();

router.get("/", isAuthenticated, getRequestsValidation, validate, getRequests);
router.get("/:id", isAuthenticated, getRequestValidation, validate, findRequest, getRequest);
router.post("/", createRequestValidation, validate, createRequest);
router.put("/:id", isAuthenticated, updateRequestValidation, validate, findRequest, updateRequest);
router.delete("/:id", isAuthenticated, deleteRequestValidation, validate, findRequest, deleteRequest);

module.exports = router;