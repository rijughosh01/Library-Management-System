const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://first-project:AD1yviieNPycK6oj@cluster0.tfozh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

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