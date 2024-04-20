const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Song route");
});

module.exports = router;
