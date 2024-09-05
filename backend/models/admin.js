const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/key");

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admin",
    timestamps: true,
  }
);

// Pre-save middleware to hash the password if it is new or modified
AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Static method to migrate the company data
AdminSchema.statics.migrate = async function () {
  await this.deleteMany({});

  const hashedPassword = await bcrypt.hash("123456", 10);

  await this.create({
    email: "admin@gmail.com",
    name: "Admin",
    password: "123456",
    token: jwt.sign(hashedPassword, secretKey),
  });
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
