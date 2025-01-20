const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);

app.get("/", (req, res) => {
  res.send("Library Management System Backend");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
