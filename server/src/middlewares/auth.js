const { User } = require("../models");
const catchAsyncErrors = require("./catchAsyncErrors");
const { ErrorHandler } = require("./error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return next(new ErrorHandler("Authentication failed, token not provided", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findByPk(decoded.id);

  if (!user) {
    return next(new ErrorHandler("Authentication failed, user not found", 401));
  }

  req.user = user

  next();
})

const checkIsPasswordCorrect = catchAsyncErrors(async (req, res, next) => {
  const { password } = req.body;
  const user = req.user;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Password incorrect", 400));

  next();
})

const checkUserExistsByPhoneNumber = catchAsyncErrors(async (req, res, next) => {
  const { phone } = req.body;

  const user = await User.findOne({ where: { phone } });

  if (!user)
    return next(new ErrorHandler("User not exists", 404));

  req.user = user;
  next();
})

module.exports = {
  isAuthenticated,
  checkIsPasswordCorrect,
  checkUserExistsByPhoneNumber,
}