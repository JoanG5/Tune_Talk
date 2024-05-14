const express = require("express");
const router = express.Router();
const AlbumReview = require("./albumReview.model");

router.get("/", (req, res) => {
  res.send("Album Review route");
});

module.exports = router;
