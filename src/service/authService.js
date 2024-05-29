const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/authModel.js");

const signupService = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  return await UserModel.create(userData);
};
const checkPassword = async (password, Savedpassword) => {
  return await bcrypt.compare(password, Savedpassword);
};

module.exports = {
  signupService,
  checkPassword,
};
