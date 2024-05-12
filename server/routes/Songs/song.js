const express = require("express");
const router = express.Router();
const Song = require("./song.model");

router.get("/", (req, res) => {
  res.send("Song route");
});

module.exports = router;
