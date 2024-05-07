const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const adminRoute = require("./routes/admin.route");
const foodRoute = require("./routes/food.route");
const orderRoute = require("./routes/order.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/admin", adminRoute);

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
app.use("/order", orderRoute);

app.listen(PORT, () => {
  console.log("Food ranned on port 8000");
});
