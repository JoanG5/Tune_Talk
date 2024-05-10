const express = require("express");
const router = express.Router();
const Review = require("./review.model");

router.get("/", (req, res) => {
  res.send("Review route");
});

module.exports = router;
