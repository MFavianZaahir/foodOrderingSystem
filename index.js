const express = require("express");
const app = express();
const PORT = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoute = require("./routes/admin_route");
// const kamarRoute = require("./routes/kamar.route");
// const pemesananRoute = require("./routes/pemesanan.route");
// const detail_pemesananRoute = require("./routes/detail_pemesanan.route");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/admin", adminRoute);
// app.use("/kamar", kamarRoute);
// app.use("/pemesanan", pemesananRoute);
// app.use("/detai_pemesanan", detail_pemesananRoute);

app.listen(PORT, () => {
  console.log("run on port 8000");
});