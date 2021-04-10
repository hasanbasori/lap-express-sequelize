const express = require("express");
const db = require("./models");
const customerRoute = require("./routes/customerRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/customers", customerRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

// db.sequelize.sync({ force: false });
const port = 8000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
