const jwtsign = require("../utils/jwtSign");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");

const login = catchAsyncErrors(async (req, res) => {
  const user = req.user;

  const token = jwtsign({
    id: user.id,
    name: user.username
  });

  return res
    .status(200)
    .json({ msg: "Logged in successfully", token });
})

const logout = catchAsyncErrors(async (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: "User Logged Out Successfully" });
});

const verifyToken = catchAsyncErrors(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    ...user,
  });
})

const editPassword = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const { newPassword } = req.body;

  user.password = await bcrypt.hash(newPassword, parseInt(process.env.SALT, 10));
  await user.save();

  res.status(200).json({ msg: "Password updated successfully" });
});

const changePhone = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const { newPhone } = req.body;

  user.phone = newPhone;
  await user.save();

  res.status(200).json({ msg: "Phone updated successfully" });
});


module.exports = {
  login,
  logout,
  verifyToken,
  editPassword,
  changePhone,
};