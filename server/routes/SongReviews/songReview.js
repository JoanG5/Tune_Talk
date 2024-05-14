const express = require("express");
const router = express.Router();
const SongReview = require("./songReview.model");

router.get("/", (req, res) => {
  res.send("Song Review route");
});

module.exports = router;
