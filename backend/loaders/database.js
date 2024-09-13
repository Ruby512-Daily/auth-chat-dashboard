const database = require("../models");
const logger = require("../utils/logger");

module.exports = async () => {
  try {
    await database.sync();
  } catch (error) {
    logger("error", "Database", `Database connect failed... ${error.message}`);

    process.exit(0);
  }
};
