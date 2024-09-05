const { Admin } = require("../models");
const logger = require("../utils/logger");
exports.adminmiddleware = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization;
  //   if (!token) {
  //     res.status(401).json({ state: "No Token! Please Login Again!" });
  //     return;
  //   }
  //   const admin = await Admin.findOne({ token });
  //   if (!admin) {
  //     res.status(401).json({ state: "No Vailed Token! Please Login Again!" });
  //     return;
  //   }
  //   next();
  // } catch (error) {
  //   logger("error", "Admin Auth Middleware", `${error}`);
  // }
  next();
};
