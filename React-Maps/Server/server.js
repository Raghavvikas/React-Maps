const express = require("express");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users/", require("./routes/userRoutes"));

app.use(errorHandler);

app.get("/", function (req, res) {
  res.send("Welcome to the server...");
});

app.listen(5000, () => {
  console.log(`listening on PORT ${port}`);
});
