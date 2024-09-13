const bcrypt = require("bcrypt");
const { Account, Admin } = require("../models");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/key").secretKey;
const md5 = require("md5");

exports.user_login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await Account.findOne({
      privateEmail: username,
    });
    const admin = await Admin.findOne({ email: username });
    try {
      if (admin) {
        const result = await bcrypt.compare(password, admin.password);
        if (result) {
          const payload = { _id: admin._id, password: admin.password };
          const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
          await Admin.findByIdAndUpdate(admin._id, { token });
          return res.status(200).json({
            state: true,
            token: token,
            _id: admin._id,
            role: "admin",
            username: "admin",
          });
        } else {
          return res
            .status(404)
            .json({ state: false, message: "Invalid Admin" });
        }
      } else {
        if (account) {
          console.log("first");
          if (account.password == md5(password)) {
            console.log("second");
            const payload = { _id: account._id, password: account.password };
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
            await Account.findByIdAndUpdate(account._id, { token });
            return res.status(200).json({
              state: true,
              token: token,
              _id: account._id,
              role: "user",
              username: account.firstName,
            });
          } else {
            return res
              .status(404)
              .json({ state: false, message: "No register User " });
          }
        } else {
          return res
            .status(404)
            .json({ state: false, message: "No register User" });
        }
      }
    } catch (error) {
      return res.status(500).json({
        state: false,
        message: "An error occurred during authentication.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      state: false,
      message: "An error occurred during authentication.",
    });
  }
};

exports.user_logup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const account = await Account.findOne({
      privateEmail: username,
    });
    if (account) {
      await Account.findByIdAndUpdate(account._id, { password: md5(password) });
      return res
        .status(200)
        .json({ state: true, message: "Success register User" });
    } else {
      return res
        .status(404)
        .json({ state: false, message: "No register User" });
    }
  } catch (error) {
    return res.status(500).json({
      state: false,
      message: "An error occurred during authentication.",
    });
  }
};
