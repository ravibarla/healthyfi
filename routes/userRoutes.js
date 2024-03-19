const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/register", async (req, res) => {
  console.log("register clicked");
  console.log(req.body);
  try {
    const userExists = await User.findOne({ email: req.body.email });
    console.log(userExists);
    if (userExists) {
      return res
        .status(200)
        .send({ message: "user is already registered", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    return res
      .status(200)
      .send({ message: "user created successfully", success: true });
  } catch (error) {
    console.log("Error :", error);
    return res
      .status(500)
      .send({ message: "Error in creating User", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({
        message: "successfully logged in ",
        success: true,
        data: token,
      });
      0;
    }
    return res
      .status(200)
      .send({ message: "password is incorrect", success: false });
  } catch (error) {
    console.log("Error :", error);
    return res
      .status(500)
      .send({ message: "Error in logging", success: false });
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    } else {
      return res.status(200).send({
        message: "user found",
        success: true,
        data: { name: user.name, email: user.email },
      });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ message: "error in getting user info", success: false });
  }
});

module.exports = router;
