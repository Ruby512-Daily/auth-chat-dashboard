const express = require("express");
const router = express.Router();

const authControl = require("../controllers/authController");
const accountControl = require("../controllers/accountController");

const accountMiddle = require("../middleware/accoountMiddleware");
const adminMiddle = require("../middleware/adminMiddleware");

//Auth Logic
router.post("/login", authControl.user_login);
router.post("/logup", authControl.user_logup);

//CRUD Logic
router.post(
  "/admin/create_account",
  adminMiddle.adminmiddleware,
  accountControl.createAccount
);

router.get(
  "/admin/read_account",
  adminMiddle.adminmiddleware,
  accountControl.readAccount
);

router.get(
  "/admin/read_account/:_id",
  adminMiddle.adminmiddleware,
  accountControl.readAccountById
);
router.get(
  "/read_account/:_id",
  accountMiddle.accountmiddleware,
  accountControl.readAccountById
);

router.put(
  "/admin/update_account/:_id",
  adminMiddle.adminmiddleware,
  accountControl.updateAccount
);

router.delete(
  "/admin/delete_account/:_id",
  adminMiddle.adminmiddleware,
  accountControl.deleteAccount
);

module.exports = router;
