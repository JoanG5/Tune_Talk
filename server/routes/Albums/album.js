const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Album route");
});

module.exports = router;
