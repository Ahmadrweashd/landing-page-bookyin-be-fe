const { Contact } = require("../models");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const getContacts = catchAsyncErrors(async (req, res) => {
  const contacts = await Contact.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ contacts });
});

const getContact = catchAsyncErrors(async (req, res) => {
  res.status(200).json({ contact: req.contact });
});

const createContact = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    msg: "Contact message sent successfully",
    contactId: contact.id
  });
});

const deleteContact = catchAsyncErrors(async (req, res) => {
  await req.contact.destroy();
  res.status(200).json({ msg: "Contact deleted successfully" });
});

const markContactsAsRead = catchAsyncErrors(async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ msg: "Invalid or empty IDs array." });
  }

  const [updatedCount] = await Contact.update(
    { isRead: true },
    { where: { id: ids } }
  );

  res.status(200).json({
    msg: `${updatedCount} contact(s) marked as read.`,
    updatedCount
  });
});


module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  markContactsAsRead
};