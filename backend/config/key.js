const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 5120,

  database: {
    type: process.env.DB_TYPE || "mongodb",
    host: process.env.DB_HOST || "127.0.0.1",
    name: process.env.DB_NAME || "auth",
    user: process.env.DB_USER || "",
    port: process.env.DB_PORT || "27017",
    pass: process.env.DB_PASS || "",
    uri: process.env.DB_URI || `mongodb://127.0.0.1:27017/auth`,
  },
  secretKey: "authKey",
};
