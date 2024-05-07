const express = require("express");
const app = express();
app.use(express.json());

const adminController = require("../controllers/admin.controller");
const auth = require("../auth/auth");
const { checkRole } = require("../middleware/checkRole");
// const { authVerify } = auth;

app.post("/login", adminController.login);
app.get(
  "/getAllAdmin",
  auth.authVerify,
  checkRole(["admin", "user"]),
  adminController.getAllAdmin
);

app.post("/", auth.authVerify, adminController.addAdmin);
app.post("/RegisterLoginCustomer", adminController.LoginRegister);
app.delete("/:id", adminController.deleteAdmin);
app.post("/", adminController.addAdmin);

module.exports = app;
