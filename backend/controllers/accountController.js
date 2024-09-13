const { Account } = require("../models");
const logger = require("../utils/logger");


exports.createAccount = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthday,
      privateEmail,
      companyEmail,
      phone,
      address,
      photo,
    } = req.body;
    const accountFlag = await Account.findOne({ privateEmail: privateEmail });
    if (accountFlag) {
      return res.status(400).json({ state: false, message: "Email Exist" });
    } else {
      const account = await Account.create({
        firstName,
        lastName,
        birthday,
        privateEmail,
        companyEmail,
        phone,
        address,
        photo,
      });
      return res.status(200).json({
        status: true,
        account: account,
      });
    }
  } catch (error) {
    logger("error", "AccountController | CreateAccount | ", error.message);
    return res.status(500).json({
      status: false,
      message: `Create Account Failed : ${error.message}`,
    });
  }
};

exports.readAccount = async (req, res) => {
  try {
    const accounts = await Account.find({});
    return res.status(200).json({ accounts });
  } catch (error) {
    logger("error", "AccountController", `Get Accounts | ${error.message}`);
    res.status(500).json({ message: `Get Accounts Failed | ${error.message}` });
  }
};

exports.readAccountById = async (req, res) => {
  try {
    const _id = req.params._id;
    const account = await Account.find({ _id });

    if (account) return res.status(200).json({ account });
    else res.status(404).json({ message: `Get AccountsFailed | Not Found` });
  } catch (error) {
    logger("error", "AccountController", `Get Accounts | ${error.message}`);
    res.status(500).json({ message: `Get Account Failed | ${error.message}` });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const _id = req.params._id;
    const {
      firstName,
      lastName,
      birthday,
      privateEmail,
      companyEmail,
      phone,
      address,
      photo,
      identify,
    } = req.body;
    const account = await Account.findOne({
      _id,
    });
    if (account) {
      const result = await Account.findByIdAndUpdate(_id, {
        firstName,
        lastName,
        birthday,
        privateEmail,
        companyEmail,
        phone,
        address,
        photo,
        identify,
      });
      return res.status(200).json({
        status: true,
        account: result,
      });
    } else return res.status(404).send({ message: "Cannot find the Account" });
  } catch (error) {
    logger("error", "AccountController", `Upgrade Account | ${error.message}`);
  }
};

exports.deleteAccount = async (req, res) => {
  const _id = req.params._id;
  try {
    console.log(_id);
    const account = await Account.findOne({ _id });
    if (!account) {
      return res.status(404).send({ message: "Cannot find the Account" });
    }
    await Account.deleteOne({ _id });
    return res.status(200).send({ message: "Successfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "An error occurred while deleting the customer." });
  }
};
