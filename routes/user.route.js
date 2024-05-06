const express = require("express");
const app = express();
app.use(express.json());
const userController = require("../controllers/user.controller");
const auth = require("../auth/auth");
const { authVerify } = auth;
const { checkRole } = require("../middleware/checkRole");

app.post("/login", userController.login);
app.get(
  "/getAllUser",
  auth.authVerify,
  checkRole(["admin", "resepsionis"]),
  userController.getAllUser
);

app.post("/", userController.addUser);


// app.get(
//   "/findOne/:id",
//   authVerify,
//   checkRole(["admin", "resepsionis"]),
//   userController.findAllUser
// );

// app.delete(
//   "/:id",
//   auth.authVerify,
//   checkRole(["admin"]),
//   userController.deleteUser
// );

// app.put("/:id", userController.updateUser);

app.post("/RegisterLoginCustomer", userController.LoginRegister);
app.delete("/:id", userController.deleteUser);
// app.get("/getUserCount", userController.getUserLength)
app.post("/", userController.addUser);
module.exports = app;
