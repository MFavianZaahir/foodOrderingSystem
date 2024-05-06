// const express = require('express');
// const loginController = require('./controllers/loginController');
// const registerController = require('./controllers/register_controller');

// const app = express();
// const port = 3000;

// // ... middleware

// // Login route
// app.post('/login', loginController.login);

// // Registration route
// app.post('/register', registerController.register);

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const userRoute = require("./routes/user.route");
const foodRoute = require("./routes/food.route");
const foodController = require("./controllers/food.controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", userRoute);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Change 'uploads/' to your desired folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(upload.single("image")); // Adjust field name if needed

// Register the router for the `/food` resource
app.use("/food", foodRoute);

app.listen(PORT, () => {
  console.log("Food ranned on port ${PORT}");
});
