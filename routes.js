const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("The answer to life is: ");
});

router.get("/secret", (req, res) => {
  res.send(42);
});

router.get("/achoo", (req, res) => {
  res.send("https://www.youtube.com/");
});

router.get("/ohno", (req, res) => {
  res.send("Woops sneezed into a different diminsions");
});

module.exports = router;
