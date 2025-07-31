const catchAsyncErrors = require("./catchAsyncErrors")
const { User } = require("../models")

const findAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne()
  req.user = user
  next()
})

module.exports = {findAdmin}
