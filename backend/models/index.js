const mongoose = require("mongoose");
const config = require("../config/key");
const logger = require("../utils/logger");

mongoose
  .connect(config.database.uri)
  .then(() => {
    logger("info", "Database", `Database connection successfully.`);
  })
  .catch((err) => {
    logger("error", "Database", `Database connection failed.`);
  });

const db = {};

db.mongoose = mongoose;
db.Admin = require("./admin");
db.Account = require("./account");
db.Vocation = require("./vacation");

db.sync = async () => {
  //Migrate (clear collections and add initial data if necessary)
  await db.Admin.migrate();
};

module.exports = db;
