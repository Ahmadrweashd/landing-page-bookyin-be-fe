const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { Global } = require("../models");

const globalKeys = [
  "customersNumber", "packagesNumber",
  "arTitle", "enTitle", "heTitle",
  "arSubtitle", "enSubtitle", "heSubtitle",
  "arServicesTitle", "enServicesTitle", "heServicesTitle",
  "arServicesSubtitle", "enServicesSubtitle", "heServicesSubtitle",
  "arCustomersTitle", "enCustomersTitle", "heCustomersTitle",
  "arCustomersSubtitle", "enCustomersSubtitle", "heCustomersSubtitle",
  "arPackagesTitle", "enPackagesTitle", "hePackagesTitle",
  "arPackagesSubtitle", "enPackagesSubtitle", "hePackagesSubtitle",
  "arHeroCustomersTitle", "enHeroCustomersTitle", "heHeroCustomersTitle",
  "arHeroPackagesTitle", "enHeroPackagesTitle", "heHeroPackagesTitle",
  "arHeroCustomersSubtitle", "enHeroCustomersSubtitle", "heHeroCustomersSubtitle",
  "arHeroPackagesSubtitle", "enHeroPackagesSubtitle", "heHeroPackagesSubtitle"
];

const getGlobalSettings = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  let global = await Global.findOne();

  if (!global)
    global = await Global.create({ customersNumber: 0, packagesNumber: 0 });

  const globalSettings = {};
  globalKeys.forEach(key => globalSettings[key] = global[key]);

  res.status(200).json({
    mobileNumber: user.mobileNumber,
    email: user.email,
    whatsapp: user.whatsapp,
    instagram: user.instagram,
    tiktok: user.tiktok,
    youtube: user.youtube,
    location: user.location,
    ...globalSettings
  });
});

const editGlobalSettings = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const global = await Global.findOne();
  const userFields = ["whatsapp", "instagram", "tiktok", "youtube", "email", "location", "mobileNumber"];

  userFields.forEach(field => {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  });

  globalKeys.forEach(key => {
    if (req.body[key] !== undefined) global[key] = req.body[key];
  });

  await user.save();
  await global.save();

  res.status(200).json({ msg: "Settings updated successfully", user });
});

module.exports = { getGlobalSettings, editGlobalSettings };
