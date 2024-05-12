const express = require("express");
const router = express.Router();
const Album = require("./album.model");

router.get("/", (req, res) => {
  res.send("Album route");
});

module.exports = router;
