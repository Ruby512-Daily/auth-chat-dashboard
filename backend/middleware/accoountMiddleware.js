const { Account } = require("../models");
const logger = require("../utils/logger");
exports.accountmiddleware = async (req, res, next) => {
  // try {
  //   const token = req.headers.authorization;
  //   if (!token.length || !token) {
  //     res.status(401).json({ state: "No Token! Please Login Again!" });
  //     return;
  //   }
  //   const account = await Account.findOne({ token });
  //   if (!account) {
  //     res.status(401).json({ state: "No Vailed Token! Please Login Again!" });
  //     return;
  //   }
  //   next();
  // } catch (error) {
  //   logger("error", "User Auth Middleware", `${error}`);
  // }
  next();
};
