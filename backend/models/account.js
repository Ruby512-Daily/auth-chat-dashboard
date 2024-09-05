const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const md5 = require("md5");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    privateEmail: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
      default: "",
    },
    identify: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    collection: "accounts",
    timestamps: true,
  }
);

// Static method to migrate account data
AccountSchema.statics.migrate = async function () {
  //await this.deleteMany({});
};

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
