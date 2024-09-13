const mongoose = require("mongoose");
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
    password: {
      type: String,
      default: "",
    },

  },
  {
    collection: "accounts",
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
