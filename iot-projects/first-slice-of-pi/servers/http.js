const express = require("express"),
  cors = require("cors");

var app = express();
app.use(cors());
app.get("/", function (req, res) {
  res.send("port");
});
module.exports = app;

// I have looked through all files
