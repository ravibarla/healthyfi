const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
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
    return res
      .status(500)
      .send({ message: "Error in creating User", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
