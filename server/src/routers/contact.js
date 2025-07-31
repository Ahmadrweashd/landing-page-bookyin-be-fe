const express = require("express");
const {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  markContactsAsRead
} = require("../controller/contact");
const { validate } = require("../utils/validate");
const {
  createContact: createContactValidation,
  getContacts: getContactsValidation,
  getContact: getContactValidation,
  deleteContact: deleteContactValidation,
  markContactsAsRead: markContactsAsReadValidation
} = require("../validations/contact");
const { isAuthenticated } = require("../middlewares/auth");
const { findContact } = require("../middlewares/contact");

const router = express.Router();

router.get("/", isAuthenticated, getContactsValidation, validate, getContacts);
router.get("/:id", isAuthenticated, getContactValidation, validate, findContact, getContact);
router.post("/", createContactValidation, validate, createContact);
router.put("/", isAuthenticated, markContactsAsReadValidation, validate, markContactsAsRead);
router.delete("/:id", isAuthenticated, deleteContactValidation, validate, findContact, deleteContact);

module.exports = router;