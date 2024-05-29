const jwt = require("jsonwebtoken");
const authService = require("../service/authService");
const httpStatus = require("http-status");
const { UserModel } = require("../models/authModel.js");

const signupController = async (req, res) => {
  try {
    await authService.signupService(req.body);
    res.status(httpStatus.OK).send({
      status: 201,
      message: "User created sucesfully",
    });
  } catch (err) {
    console.log(err);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Something Went Wrong" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(httpStatus.NOT_FOUND).send({ message: "Email not Found" });
      return;
    }
    const isValid = await authService.checkPassword(password, user.password);
    if (!isValid) {
      res
        .status(httpStatus.FORBIDDEN)
        .send({ message: "Invalid Email or Password" });
      return;
    }
    let token;
    token = jwt.sign({ user }, process.env.SECRET_KEY);
    res.status(httpStatus.OK).send({
      email: user.email,
      token: token,
      message: "User Login Suucessful",
    });
  } catch (err) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: "Something Went Wrong" });
  }
};

module.exports = {
  signupController,
  loginController,
};
